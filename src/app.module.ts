import { UserService } from './users/services/user.service';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';
import { TimelineModule } from './timeline/timeline.module';
import { PostController } from './posts/controller/post.controller';
import { PostService } from './posts/services/post.service';
import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersModule, TimelineModule, PostsModule],
  controllers: [AppController, PostController],
  providers: [AppService, PostService, UserService],
})
export class AppModule {}
