import { IsDate, IsOptional } from 'class-validator';
import { User } from '../../users/entities/User.entity';
import {
  Column,
  Entity,
  JoinColumn,
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
  @Column({
    name: 'created_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  @IsDate()
  createdAt: Date;
  @Column({
    name: 'updated_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  @IsDate()
  updatedAt: Date;
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
  @JoinTable({
    name: 'timelines_has_tags',
    joinColumn: { name: 'timeline_id' },
    inverseJoinColumn: { name: 'tag_id' },
  })
  tags?: Tag[];
  @ManyToOne(() => User, (user) => user.timelines)
  @JoinColumn({ name: 'author_id' })
  author: User;
}
