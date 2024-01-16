import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { CreateUserDto, UpdateUserDto } from '../dtos/User.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('user')
export class UserController {
  constructor(private readonly _userService: UserService) {}

  @Get()
  findAll() {
    return this._userService.findAll();
  }

  @Get(':id')
  findOne(id: number) {
    return this._userService.findOne(id);
  }

  @Post()
  create(@Body() payload: CreateUserDto) {
    return this._userService.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateUserDto,
  ) {
    return this._userService.update(id, payload);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this._userService.remove(id);
  }
}
