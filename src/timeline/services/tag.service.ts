import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tag } from '../entities/Tag.entity';
import { CreateTagDto, UpdateTagDto } from '../dtos/Tag.dto';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag)
    private tagRepository: Repository<Tag>,
  ) {}

  findAll() {
    return this.tagRepository.find();
  }

  findOne(id: number) {
    return this.tagRepository.findOneBy({ id });
  }

  create(data: CreateTagDto) {
    const newTag = this.tagRepository.create(data);
    return this.tagRepository.save(newTag);
  }

  async update(id: number, changes: UpdateTagDto) {
    const tag = await this.tagRepository.findOneBy({ id });
    if (!tag) {
      throw new NotFoundException(`Tag #${id} not found`);
    } else {
      this.tagRepository.merge(tag, changes);
    }
    return this.tagRepository.save(tag);
  }

  async remove(id: number) {
    const tag = await this.tagRepository.findOneBy({ id });
    if (!tag) {
      throw new NotFoundException(`Tag #${id} not found`);
    }
    return this.tagRepository.delete({ id });
  }
}
