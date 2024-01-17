import { Post } from 'src/posts/entities/Post.entity';
import { Timeline } from './../../timeline/entities/Timeline.entity';
import { PrimaryGeneratedColumn, Column, Entity, ManyToOne } from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'varchar', length: 255 })
  name: string;
  @Column({ type: 'varchar', length: 255 })
  email?: string;
  @Column({ type: 'varchar', length: 255 })
  password?: string;
  @Column({ type: 'varchar', length: 255 })
  role: string;
  @Column({ type: 'varchar', length: 255 })
  avatarImg?: string;
  @ManyToOne(() => Timeline, (timeline) => timeline.author)
  timelines?: Timeline[];
  @ManyToOne(() => Post, (post) => post.author)
  posts?: Post[];
}
