import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Timeline } from './Timeline.entity';

@Entity({ name: 'tags' })
export class Tag {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;
  @Column({ type: 'varchar', length: 255 })
  name: string;
  @Column({ type: 'varchar', length: 255 })
  description: string;
  @ManyToOne(() => Timeline, (timeline) => timeline)
  timeline: Timeline;
}
