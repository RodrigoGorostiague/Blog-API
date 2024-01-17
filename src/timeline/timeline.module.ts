import { Module } from '@nestjs/common';
import { TimelineService } from './services/timeline.service';
import { TimelineController } from './controller/timeline.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Timeline } from './entities/Timeline.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Timeline])],
  providers: [TimelineService],
  controllers: [TimelineController],
})
export class TimelineModule {}
