import { Transform } from 'class-transformer';
import { IsArray, IsString, Length } from 'class-validator';

import { trim } from 'common/validators';

import { Tag } from 'tags/schemas/tag.schema';

export class CreateNoteDto {
  @IsString()
  @Transform(trim)
  @Length(2, 255)
  readonly title: string;
  @IsString()
  readonly markdown: string;
  @IsArray()
  tags: Tag[];
}
