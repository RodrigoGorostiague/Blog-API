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
import { ApiTags } from '@nestjs/swagger';
import { PostService } from '../services/post.service';
import { CreatePostDto, UpdatePostDto } from '../dtos/Post.dto';
import { Response } from 'express';
import { Role } from 'src/auth/models/roles.model';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@UseGuards(RolesGuard)
@ApiTags('Publicaciones')
@Controller('publicaciones')
export class PostController {
  constructor(private postService: PostService) {}

  @Get()
  findAll() {
    return this.postService.findAll();
  }

  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: number,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.postService.findOne(id).then((post) => {
      if (!post) {
        res.status(HttpStatus.NOT_FOUND).json({
          status: 'Not Found',
          message: 'The post has not been found',
        });
      } else {
        res.status(HttpStatus.OK).json({
          status: 'OK',
          message: 'The post has been successfully found',
          data: post,
        });
      }
    });
  }

  @Roles(Role.ADMIN)
  @Post()
  create(
    @Body() payload: CreatePostDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.postService
      .create(payload)
      .then(() => {
        res.status(HttpStatus.CREATED).json({
          status: 'Created',
          message: 'The post has been successfully created',
        });
      })
      .catch((error) => {
        res.status(HttpStatus.BAD_REQUEST).json({
          status: 'Bad Request',
          message: error.message,
        });
      });
  }

  @Roles(Role.ADMIN)
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdatePostDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.postService.update(id, payload).then((post) => {
      if (!post) {
        res.status(HttpStatus.NOT_FOUND).json({
          status: 'Not Found',
          message: 'The post has not been found',
        });
      } else {
        res.status(HttpStatus.OK).json({
          status: 'OK',
          message: 'The post has been successfully updated',
          data: post,
        });
      }
    });
  }

  @Roles(Role.ADMIN)
  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe) id: number,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.postService.remove(id).then((post) => {
      if (!post) {
        res.status(HttpStatus.NOT_FOUND).json({
          status: 'Not Found',
          message: 'The post has not been found',
        });
      } else {
        res.status(HttpStatus.OK).json({
          status: 'OK',
          message: 'The post has been successfully deleted',
          data: post,
        });
      }
    });
  }
}
