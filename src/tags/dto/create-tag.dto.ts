import { Transform } from 'class-transformer';
import { IsEmpty, IsString, Length } from 'class-validator';

import { trim } from 'common/validators';

import { User } from 'users/schemas/user.schema';

export class CreateTagDto {
  @IsString()
  @Transform(trim)
  @Length(1, 32)
  readonly name: string;

  @IsEmpty()
  userId: User;
}
