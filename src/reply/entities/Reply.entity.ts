import { Post } from 'src/posts/entities/Post.entity';
import { User } from 'src/users/entities/User.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
@Entity({ name: 'reply' })
export class Reply {
  @PrimaryColumn()
  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
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
