import { ApiProperty, PartialType } from '@nestjs/swagger';

import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUrl,
} from 'class-validator';
export class CreatePostDto {
  @IsString()
  @ApiProperty()
  title: string;
  @IsString()
  @ApiProperty()
  content: string;
  @IsUrl()
  @ApiProperty()
  @IsOptional()
  img?: string[];
  @ApiProperty()
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  userId: number;
  @ApiProperty()
  @IsArray()
  @IsOptional()
  replyId?: number[];
}

export class UpdatePostDto extends PartialType(CreatePostDto) {}
