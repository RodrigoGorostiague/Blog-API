import { Module } from '@nestjs/common';
import { TimelineService } from './services/timeline.service';
import { TimelineController } from './controller/timeline.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Timeline } from './entities/Timeline.entity';
import { Tag } from './entities/Tag.entity';
import { User } from '../users/entities/User.entity';
import { TagService } from './services/tag.service';
import { TagController } from './controller/tag.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Timeline, Tag, User])],
  providers: [TimelineService, TagService],
  controllers: [TimelineController, TagController],
})
export class TimelineModule {}
