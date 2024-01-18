import { IsDate, IsString } from 'class-validator';
import { User } from '../../users/entities/User.entity';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'timelines' })
export class Timeline {
  @PrimaryColumn({ type: 'date' })
  @IsDate()
  cratedAt: Date;
  @Column({ type: 'varchar', length: 255 })
  @IsString()
  title: string;
  @Column({ type: 'text' })
  @IsString()
  content: string;
  @Column({ type: 'varchar', length: 255 })
  @IsString()
  img?: string;
  @Column({ type: 'varchar', length: 255 })
  @IsString()
  tag?: string;
  author: User;
}
