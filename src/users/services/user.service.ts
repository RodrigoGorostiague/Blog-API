import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '../entities/User.entity';
import { CreateUserDto, UpdateUserDto } from '../dtos/User.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  findAll() {
    return this.userRepository.find({ relations: ['post', 'reply'] });
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return user;
  }

  create(data: CreateUserDto) {
    const newUser = this.userRepository.create(data);
    return this.userRepository.save(newUser);
  }

  async update(id: number, changes: UpdateUserDto) {
    const user = await this.userRepository.findOneBy({ id });
    this.userRepository.merge(user, changes);
    return this.userRepository.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return this.userRepository.delete(id);
  }
}
