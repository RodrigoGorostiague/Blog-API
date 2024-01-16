import { ApiProperty, PartialType } from '@nestjs/swagger';

import { IsDate, IsString } from 'class-validator';

export class CreateTimelineDto {
  @IsDate()
  @ApiProperty()
  cratedAt: Date;
  @IsString()
  @ApiProperty()
  readonly title: string;
  @IsString()
  @ApiProperty()
  readonly content: string;
  @IsString()
  @ApiProperty()
  readonly img?: string[];
  @IsString()
  @ApiProperty()
  readonly tag?: string[];
}

export class UpdateTimelineDto extends PartialType(CreateTimelineDto) {}
