import { BuildStep } from './models';

export enum SocketEvents {
  // Emitted by Client
  CLIENT_READY = 'client_ready',
  STOP_BUILD = 'stop_build',

  // Emitted by Server
  BUILD_PREPARE = 'build_prepare',
  BUILD_STARTED = 'build_started',
  BUILD_FINISHED = 'build_finished',
  BUILD_STEP_STARTED = 'build_step_started',
  BUILD_STEP_FINISHED = 'build_step_finished',
  BUILD_STEP_LOGS_RECEIVED = 'build_step_logs_received',
}

export interface SocketLogPayload {
  log: string;
  stepIndex: number;
}

export interface SocketStepPayload {
  step: BuildStep;
  stepIndex: number;
}
