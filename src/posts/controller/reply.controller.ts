import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ReplyService } from '../services/reply.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateReplyDto } from '../dtos/Reply.dto';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
//import { ApiKeyGuard } from 'src/auth/guards/api-key.guard';
//import { Public } from 'src/auth/decorators/public.decorator';

@ApiTags('Reply')
@Controller('reply')
//@UseGuards(ApiKeyGuard)
@UseGuards(JwtAuthGuard)
export class ReplyController {
  constructor(private replyService: ReplyService) {}

  @Get()
  //@SetMetadata('isPublic', true) // This is the decorator that we need to add
  //@Public()
  findAll() {
    return this.replyService.findAll();
  }

  @Get(':id')
  //@SetMetadata('isPublic', true) // This is the decorator that we need to add
  //@Public()
  findOne(
    @Param('id', ParseIntPipe) id: number,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.replyService.findOne(id).then((reply) => {
      if (!reply) {
        res.status(HttpStatus.NOT_FOUND).json({
          status: 'Not Found',
          message: 'The reply has not been found',
        });
      } else {
        res.status(HttpStatus.OK).json({
          status: 'OK',
          message: 'The reply has been successfully found',
          data: reply,
        });
      }
    });
  }

  @Post()
  create(
    @Body() payload: CreateReplyDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.replyService
      .create(payload)
      .then(() => {
        res.status(HttpStatus.CREATED).json({
          status: 'Created',
          message: 'The reply has been successfully created',
        });
      })
      .catch((error) => {
        res.status(HttpStatus.BAD_REQUEST).json({
          status: 'Bad Request',
          message: error.message,
        });
      });
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: CreateReplyDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.replyService
      .update(id, payload)
      .then((reply) => {
        if (!reply) {
          res.status(HttpStatus.NOT_FOUND).json({
            status: 'Not Found',
            message: 'The reply has not been found',
          });
        } else {
          res.status(HttpStatus.OK).json({
            status: 'OK',
            message: 'The reply has been successfully updated',
            data: reply,
          });
        }
      })
      .catch((error) => {
        res.status(HttpStatus.BAD_REQUEST).json({
          status: 'Bad Request',
          message: error.message,
        });
      });
  }

  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe) id: number,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.replyService.remove(id).catch((error) => {
      res.status(HttpStatus.BAD_REQUEST).json({
        status: 'Bad Request',
        message: error.message,
      });
    });
  }
}
