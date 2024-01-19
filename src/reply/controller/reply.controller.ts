import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
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
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.replyService.findOne(id);
  }

  @Post()
  create(@Body() payload: CreateReplyDto) {
    return this.replyService.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: CreateReplyDto,
  ) {
    return this.replyService.update(id, payload);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.replyService.remove(id);
  }
}
