import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reply } from '../entities/Reply.entity';
import { CreateReplyDto, UpdateReplyDto } from '../dtos/Reply.dto';

@Injectable()
export class ReplyService {
  constructor(
    @InjectRepository(Reply) private replyRepository: Repository<Reply>,
  ) {}

  findAll() {
    return this.replyRepository.find();
  }

  findOne(createAt: Date) {
    const reply = this.replyRepository.findOneBy({ createAt });
    if (!reply) {
      throw new NotFoundException(`Reply #${createAt} not found`);
    } else {
      return reply;
    }
  }

  create(data: CreateReplyDto) {
    const newReply = this.replyRepository.create(data);
    return this.replyRepository.save(newReply);
  }

  async update(createAt: Date, changes: UpdateReplyDto) {
    const reply = await this.replyRepository.findOneBy({ createAt });
    this.replyRepository.merge(reply, changes);
    return this.replyRepository.save(reply);
  }

  async remove(createAt: Date) {
    const reply = await this.findOne(createAt);
    if (!reply) {
      throw new NotFoundException(`Reply #${createAt} not found`);
    }
    return this.replyRepository.delete(createAt);
  }
}
