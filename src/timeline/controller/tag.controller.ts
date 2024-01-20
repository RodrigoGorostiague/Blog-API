import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TagService } from '../services/tag.service';
import { CreateTagDto, UpdateTagDto } from '../dtos/Tag.dto';
import { Response } from 'express';

@ApiTags('Tag')
@Controller('tag')
export class TagController {
  constructor(private tagService: TagService) {}

  @Get()
  findAll() {
    return this.tagService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.tagService.findOne(id);
  }

  @Post()
  create(
    @Body() createTagDto: CreateTagDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.tagService
      .create(createTagDto)
      .then(() => {
        res.status(201).json({
          status: 'Created',
          message: 'The tag has been successfully created',
        });
      })
      .catch((err) => {
        res.status(400).json({
          status: 'Que paso papa, te asustaste???',
          message: err,
        });
      });
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTagDto: UpdateTagDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.tagService
      .update(id, updateTagDto)
      .then(() => {
        res.status(201).json({
          status: 'Updated',
          message: 'The tag has been successfully updated',
        });
      })
      .catch((err) => {
        res.status(400).json({
          status: 'Que paso papa, te asustaste???',
          message: err,
        });
      });
  }

  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe) id: number,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.tagService
      .remove(id)
      .then(() => {
        res.status(200).json({
          status: 'OK',
          message: 'The timeline has been successfully deleted',
        });
      })
      .catch((err) => {
        res.status(400).json({
          status: 'Que paso papa, te asustaste???',
          message: err,
        });
      });
  }
}
