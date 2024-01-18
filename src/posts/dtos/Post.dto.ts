import { User } from '../../users/entities/User.entity';
import { ApiProperty, PartialType } from '@nestjs/swagger';

import { IsString, IsUrl } from 'class-validator';
import { Post } from '../entities/Post.entity';
export class CreatePostDto {
  @IsString()
  @ApiProperty()
  title: string;
  @IsString()
  @ApiProperty()
  content: string;
  @ApiProperty()
  author: User;
  @IsUrl()
  @ApiProperty()
  img?: string[];
  @ApiProperty()
  reply?: Post[];
}

export class UpdatePostDto extends PartialType(CreatePostDto) {}
