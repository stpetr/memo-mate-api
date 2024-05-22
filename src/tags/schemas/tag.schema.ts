import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

import { User } from 'users/schemas/user.schema';

export type TagDocument = HydratedDocument<Tag>;

@Schema({
  timestamps: true,
  toJSON: { virtuals: true, getters: true },
  toObject: { virtuals: true, getters: true },
})
export class Tag {
  _id: Types.ObjectId;
  id: string;

  @Prop({ isRequired: true })
  name: string;

  @Prop({ type: Types.ObjectId, ref: User.name, isRequired: true })
  userId: User;
}

export const TagSchema = SchemaFactory.createForClass(Tag);

TagSchema.virtual('notes', {
  ref: 'Note',
  localField: '_id',
  foreignField: 'tags',
});
