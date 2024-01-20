import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './../../users/entities/User.entity';
import { Reply } from './Reply.entity';

@Entity({ name: 'posts' })
export class Post {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;
  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createAt: Date;
  @Column({ type: 'varchar', length: 255 })
  title: string;
  @Column({ type: 'text' })
  content: string;
  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updateAt: Date;
  @Column({ type: 'varchar', length: 255 })
  img?: string[];
  @ManyToOne(() => User, (user) => user.posts)
  author: User;
  @OneToMany(() => Reply, (reply) => reply.post, { nullable: true })
  reply?: Reply[];
}
