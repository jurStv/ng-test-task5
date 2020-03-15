import { Injectable } from '@angular/core';
import { BuildStage, BuildStep, SocketEvents, SocketLogPayload, SocketStepPayload } from '@ci-build/models';
import { Socket } from 'ngx-socket-io';
import { compose, map as Rmap, path, pathOr, prop, propOr, unnest } from 'ramda';
import { merge, Observable, of, Subject } from 'rxjs';
import { bufferTime, debounceTime, filter, map, pluck, startWith, takeUntil, tap, withLatestFrom } from 'rxjs/operators';
import { broadcastTo, cloneArray, deepClone } from '../utils';
import { BUILD_DEBOUNCE_TIME, LOGS_BUFFER_TIME } from './constants';

@Injectable({
  providedIn: 'root',
})
export class BuildProgressService {
  private stepInProgressIndex: number;
  private stageData: BuildStage;
  private _buildLog$ = new Subject<SocketLogPayload>();
  private _buildStep$ = new Subject<SocketStepPayload>();
  private _buildStatusChange$ = new Subject<BuildStage>();
  private _disconnect$ = new Subject<void>();

  constructor(private socket: Socket) {}

  initialize(): void {
    this.socket.connect();
    this.handleStageEvents();
    this.handleStepEvents();
    this.handleLogsEvents();

    this.socket.emit(SocketEvents.CLIENT_READY);
  }

  disconnect() {
    this._disconnect$.next();
    this.socket.disconnect();
  }

  stopBuild() {
    this.socket.emit(SocketEvents.STOP_BUILD);
  }

  restartBuild() {
    this.stopBuild();
    this.disconnect();
    this.initialize();
  }

  /* Stage business */

  private handleStageEvents(): void {
    const prepare$ = this.socket.fromEvent<BuildStage>(SocketEvents.BUILD_PREPARE);
    const started$ = this.socket.fromEvent<BuildStage>(SocketEvents.BUILD_STARTED);
    const finished$ = this.socket.fromEvent<BuildStage>(SocketEvents.BUILD_FINISHED);

    merge(prepare$, started$, finished$).pipe(
      tap((stage) => this.stageData = stage),
      map(deepClone),
      broadcastTo(this._buildStatusChange$),
      takeUntil(this._disconnect$),
      withLatestFrom(finished$),
      tap(() => this._disconnect$.next())
    ).subscribe();
  }

  stageStatusChanges() {
    const build$ = this._buildStatusChange$.asObservable();
    const step$ = this._buildStep$.asObservable().pipe(
      map(() => deepClone(this.stageData)),
    );

    return merge(build$, step$).pipe(debounceTime(BUILD_DEBOUNCE_TIME));
  }

  /* Step business */

  private handleStepEvents(): void {
    const started$ = this.socket.fromEvent<SocketStepPayload>(SocketEvents.BUILD_STEP_STARTED).pipe(
      tap(({ stepIndex }) => this.stepInProgressIndex = stepIndex),
    );
    const finished$ = this.socket.fromEvent<SocketStepPayload>(SocketEvents.BUILD_STEP_FINISHED).pipe(
      tap(() => this.stepInProgressIndex = null),
    );

    merge(started$, finished$).pipe(
      tap(({ stepIndex, step }) => this.updateStepInStage(stepIndex, step)),
      map(deepClone),
      broadcastTo(this._buildStep$),
      takeUntil(this._disconnect$),
    ).subscribe();
  }

  private updateStepInStage(index: number, step: BuildStep): void {
    const steps = prop('steps', this.stageData);
    steps.splice(index, 1, step);
  }

  stepStatusChanges(index: number) {
    return this._buildStep$.asObservable().pipe(
      filter(({ stepIndex }) => stepIndex === index),
    );
  }

  stepsChanges() {
    return this._buildStep$.asObservable();
  }

  stepInProgressChanges() {
    return this._buildStep$.asObservable().pipe(
      map(() => this.stepInProgressIndex),
    );
  }

  /* Logs business */

  private handleLogsEvents(): void {
    this.socket.fromEvent<SocketLogPayload>(SocketEvents.BUILD_STEP_LOGS_RECEIVED).pipe(
      tap(({ stepIndex, log }) => this.pushLogToStep(stepIndex, log)),
      broadcastTo(this._buildLog$),
      takeUntil(this._disconnect$),
    ).subscribe();
  }

  private pushLogToStep(index: number, log: string): void {
    const stepLogs = path<string[]>(['steps', index, 'logs'], this.stageData);
    stepLogs.push(log);
  }

  stepLogsReceives(index: number): Observable<string[]> {
    const stepLogs = pathOr<string[]>([], ['steps', index, 'logs'], this.stageData);

    return this._buildLog$.asObservable().pipe(
      filter(({ stepIndex }) => stepIndex === index),
      pluck('log'),
      bufferTime(LOGS_BUFFER_TIME),
      startWith(cloneArray(stepLogs)),
      filter(({ length }) => length > 0),
    );
  }

  buildLogsReceives(): Observable<string[]> {
    const getBuildLogs = compose(
      unnest,
      Rmap<BuildStep, string[]>(propOr([], 'logs')),
      propOr([], 'steps'),
    );
    const initial$ = of(true).pipe(
      map(() => getBuildLogs(this.stageData)),
    );
    const buildLog$ = this._buildLog$.asObservable().pipe(
      pluck('log'),
      bufferTime(LOGS_BUFFER_TIME),
    );

    return merge(initial$, buildLog$).pipe(
      filter(({length}) => length > 0),
    );
  }
}
