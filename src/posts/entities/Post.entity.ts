import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';
import { User } from './../../users/entities/User.entity';
import { Reply } from 'src/reply/entities/Reply.entity';

@Entity({ name: 'posts' })
export class Post {
  @PrimaryColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createAt: Date;
  @Column({ type: 'varchar', length: 255 })
  title: string;
  @Column({ type: 'text' })
  content: string;
  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updateAt: Date;
  @Column({ type: 'varchar', length: 255, unique: true })
  img?: string[];
  @ManyToOne(() => User, (user) => user.posts)
  author: User;
  @OneToMany(() => Reply, (reply) => reply.post, { nullable: true })
  reply?: Reply[];
}
