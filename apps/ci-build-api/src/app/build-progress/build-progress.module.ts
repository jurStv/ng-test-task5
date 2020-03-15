import { Module } from '@nestjs/common';
import { BuildProgressGateway } from './build-progress.gateway';
import { BuildProgressService } from './build-progress.service';

@Module({
  providers: [BuildProgressGateway, BuildProgressService]
})
export class BuildProgressModule {}
