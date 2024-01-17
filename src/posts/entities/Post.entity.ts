import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './../../users/entities/User.entity';

@Entity()
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
  @Column({ type: 'varchar', length: 255 })
  img?: string[];
  @Column({ type: 'varchar', length: 255 })
  reply?: Post[];
}
