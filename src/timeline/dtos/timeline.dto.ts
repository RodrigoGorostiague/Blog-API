import { ApiProperty, PartialType } from '@nestjs/swagger';

import { IsDate, IsString } from 'class-validator';
import { User } from 'src/users/entities/User.entity';

export class CreateTimelineDto {
  @IsDate()
  @ApiProperty()
  readonly cratedAt: Date;
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
