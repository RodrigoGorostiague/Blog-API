import { User } from '../../users/entities/User.entity';
import { ApiProperty, PartialType } from '@nestjs/swagger';

import { IsDate, IsString, IsUrl } from 'class-validator';
import { Post } from '../entities/Post.entity';
export class CreatePostDto {
  @IsString()
  @ApiProperty()
  title: string;
  @IsString()
  @ApiProperty()
  content: string;
  author: User;
  @IsDate()
  @ApiProperty()
  creatAt: Date;
  @IsUrl()
  @ApiProperty()
  img?: string[];
  @ApiProperty()
  reply?: Post[];
}

export class UpdatePostDto extends PartialType(CreatePostDto) {}
