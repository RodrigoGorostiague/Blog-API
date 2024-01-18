import { Post } from '../../posts/entities/Post.entity';
import { Timeline } from './../../timeline/entities/Timeline.entity';
import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'varchar', length: 255 })
  name: string;
  @Column({ type: 'varchar', length: 255, unique: true })
  email?: string;
  @Column({ type: 'varchar', length: 255 })
  password?: string;
  @Column({ type: 'varchar', length: 255 })
  role: string;
  @Column({ type: 'varchar', length: 255 })
  avatarImg?: string;
  timelines?: Timeline[];
  posts?: Post[];
}
