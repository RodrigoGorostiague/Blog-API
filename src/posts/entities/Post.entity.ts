import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './../../users/entities/User.entity';

@Entity({ name: 'posts' })
export class Post {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'varchar', length: 255 })
  title: string;
  @Column({ type: 'text' })
  content: string;
  author: User;
  @Column({ type: 'date' })
  creatAt: Date;
  @Column({ type: 'varchar', length: 255, unique: true })
  img?: string[];
  @Column({ type: 'varchar', length: 255 })
  reply?: Post[];
}
