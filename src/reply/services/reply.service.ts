import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Reply } from '../entities/Reply.entity';
import { CreateReplyDto, UpdateReplyDto } from '../dtos/Reply.dto';
import { User } from '../../users/entities/User.entity';

@Injectable()
export class ReplyService {
  constructor(
    @InjectRepository(Reply) private replyRepository: Repository<Reply>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  findAll() {
    return this.replyRepository.find({ relations: ['author', 'post'] });
  }

  findOne(id: number) {
    const reply = this.replyRepository.findOneBy({ id });
    if (!reply) {
      throw new NotFoundException(`Reply #${id} not found`);
    } else {
      return reply;
    }
  }

  findByIds(ids: number[]) {
    return this.replyRepository.findBy({ id: In([ids]) });
  }

  async create(data: CreateReplyDto) {
    const newReply = this.replyRepository.create(data);
    if (data.userId) {
      const author = await this.userRepository.findOneBy({ id: data.userId });
      newReply.author = author;
    }
    return this.replyRepository.save(newReply);
  }

  async update(id: number, changes: UpdateReplyDto) {
    const reply = await this.replyRepository.findOneBy({ id });
    this.replyRepository.merge(reply, changes);
    return this.replyRepository.save(reply);
  }

  async remove(id: number) {
    const reply = await this.findOne(id);
    if (!reply) {
      throw new NotFoundException(`Reply #${id} not found`);
    }
    return this.replyRepository.delete(id);
  }
}
