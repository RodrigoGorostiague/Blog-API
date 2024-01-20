import { Post } from './Post.entity';
import { User } from '../../users/entities/User.entity';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
@Entity({ name: 'reply' })
export class Reply {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;
  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createAt: Date;
  @Column({ type: 'text' })
  content: string;
  @Column({ type: 'varchar', length: 255 })
  title: string;
  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updateAt: Date;
  @Column({ type: 'varchar', length: 255 })
  img?: string;
  @ManyToOne(() => User, (user) => user.reply)
  author: User;
  //falta el reply del reply
  @ManyToOne(() => Post, (post) => post.reply)
  post: Post;
}
