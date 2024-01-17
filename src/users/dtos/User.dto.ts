import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  Contains,
  IsEmail,
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
  @Contains('admin' || 'user')
  readonly role: string;
  @ApiProperty()
  @IsUrl()
  readonly avatarImg?: string;
}
export class UpdateUserDto extends PartialType(CreateUserDto) {}
