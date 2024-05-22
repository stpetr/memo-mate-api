import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User } from 'users/schemas/user.schema';

import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { Tag, TagDocument } from './schemas/tag.schema';

@Injectable()
export class TagsService {
  constructor(@InjectModel(Tag.name) private tagModel: Model<TagDocument>) {}

  async create(createTagDto: CreateTagDto, user: User) {
    const tagData = {
      ...createTagDto,
      userId: user._id,
    };
    return this.tagModel.create(tagData);
  }

  async findAll(user: User) {
    return this.tagModel
      .find({
        userId: user._id,
      })
      .exec();
  }

  async findOne(id: string, user: User) {
    return this.tagModel
      .findOne({
        id,
        userId: user._id,
      })
      .exec();
  }

  update(id: string, updateTagDto: UpdateTagDto, user: User) {
    const tag = this.tagModel.findOne({
      id,
      userId: user._id,
    });

    if (!tag) {
      throw new NotFoundException();
    }

    return this.tagModel.findByIdAndUpdate(id, updateTagDto, { new: true });
  }

  remove(id: string, user: User) {
    const tag = this.tagModel.findOne({
      id,
      userId: user._id,
    });

    if (!tag) {
      throw new NotFoundException();
    }

    return this.tagModel.findByIdAndRemove(id);
  }
}
