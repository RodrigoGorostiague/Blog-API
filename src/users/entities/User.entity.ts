import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'varchar', length: 255 })
  name: string;
  @Column({ type: 'varchar', length: 255 })
  email?: string;
  @Column({ type: 'varchar', length: 255 })
  password?: string;
  @Column({ type: 'varchar', length: 255 })
  role: string;
  @Column({ type: 'varchar', length: 255 })
  avatarImg?: string;
}
