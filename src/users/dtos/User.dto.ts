import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
} from 'class-validator';
export class CreateUserDto {
  @ApiProperty({ description: 'This is the username of the user' }) // Swagger permite dar descripciones a los campos
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
  readonly role: string;
  @ApiProperty()
  @IsUrl()
  readonly avatarImg?: string;
}
export class UpdateUserDto extends PartialType(CreateUserDto) {}