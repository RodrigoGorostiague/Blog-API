import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsEmail,
  IsIn,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
} from 'class-validator';
export class CreateUserDto {
  @ApiProperty({ description: 'This is the username of the user' }) // Swagger permite dar descripciones a los campos
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  readonly name: string;
  @ApiProperty()
  @IsEmail()
  readonly email: string;
  @ApiProperty()
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  readonly password: string;
  @ApiProperty()
  @IsString()
  @IsIn(['admin', 'user'], { message: 'Role should be either admin or user' })
  readonly role: string;
  @ApiProperty()
  @IsUrl()
  readonly avatar_img?: string;
}
export class UpdateUserDto extends PartialType(CreateUserDto) {}
