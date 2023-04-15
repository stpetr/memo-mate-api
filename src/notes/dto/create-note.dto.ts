import { Tag } from '../../tags/schemas/tag.schema';

export class CreateNoteDto {
  readonly title: string;
  readonly markdown: string;
  tags: Tag[];
}
