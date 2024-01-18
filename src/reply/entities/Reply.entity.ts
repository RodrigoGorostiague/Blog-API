import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
@Entity({ name: 'reply' })
export class Reply {
  @PrimaryColumn()
  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createAt: Date;
  @Column({ type: 'text' })
  content: string;
  @Column({ type: 'varchar', length: 255 })
  title: string;
  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updateAt: Date;
  @Column({ type: 'varchar', length: 255 })
  img?: string;
}
