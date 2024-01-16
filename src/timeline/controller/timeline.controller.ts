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
import { TimelineService } from '../services/timeline.service';
import { CreateTimelineDto, UpdateTimelineDto } from '../dtos/timeline.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Timeline')
@Controller('timeline')
export class TimelineController {
  constructor(private readonly timelineService: TimelineService) {}

  @Get()
  findAll() {
    return this.timelineService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.timelineService.findOne(+id);
  }

  @Post()
  create(@Body() createTimelineDto: CreateTimelineDto) {
    return this.timelineService.create(createTimelineDto);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTimelineDto: UpdateTimelineDto,
  ) {
    return this.timelineService.update(id, updateTimelineDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.timelineService.remove(id);
  }
}
