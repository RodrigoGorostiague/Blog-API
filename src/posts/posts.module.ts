import { Module } from '@nestjs/common';
import { PostController } from './controller/post.controller';
import { PostService } from './services/post.service';

@Module({
  controllers: [PostController],
  providers: [PostService],
})
export class PostsModule {}
