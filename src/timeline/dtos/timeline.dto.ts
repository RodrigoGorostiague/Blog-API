import { ApiProperty, PartialType } from '@nestjs/swagger';

import { IsString } from 'class-validator';
import { User } from '../../users/entities/User.entity';
import { Tag } from '../entities/Tag.entity';

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
  readonly tag?: Tag[];
  @ApiProperty()
  readonly author: User;
}

export class UpdateTimelineDto extends PartialType(CreateTimelineDto) {}
