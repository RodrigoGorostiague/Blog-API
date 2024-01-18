import { ApiProperty, PartialType } from '@nestjs/swagger';

import { IsString } from 'class-validator';
import { User } from '../../users/entities/User.entity';

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
  @IsString()
  @ApiProperty()
  readonly tag?: string;
  @ApiProperty()
  readonly author: User;
}

export class UpdateTimelineDto extends PartialType(CreateTimelineDto) {}
