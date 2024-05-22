import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

import { Tag } from 'tags/schemas/tag.schema';
import { User } from 'users/schemas/user.schema';

export type NoteDocument = HydratedDocument<Note>;

@Schema({
  timestamps: true,
  toJSON: { virtuals: true, getters: true },
  toObject: { virtuals: true, getters: true },
})
export class Note {
  _id: Types.ObjectId;
  id: string;

  @Prop({ isRequired: true })
  title: string;

  @Prop()
  markdown: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: Tag.name }] })
  tagsIds: Tag[];

  @Prop({ type: Types.ObjectId, ref: User.name })
  userId: User;
}

export const NoteSchema = SchemaFactory.createForClass(Note);

NoteSchema.virtual('user', {
  ref: 'User',
  localField: 'userId',
  foreignField: '_id',
  justOne: true,
});

NoteSchema.virtual('tags', {
  ref: 'Tag',
  localField: 'tagsIds',
  foreignField: '_id',
});
