import { IsDate, IsString } from 'class-validator';
import { User } from '../../users/entities/User.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';
import { Tag } from './Tag.entity';

@Entity({ name: 'timelines' })
export class Timeline {
  @PrimaryColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
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
  @OneToMany(() => Tag, (tag) => tag.timeline)
  @IsString()
  tag?: Tag[];
  @ManyToOne(() => User, (user) => user.timelines)
  author: User;
}
