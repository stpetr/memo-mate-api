import { Transform } from 'class-transformer';
import { IsArray, IsEmpty, IsString, Length } from 'class-validator';

import { trim } from 'common/validators';

import { Tag } from 'tags/schemas/tag.schema';
import { User } from 'users/schemas/user.schema';

export class CreateNoteDto {
  @IsString()
  @Transform(trim)
  @Length(2, 255)
  readonly title: string;

  @IsString()
  readonly markdown: string;

  @IsArray()
  tags: Tag[];

  @IsEmpty()
  userId: User;
}
