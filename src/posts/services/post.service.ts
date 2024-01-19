import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './../entities/Post.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { CreatePostDto, UpdatePostDto } from '../dtos/Post.dto';
import { User } from '../../users/entities/User.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  findAll() {
    return this.postRepository.find({ relations: ['author', 'reply'] });
  }

  findOne(id: number) {
    const post = this.postRepository.findOneBy({
      id,
    });
    if (!post) {
      throw new NotFoundException(`Post #${id} not found`);
    } else {
      return post;
    }
  }

  findByIds(ids: number[]) {
    return this.postRepository.findBy({ id: In([ids]) });
  }

  async create(data: CreatePostDto) {
    const newPost = this.postRepository.create(data);
    if (data.userId) {
      const author = await this.userRepository.findOneBy({ id: data.userId });
      newPost.author = author;
    }
    return this.postRepository.save(newPost);
  }

  async update(id: number, changes: UpdatePostDto) {
    const post = await this.postRepository.findOneBy({ id });
    if (!post) {
      throw new NotFoundException(`Post #${id} not found`);
    } else {
      this.postRepository.merge(post, changes);
      return this.postRepository.save(post);
    }
  }

  async remove(id: number) {
    const post = this.postRepository.findOneBy({ id });
    if (!post) {
      throw new NotFoundException(`Post #${id} not found`);
    } else {
      return this.postRepository.delete(id);
    }
  }
}
