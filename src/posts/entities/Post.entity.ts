import { User } from './../../users/entities/User.entity';

export interface Post {
  id: number;
  title: string;
  content: string;
  author: User;
  creatAt: Date;
  img?: string[];
  reply?: Post[];
}
