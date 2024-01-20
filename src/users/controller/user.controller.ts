import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { CreateUserDto, UpdateUserDto } from '../dtos/User.dto';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

@ApiTags('users')
@Controller('user')
export class UserController {
  constructor(private readonly _userService: UserService) {}

  @Get()
  findAll() {
    return this._userService.findAll();
  }

  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: number,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this._userService.findOne(id).then((user) => {
      if (!user) {
        res.status(HttpStatus.NOT_FOUND).json({
          status: 'Not Found',
          message: 'The user has not been found',
        });
      } else {
        res.status(HttpStatus.OK).json({
          status: 'OK',
          message: 'The user has been successfully found',
          data: user,
        });
      }
    });
  }

  @Post()
  create(
    @Body() payload: CreateUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this._userService
      .create(payload)
      .then(() => {
        res.status(HttpStatus.CREATED).json({
          status: 'Created',
          message: 'The user has been successfully created',
        });
      })
      .catch((err) => {
        res.status(HttpStatus.CONFLICT).json({
          status: 'Conflict',
          message: 'The user has not been created',
          error: err,
        });
      });
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this._userService
      .update(id, payload)
      .then(() => {
        res.status(HttpStatus.OK).json({
          status: 'OK',
          message: 'The user has been successfully updated',
        });
      })
      .catch((err) => {
        res.status(HttpStatus.CONFLICT).json({
          status: 'Conflict',
          message: 'The user has not been updated',
          error: err,
        });
      });
  }

  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe) id: number,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this._userService
      .remove(id)
      .then(() => {
        res.status(HttpStatus.OK).json({
          status: 'OK',
          message: 'The user has been successfully deleted',
        });
      })
      .catch((err) => {
        res.status(HttpStatus.CONFLICT).json({
          status: 'Conflict',
          message: 'The user has not been deleted',
          error: err,
        });
      });
  }
}
