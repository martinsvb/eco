import { ApiProperty } from '@nestjs/swagger';
import { Content } from '@prisma/client';
import { UserEntity } from '../../users/entities/user.entity';

export class ContentEntity implements Content {
  @ApiProperty({ description: 'Id' })
  readonly id: string;

  @ApiProperty({ description: 'Content title' })
  title: string;

  @ApiProperty({ description: 'Content text' })
  text: string;

  @ApiProperty({ description: 'Content type' })
  type: string;

  @ApiProperty({ description: 'Content state', required: false })
  state: string | null;

  @ApiProperty({ description: 'Published state', required: false })
  published: boolean | null;

  @ApiProperty({ description: 'Date of creation' })
  createdAt: Date;

  @ApiProperty({ description: 'Date of update' })
  updatedAt: Date;

  @ApiProperty({ description: 'Content author id' })
  authorId: string;

  @ApiProperty({ description: 'Content author', type: UserEntity })
  author: UserEntity;

  constructor({ author, ...data }: Partial<ContentEntity>) {
    Object.assign(this, data);

    if (author) {
      this.author = new UserEntity(author);
    }
  }
}