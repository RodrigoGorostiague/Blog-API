import { Column, Entity } from 'typeorm';

@Entity()
export class Timeline {
  @Column({ type: 'date' })
  cratedAt: Date;
  @Column({ type: 'varchar', length: 255 })
  title: string;
  @Column({ type: 'text' })
  content: string;
  @Column({ type: 'varchar', length: 255 })
  img?: string[];
  @Column({ type: 'varchar', length: 255 })
  tag?: string[];
}
