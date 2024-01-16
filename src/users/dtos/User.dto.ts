import { Timeline } from './../../timeline/entities/Timeline.entity';
import { Post } from './../../posts/entities/Post.entity';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
} from 'class-validator';
export class CreateUserDto {
  @ApiProperty()
  @IsString()
  readonly username: string;
  @ApiProperty()
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  readonly password: string;
  @ApiProperty()
  @IsEmail()
  readonly email: string;
  @ApiProperty()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  readonly name: string;
  @ApiProperty()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  readonly lastname: string;
  @ApiProperty()
  @IsUrl()
  readonly img?: string;
  @ApiProperty()
  readonly posts?: Post[];
  @ApiProperty()
  readonly timeline?: Timeline[];
  @IsString()
  readonly role: string;
  @IsUrl()
  readonly avatarImg?: string;
}
export class UpdateUserDto extends PartialType(CreateUserDto) {}
