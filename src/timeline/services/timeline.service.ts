import { Injectable } from '@nestjs/common';
import { Timeline } from '../entities/Timeline.entity';
import { UpdateTimelineDto } from '../dtos/timeline.dto';

@Injectable()
export class TimelineService {
  private timeLine: Timeline[] = [
    {
      cratedAt: new Date(),
      title: 'Creacion de la Api',
      content: 'Se creo la api con nestjs y se subio a github',
      img: ['https://www.nestjs.com/img/logo-small.svg'],
      tag: ['nestjs', 'api'],
    },
  ];

  findAll() {
    return this.timeLine;
  }

  findOne(id: number) {
    return this.timeLine[id];
  }

  create(data: any) {
    this.timeLine.push(data);
    return data;
  }

  update(id: number, changes: UpdateTimelineDto) {
    const updatedTimeline: Timeline = {
      ...this.timeLine[id],
      cratedAt: new Date(),
      ...changes,
    };
    this.timeLine[id] = updatedTimeline;
    return this.timeLine[id];
  }

  remove(id: number) {
    this.timeLine.splice(id, 1);
    return true;
  }
}
