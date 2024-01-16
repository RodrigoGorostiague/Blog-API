import { Module } from '@nestjs/common';
import { TimelineService } from './services/timeline.service';
import { TimelineController } from './controller/timeline.controller';

@Module({
  providers: [TimelineService],
  controllers: [TimelineController],
})
export class TimelineModule {}
