import { Timeline } from './../../timeline/entities/Timeline.entity';
import { Post } from './../../posts/entities/Post.entity';

export interface User {
  id: number;
  name: string;
  email?: string;
  password?: string;
  posts?: Post[];
  timeline?: Timeline[];
  role: string;
  avatarImg?: string;
}
