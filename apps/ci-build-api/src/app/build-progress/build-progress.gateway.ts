import { assocPath } from 'ramda';
import { SubscribeMessage, WebSocketGateway, WsResponse, OnGatewayDisconnect } from '@nestjs/websockets';
import { Observable, concat, of, from, Subject, interval } from 'rxjs';
import { delay, map, switchMap, mergeMap, takeUntil, take } from 'rxjs/operators';

import { SocketEvents } from '@ci-build/models';

import { BuildProgressService } from './build-progress.service';
import { random } from './utils';

@WebSocketGateway()
export class BuildProgressGateway implements OnGatewayDisconnect {
  private _stopBuild$ = new Subject<void>();

  constructor(private readonly buildProgress: BuildProgressService) {}

  handleDisconnect() {
    this.buildProgress.finishBuild();
  }

  @SubscribeMessage(SocketEvents.STOP_BUILD)
  stopBuild(socket: any, payload: any): Observable<WsResponse<any>> {
    const build = this.buildProgress.finishBuild();
    this._stopBuild$.next();

    return of({event: SocketEvents.BUILD_FINISHED, data: build }).pipe(
      delay(random(1000, 2500)),
    );
  }

  @SubscribeMessage(SocketEvents.CLIENT_READY)
  startBuildFlow(socket: any, payload: any): Observable<WsResponse<any>> {
    const build = this.buildProgress.prepareBuild();
    const stageStart = this.buildProgress.startBuild();
    const stepsEvent$ = stageStart.steps.map((_, index) => this.buildStepFlow(index));

    return concat(
      of({event: SocketEvents.BUILD_PREPARE, data: build }).pipe(delay(random(1000, 2500))),
      of({event: SocketEvents.BUILD_STARTED, data: stageStart }).pipe(delay(random(3000, 3500))),
      ...stepsEvent$,
      of({event: SocketEvents.BUILD_FINISHED }).pipe(
        delay(random(1000, 2500)),
        map((ev) => assocPath(['data'], this.buildProgress.finishBuild(), ev)),
      ),
    ).pipe(takeUntil<WsResponse<any>>(this._stopBuild$.asObservable()));
  }

  private buildStepFlow(index): Observable<WsResponse<any>> {
    const logs = this.buildProgress.getStepLogs(index);
    const logEvent$ = interval(random(100, 400)).pipe(
      take(logs.length),
      map((i) => ({event: SocketEvents.BUILD_STEP_LOGS_RECEIVED, data: { log: logs[i], stepIndex: index } }))
    );

    return concat(
      of({event: SocketEvents.BUILD_STEP_STARTED, data: { stepIndex: index }}).pipe(delay(random(500, 2500))).pipe(
        map((ev) => assocPath(['data', 'step'], this.buildProgress.startStep(index), ev)),
      ),
      logEvent$,
      of({event: SocketEvents.BUILD_STEP_FINISHED, data: { stepIndex: index }}).pipe(delay(random(500, 2500))).pipe(
        map((ev) => assocPath(['data', 'step'], this.buildProgress.finishStep(index), ev)),
      ),
    )
  }

}
