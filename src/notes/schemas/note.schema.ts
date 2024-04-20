import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

import { Tag } from 'tags/schemas/tag.schema';

export type NoteDocument = HydratedDocument<Note>;

@Schema({
  timestamps: true,
  toJSON: { virtuals: true, getters: true },
  toObject: { virtuals: true, getters: true },
})
export class Note {
  @Prop({ isRequired: true })
  title: string;

  @Prop()
  markdown: string;
  @Prop({ type: [{ type: Types.ObjectId, ref: Tag.name }] })
  tags: Tag[];
}

export const NoteSchema = SchemaFactory.createForClass(Note);
