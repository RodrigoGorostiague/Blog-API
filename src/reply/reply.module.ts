import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reply } from './entities/Reply.entity';
import { ReplyService } from './services/reply.service';
import { ReplyController } from './controller/reply.controller';
@Module({
  imports: [TypeOrmModule.forFeature([Reply])],
  providers: [ReplyService],
  controllers: [ReplyController],
})
export class ReplyModule {}
