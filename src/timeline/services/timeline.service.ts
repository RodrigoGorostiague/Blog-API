import { Injectable, NotFoundException } from '@nestjs/common';
import { Timeline } from '../entities/Timeline.entity';
import { CreateTimelineDto, UpdateTimelineDto } from '../dtos/timeline.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../users/entities/User.entity';

@Injectable()
export class TimelineService {
  constructor(
    @InjectRepository(Timeline)
    private timelineRepository: Repository<Timeline>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  findAll() {
    return this.timelineRepository.find({ relations: ['author', 'tag'] });
  }

  async findOne(id: number) {
    const timeline = this.timelineRepository.findOneBy({ id });
    if (!timeline) {
      throw new NotFoundException(`Timeline #${id} not found`);
    }
    return timeline;
  }

  async create(data: CreateTimelineDto) {
    const newTimeline = this.timelineRepository.create(data);
    if (data.userId) {
      const author = await this.userRepository.findOneBy({ id: data.userId });
      newTimeline.author = author;
    }
    return this.timelineRepository.save(newTimeline);
  }

  async update(id: number, changes: UpdateTimelineDto) {
    const timeline = await this.timelineRepository.findOneBy({ id });
    if (!timeline) {
      throw new NotFoundException(`Timeline #${id} not found`);
    } else {
      this.timelineRepository.merge(timeline, changes);
      return this.timelineRepository.save(timeline);
    }
  }

  async remove(id: number) {
    const timeline = await this.findOne(id);
    if (!timeline) {
      throw new NotFoundException(`Timeline #${id} not found`);
    } else {
      return this.timelineRepository.delete(id);
    }
  }
}
