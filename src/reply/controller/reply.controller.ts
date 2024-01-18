import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ReplyService } from '../services/reply.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateReplyDto } from '../dtos/Reply.dto';

@ApiTags('Reply')
@Controller('reply')
export class ReplyController {
  constructor(private replyService: ReplyService) {}

  @Get()
  findAll() {
    return this.replyService.findAll();
  }

  @Get(':id')
  findOne(id: Date) {
    return this.replyService.findOne(id);
  }

  @Post()
  create(@Body() payload: CreateReplyDto) {
    return this.replyService.create(payload);
  }

  @Put(':id')
  update(@Param('id') id: Date, @Body() payload: CreateReplyDto) {
    return this.replyService.update(id, payload);
  }

  @Delete(':id')
  remove(@Param('id') id: Date) {
    return this.replyService.remove(id);
  }
}
