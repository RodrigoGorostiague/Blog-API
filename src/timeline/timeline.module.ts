import { Module } from '@nestjs/common';
import { TimelineService } from './services/timeline.service';
import { TimelineController } from './controller/timeline.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Timeline } from './entities/Timeline.entity';
import { Tag } from './entities/Tag.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Timeline, Tag])],
  providers: [TimelineService],
  controllers: [TimelineController],
})
export class TimelineModule {}
