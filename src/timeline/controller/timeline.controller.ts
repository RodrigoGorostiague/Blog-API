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
import { TimelineService } from '../services/timeline.service';
import { CreateTimelineDto, UpdateTimelineDto } from '../dtos/timeline.dto';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

@ApiTags('Timeline')
@Controller('timeline')
export class TimelineController {
  constructor(private readonly timelineService: TimelineService) {}

  @Get()
  findAll() {
    return this.timelineService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.timelineService.findOne(id);
  }

  @Post()
  create(
    @Body() createTimelineDto: CreateTimelineDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.timelineService
      .create(createTimelineDto)
      .then(() => {
        res.status(201).json({
          status: 'Created',
          message: 'The timeline has been successfully created',
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
    @Body() updateTimelineDto: UpdateTimelineDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.timelineService
      .update(id, updateTimelineDto)
      .then(() => {
        res.status(200).json({
          status: 'OK',
          message: 'The timeline has been successfully updated',
        });
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  }

  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe) id: number,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.timelineService
      .remove(id)
      .then(() => {
        res.status(200).json({
          status: 'OK',
          message: 'The timeline has been successfully deleted',
        });
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  }

  @Put(':timelineId/tags/:tagId')
  addTagToTimeline(
    @Param('timelineId', ParseIntPipe) timelineId: number,
    @Param('tagId', ParseIntPipe) tagId: number,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.timelineService
      .addTagToTimeline(timelineId, tagId)
      .then(() => {
        res.status(200).json({
          status: 'OK',
          message: 'The tag has been successfully added to the timeline',
        });
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  }

  @Delete(':timelineId/tags/:tagId')
  removeTagToTimeline(
    @Param('timelineId', ParseIntPipe) timelineId: number,
    @Param('tagId', ParseIntPipe) tagId: number,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.timelineService
      .removeTagToTimeline(timelineId, tagId)
      .then(() => {
        res.status(200).json({
          status: 'OK',
          message: 'The tag has been successfully removed to the timeline',
        });
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  }
}
