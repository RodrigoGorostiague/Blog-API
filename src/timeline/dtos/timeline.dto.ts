import { ApiProperty, PartialType } from '@nestjs/swagger';

import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateTimelineDto {
  @IsString()
  @ApiProperty()
  readonly title: string;
  @IsString()
  @ApiProperty()
  readonly content: string;
  @IsString()
  @ApiProperty()
  readonly img?: string;
  @ApiProperty()
  @IsArray()
  @IsNotEmpty()
  readonly tagsId: number[];
  @ApiProperty()
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  readonly userId: number;
}

export class UpdateTimelineDto extends PartialType(CreateTimelineDto) {}
