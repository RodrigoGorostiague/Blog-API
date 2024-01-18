import { User } from '../../users/entities/User.entity';
import { ApiProperty, PartialType } from '@nestjs/swagger';

import { IsString, IsUrl } from 'class-validator';
import { Reply } from 'src/reply/entities/Reply.entity';
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
  author: User;
  @ApiProperty()
  reply?: Reply[];
}

export class UpdatePostDto extends PartialType(CreatePostDto) {}
