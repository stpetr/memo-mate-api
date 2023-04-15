import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { Tag, TagDocument } from './schemas/tag.schema';

@Injectable()
export class TagsService {
  constructor(@InjectModel(Tag.name) private tagModel: Model<TagDocument>) {}

  async create(createTagDto: CreateTagDto) {
    return this.tagModel.create(createTagDto);
  }

  async findAll() {
    return this.tagModel.find().exec();
  }

  async findOne(id: string) {
    return this.tagModel.findById(id).exec();
  }

  update(id: string, updateTagDto: UpdateTagDto) {
    return this.tagModel.findByIdAndUpdate(id, updateTagDto, { new: true });
  }

  remove(id: string) {
    return this.tagModel.findByIdAndRemove(id);
  }
}
