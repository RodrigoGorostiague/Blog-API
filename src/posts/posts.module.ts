import { Module } from '@nestjs/common';
import { PostController } from './controller/post.controller';
import { PostService } from './services/post.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/Post.entity';
import { User } from '../users/entities/User.entity';
import { ReplyController } from './controller/reply.controller';
import { Reply } from './entities/Reply.entity';
import { ReplyService } from './services/reply.service';

@Module({
  imports: [TypeOrmModule.forFeature([Post, User, Reply])],
  controllers: [PostController, ReplyController],
  providers: [PostService, ReplyService],
})
export class PostsModule {}
