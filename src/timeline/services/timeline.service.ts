import { Injectable, NotFoundException } from '@nestjs/common';
import { Timeline } from '../entities/Timeline.entity';
import { CreateTimelineDto, UpdateTimelineDto } from '../dtos/timeline.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { User } from '../../users/entities/User.entity';
import { Tag } from '../entities/Tag.entity';

@Injectable()
export class TimelineService {
  constructor(
    @InjectRepository(Timeline)
    private timelineRepository: Repository<Timeline>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Tag)
    private tagRepository: Repository<Tag>,
  ) {}

  findAll() {
    return this.timelineRepository.find({ relations: ['author', 'tags'] });
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
    if (data.tagsId) {
      const tags = await this.tagRepository.findBy({
        id: In(data.tagsId),
      });
      newTimeline.tags = tags;
      console.log(newTimeline);
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

  async addTagToTimeline(timelineId: number, tagId: number) {
    const timeline = await this.timelineRepository.findOneBy({
      id: timelineId,
    });
    if (!timeline) {
      throw new NotFoundException(`Timeline #${timelineId} not found`);
    } else {
      const tag = await this.tagRepository.findOneBy({ id: tagId });
      if (!tag) {
        throw new NotFoundException(`Tag #${tagId} not found`);
      } else {
        timeline.tags.push(tag);
      }
    }
    return this.timelineRepository.save(timeline);
  }

  async removeTagToTimeline(timelineId: number, tagId: number) {
    const timeline = await this.timelineRepository.findOneBy({
      id: timelineId,
    });
    if (!timeline) {
      throw new NotFoundException(`Timeline #${timelineId} not found`);
    } else {
      const tag = await this.tagRepository.findOneBy({ id: tagId });
      if (!tag) {
        throw new NotFoundException(`Tag #${tagId} not found`);
      } else {
        timeline.tags = timeline.tags.filter((t) => t.id !== tag.id);
      }
    }
    return this.timelineRepository.save(timeline);
  }
}
