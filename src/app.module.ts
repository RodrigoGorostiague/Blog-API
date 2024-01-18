import { PostsModule } from './posts/posts.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TimelineModule } from './timeline/timeline.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { enviroments } from './enviroments';
import config from './config';
import { DatabaseModule } from './database/databae.module';
import { ReplyModule } from './reply/reply.module';
//import configSchema from './configSchema';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: enviroments[process.env.NODE_ENV] || '.env',
      load: [config],
      isGlobal: true,
      //validationSchema: configSchema,
    }),
    UsersModule,
    TimelineModule,
    PostsModule,
    DatabaseModule,
    ReplyModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
