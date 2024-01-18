import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsString, IsUrl, MaxLength, MinLength } from 'class-validator';

export class CreateReplyDto {
  @ApiProperty()
  @IsString()
  @MaxLength(400)
  readonly content: string;
  @ApiProperty()
  @IsString()
  @MaxLength(50)
  @MinLength(4)
  readonly title: string;
  @ApiProperty()
  @IsUrl()
  readonly img: string;
}

export class UpdateReplyDto extends PartialType(CreateReplyDto) {}
