import { IsEmail, IsString, Length, NotContains } from 'class-validator';
import { Transform } from 'class-transformer';

import { trim, noSpaces } from 'common/validators';

export class CreateUserDto {
  @IsEmail()
  @Transform(trim)
  readonly email: string;
  @IsString()
  @NotContains(...noSpaces())
  @Length(8, 32)
  readonly password: string;
}
