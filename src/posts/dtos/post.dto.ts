import { User } from './../../users/entities/User.entity';
import { ApiProperty, PartialType } from '@nestjs/swagger';

import { IsDate, IsString } from 'class-validator';
export class CreatePostDto {
  @IsString()
  @ApiProperty()
  readonly title: string;
  @IsString()
  @ApiProperty()
  readonly content: string;
  @ApiProperty()
  readonly author: User;
  @IsDate()
  @ApiProperty()
  readonly creatAt: Date;
  @IsString()
  @ApiProperty()
  readonly img?: string;
}

export class UpdatePostDto extends PartialType(CreatePostDto) {}
