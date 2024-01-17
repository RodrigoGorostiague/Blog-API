import { Injectable, NotFoundException } from '@nestjs/common';
import { Timeline } from '../entities/Timeline.entity';
import { CreateTimelineDto, UpdateTimelineDto } from '../dtos/timeline.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TimelineService {
  constructor(
    @InjectRepository(Timeline)
    private timelineRepository: Repository<Timeline>,
  ) {}

  findAll() {
    return this.timelineRepository.find();
  }

  async findOne(cratedAt: Date) {
    const timeline = this.timelineRepository.findOneBy({ cratedAt });
    if (!timeline) {
      throw new NotFoundException(`Timeline #${cratedAt} not found`);
    }
    return timeline;
  }

  create(data: CreateTimelineDto) {
    const newTimeline = this.timelineRepository.create(data);
    return this.timelineRepository.save(newTimeline);
  }

  async update(cratedAt: Date, changes: UpdateTimelineDto) {
    const timeline = await this.timelineRepository.findOneBy({ cratedAt });
    if (!timeline) {
      throw new NotFoundException(`Timeline #${cratedAt} not found`);
    } else {
      this.timelineRepository.merge(timeline, changes);
      return this.timelineRepository.save(timeline);
    }
  }

  async remove(createdAt: Date) {
    const timeline = await this.findOne(createdAt);
    if (!timeline) {
      throw new NotFoundException(`Timeline #${createdAt} not found`);
    } else {
      return this.timelineRepository.delete(createdAt);
    }
  }
}
