import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { UserController } from './controller/user.controller';

@Module({
  providers: [UserService],
  controllers: [UserController]
})
export class UsersModule {}
