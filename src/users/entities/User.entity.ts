import { Reply } from '../../posts/entities/Reply.entity';
import { Post } from '../../posts/entities/Post.entity';
import { Timeline } from './../../timeline/entities/Timeline.entity';
import { PrimaryGeneratedColumn, Column, Entity, OneToMany } from 'typeorm';

/**
 * No debemos añadir un decorador extra que sea el que maneje la clave foránea como lo es **@JoinColumn()**, debido a que
 * TypeORM sabe que en las relaciones uno a muchos es la entidad débil la que maneja la relación “@ManyToOne()" es la que
 * tiene que tener la clave foránea
 */
@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'varchar', length: 255 })
  name: string;
  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;
  @Column({ type: 'varchar', length: 255 })
  password?: string;
  @Column({
    type: 'varchar',
    length: 255,
    default: 'user',
  })
  role: string;
  @Column({ name: 'avatar_img', type: 'varchar', length: 255 })
  avatarImg?: string;
  @OneToMany(() => Timeline, (timeline) => timeline.author)
  timelines?: Timeline[];
  @OneToMany(() => Post, (post) => post.author)
  posts?: Post[];
  @OneToMany(() => Reply, (reply) => reply.author)
  reply?: Reply[];
}
