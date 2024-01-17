import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './../entities/Post.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreatePostDto } from '../dtos/post.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private postRepository: Repository<Post>,
  ) {}

  findAll() {
    return this.postRepository.find();
  }

  findOne(id: number) {
    const post = this.postRepository.findOneBy({ id });
    if (!post) {
      throw new NotFoundException(`Post #${id} not found`);
    } else {
      return post;
    }
  }

  create(data: CreatePostDto) {
    const newPost = this.postRepository.create(data);
    return this.postRepository.save(newPost);
  }

  async update(id: number, changes: any) {
    const post = await this.postRepository.findOneBy({ id });
    if (!post) {
      throw new NotFoundException(`Post #${id} not found`);
    } else {
      this.postRepository.merge(post, changes);
      return this.postRepository.save(post);
    }
  }

  async remove(id: number) {
    const post = await this.findOne(id);
    if (!post) {
      throw new NotFoundException(`Post #${id} not found`);
    } else {
      return this.postRepository.delete(id);
    }
  }
}
