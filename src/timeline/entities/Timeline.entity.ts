import { IsDate, IsString } from 'class-validator';
import { User } from 'src/users/entities/User.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity({ name: 'timelines' })
export class Timeline {
  @Column({ type: 'date' })
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
  @OneToMany(() => User, (user) => user.timelines)
  author: User;
}
