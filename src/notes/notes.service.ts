import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { Tag, TagDocument } from 'tags/schemas/tag.schema';
import { User } from 'users/schemas/user.schema';

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

  async create(createNoteDto: CreateNoteDto, user: User): Promise<Note> {
    const noteData = {
      ...createNoteDto,
      tagsIds: await this.prepareTags(createNoteDto.tags),
      userId: user._id,
    };

    const note = await this.noteModel.create(noteData);

    return await note.populate('tags');
  }

  async findAll(user: User): Promise<Note[]> {
    return this.noteModel
      .find({
        userId: user._id,
      })
      .populate('tags')
      .exec();
  }

  async findOne(id: string, user: User): Promise<Note> {
    return this.noteModel
      .findOne({
        id,
        userId: user._id,
      })
      .exec();
  }

  async update(
    id: string,
    updateNoteDto: UpdateNoteDto,
    user: User,
  ): Promise<Note> {
    const note = await this.noteModel.findOne({
      _id: id,
      userId: user._id,
    });

    if (!note) {
      throw new NotFoundException();
    }

    return this.noteModel
      .findByIdAndUpdate(
        id,
        {
          ...updateNoteDto,
          tagsIds: await this.prepareTags(updateNoteDto?.tags),
          userId: user._id,
        },
        { new: true },
      )
      .populate('tags');
  }

  async remove(id: string, user: User): Promise<Note> {
    const note = await this.noteModel.findOne({
      _id: id,
      userId: user._id,
    });

    if (!note) {
      throw new NotFoundException();
    }

    return this.noteModel.findByIdAndRemove(id);
  }
}
