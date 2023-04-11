import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { Note, NoteDocument } from './schemas/note.schema';

@Injectable()
export class NotesService {
  constructor(@InjectModel(Note.name) private noteModel: Model<NoteDocument>) {}

  async create(createNoteDto: CreateNoteDto): Promise<Note> {
    const newNote = new this.noteModel(createNoteDto);
    return newNote.save();
  }

  async findAll(): Promise<Note[]> {
    return this.noteModel.find().exec();
  }

  async findOne(id: string): Promise<Note> {
    return this.noteModel.findById(id).exec();
  }

  async update(id: string, updateNoteDto: UpdateNoteDto): Promise<Note> {
    return this.noteModel.findByIdAndUpdate(id, updateNoteDto, { new: true });
  }

  async remove(id: string): Promise<Note> {
    return this.noteModel.findByIdAndRemove(id);
  }
}
