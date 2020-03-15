import { Module } from '@nestjs/common';

import { BuildProgressModule } from './build-progress/build-progress.module';

@Module({
  imports: [BuildProgressModule],
  controllers: [],
  providers: []
})
export class AppModule {}
