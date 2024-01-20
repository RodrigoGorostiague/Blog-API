import { ApiProperty, PartialType } from '@nestjs/swagger';

import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateTimelineDto {
  @ApiProperty()
  @IsString()
  readonly title: string;
  @ApiProperty()
  @IsString()
  readonly content: string;
  @ApiProperty()
  @IsString()
  @IsOptional()
  readonly img?: string;
  @ApiProperty()
  @IsArray()
  @IsOptional()
  readonly tagsId: number[];
  @ApiProperty()
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  readonly userId: number;
}

export class UpdateTimelineDto extends PartialType(CreateTimelineDto) {}
