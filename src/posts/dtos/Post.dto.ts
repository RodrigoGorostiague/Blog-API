import { ApiProperty, PartialType } from '@nestjs/swagger';

import {
  IsDate,
  IsNotEmpty,
  IsNumber,
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
  img?: string[];
  @ApiProperty()
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  userId: number;
  @ApiProperty()
  @IsDate()
  replyId?: number;
}

export class UpdatePostDto extends PartialType(CreatePostDto) {}
