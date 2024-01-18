import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';

export class CreateTagDto {
  @ApiProperty()
  @IsString()
  @MaxLength(20)
  readonly title: string;
  @ApiProperty()
  @IsString()
  @MaxLength(100)
  readonly description: string;
}

export class UpdateTagDto extends PartialType(CreateTagDto) {}
