import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './../entities/Post.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreatePostDto } from '../dtos/Post.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private postRepository: Repository<Post>,
  ) {}

  findAll() {
    return this.postRepository.find({ relations: ['author', 'reply'] });
  }

  findOne(createAt: Date) {
    const post = this.postRepository.findOneBy({ createAt });
    if (!post) {
      throw new NotFoundException(`Post #${createAt} not found`);
    } else {
      return post;
    }
  }

  create(data: CreatePostDto) {
    const newPost = this.postRepository.create(data);
    return this.postRepository.save(newPost);
  }

  async update(createAt: Date, changes: any) {
    const post = await this.postRepository.findOneBy({ createAt });
    if (!post) {
      throw new NotFoundException(`Post #${createAt} not found`);
    } else {
      this.postRepository.merge(post, changes);
      return this.postRepository.save(post);
    }
  }

  async remove(createAt: Date) {
    const post = this.postRepository.findOneBy({ createAt });
    if (!post) {
      throw new NotFoundException(`Post #${createAt} not found`);
    } else {
      return this.postRepository.delete(createAt);
    }
  }
}
