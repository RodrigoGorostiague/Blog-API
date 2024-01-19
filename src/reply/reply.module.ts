import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Reply } from './entities/Reply.entity';
import { ReplyService } from './services/reply.service';
import { ReplyController } from './controller/reply.controller';
import { User } from '../users/entities/User.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Reply, User])],
  providers: [ReplyService],
  controllers: [ReplyController],
})
export class ReplyModule {}
