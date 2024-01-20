import { IsDate, IsOptional } from 'class-validator';
import { User } from '../../users/entities/User.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
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
  title: string;
  @Column({ type: 'text' })
  content: string;
  @Column({ type: 'varchar', length: 255, nullable: true })
  @IsOptional()
  img: string;
  @ManyToMany(() => Tag, (tag) => tag.timelines, {
    nullable: true,
    cascade: false,
  })
  @JoinTable()
  tags?: Tag[];
  @ManyToOne(() => User, (user) => user.timelines)
  author: User;
}
