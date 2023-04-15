import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TagDocument = HydratedDocument<Tag>;

@Schema({
  timestamps: true,
  toJSON: { virtuals: true, getters: true },
  toObject: { virtuals: true, getters: true },
})
export class Tag {
  id?: string;
  @Prop({ isRequired: true })
  name: string;
}

export const TagSchema = SchemaFactory.createForClass(Tag);

TagSchema.virtual('notes', {
  ref: 'Note',
  localField: '_id',
  foreignField: 'tags',
});
