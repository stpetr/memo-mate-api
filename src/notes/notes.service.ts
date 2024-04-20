import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { Tag, TagDocument } from 'tags/schemas/tag.schema';

import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { Note, NoteDocument } from './schemas/note.schema';

@Injectable()
export class NotesService {
  constructor(
    @InjectModel(Note.name) private noteModel: Model<NoteDocument>,
    @InjectModel(Tag.name) private tagModel: Model<TagDocument>,
  ) {}

  protected async prepareTags(data: Tag[]): Promise<string[]> {
    const tagsIds = await Promise.all(
      data?.map(async (el) => {
        if (
          el?.id &&
          Types.ObjectId.isValid(el.id) &&
          (await this.tagModel.exists({ _id: el.id }))
        ) {
          return el.id;
        }
        return null;
      }) || [],
    );

    return tagsIds.filter((el) => !!el);
  }

  async create(createNoteDto: CreateNoteDto): Promise<Note> {
    const note = await this.noteModel.create({
      ...createNoteDto,
      tags: await this.prepareTags(createNoteDto.tags),
    });

    return await note.populate('tags');
  }

  async findAll(): Promise<Note[]> {
    return this.noteModel.find().populate('tags').exec();
  }

  async findOne(id: string): Promise<Note> {
    return this.noteModel.findById(id).exec();
  }

  async update(id: string, updateNoteDto: UpdateNoteDto): Promise<Note> {
    return this.noteModel
      .findByIdAndUpdate(
        id,
        {
          ...updateNoteDto,
          tags: await this.prepareTags(updateNoteDto?.tags),
        },
        { new: true },
      )
      .populate('tags');
  }

  async remove(id: string): Promise<Note> {
    return this.noteModel.findByIdAndRemove(id);
  }
}
