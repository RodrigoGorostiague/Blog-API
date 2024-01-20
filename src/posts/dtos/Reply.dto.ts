import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateReplyDto {
  @ApiProperty()
  @IsString()
  @MaxLength(400)
  content: string;
  @ApiProperty()
  @IsString()
  @MaxLength(50)
  @MinLength(4)
  title: string;
  @ApiProperty()
  @IsUrl()
  @IsOptional()
  img: string;
  @ApiProperty()
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  userId: number;
  @ApiProperty()
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  postId: number;
}

export class UpdateReplyDto extends PartialType(CreateReplyDto) {}
