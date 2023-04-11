import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type NoteDocument = HydratedDocument<Note>;

@Schema({ timestamps: true })
export class Note {
  @Prop({ isRequired: true })
  title: string;

  @Prop()
  markdown: string;
}

export const NoteSchema = SchemaFactory.createForClass(Note);
