import { Post } from './../entities/Post.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PostService {
  private posts: Post[] = [
    {
      id: 1,
      title: 'Creacion de la Api',
      content:
        'Se creo la api con nestjs y se subio a github. Lorem ipsum dolor sit ame consectetur adipi scing elit. Quisquam, quos?',
      author: {
        id: 1,
        name: 'Rodaja',
        role: 'admin',
      },
      img: ['https://www.nestjs.com/img/logo-small.svg'],
      creatAt: new Date(),
      reply: [
        {
          id: 2,
          title: 'Creacion de la Api',
          content:
            'Se creo la api con nestjs y se subio a github. Lorem ipsum dolor sit ame consectetur adipi scing elit. Quisquam, quos?',
          author: {
            id: 2,
            name: 'Yisus',
            role: 'admin',
          },
          img: ['https://www.nestjs.com/img/logo-small.svg'],
          creatAt: new Date(),
        },
      ],
    },
  ];

  findAll() {
    return this.posts;
  }

  findOne(id: number) {
    return this.posts[id];
  }

  create(data: any) {
    this.posts.push(data);
    return data;
  }

  update(id: number, changes: any) {
    const updatedPost = {
      ...this.posts[id],
      ...changes,
    };
    this.posts[id] = updatedPost;
    return this.posts[id];
  }

  remove(id: number) {
    this.posts.splice(id, 1);
    return true;
  }
}
