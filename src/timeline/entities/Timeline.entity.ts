import { IsDate, IsString } from 'class-validator';
import { User } from '../../users/entities/User.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Tag } from './Tag.entity';

@Entity({ name: 'timelines' })
export class Timeline {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;
  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  @IsDate()
  createdAt: Date;
  @Column({ type: 'varchar', length: 255 })
  @IsString()
  title: string;
  @Column({ type: 'text' })
  @IsString()
  content: string;
  @Column({ type: 'varchar', length: 255 })
  @IsString()
  img?: string;
  @IsString()
  @ManyToOne(() => Tag, (tag) => tag.timelines)
  @JoinTable()
  tags?: Tag[];
  @ManyToOne(() => User, (user) => user.timelines)
  author: User;
}
