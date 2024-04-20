import { Transform } from 'class-transformer';
import { IsString, Length } from 'class-validator';

import { trim } from 'common/validators';

export class CreateTagDto {
  @IsString()
  @Transform(trim)
  @Length(1, 32)
  readonly name: string;
}
