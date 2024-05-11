import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { hash } from 'bcryptjs';
import { Model } from 'mongoose';

import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const passwordHash = await hash(createUserDto.password, 8);
    const userData = {
      ...createUserDto,
      password: passwordHash,
    };

    return this.userModel.create({ ...userData });
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.userModel.findOne({ email: email.toLowerCase() }).exec();
  }
}
