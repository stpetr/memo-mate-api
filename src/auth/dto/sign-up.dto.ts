import { IsEmail, IsString, Length, NotContains } from 'class-validator';
import { Transform } from 'class-transformer';

import {
  IsUserEmailAvailable,
  MatchesProperty,
  noSpaces,
  trim,
  toLowerCase,
} from 'common/validators';

export class SignUpDto {
  @IsEmail()
  @IsUserEmailAvailable({
    message: 'This email is already taken',
  })
  @Transform(trim)
  @Transform(toLowerCase)
  readonly email: string;
  @IsString()
  @NotContains(...noSpaces())
  @Length(8, 32)
  readonly password: string;
  @IsString()
  @NotContains(...noSpaces())
  @Length(8, 32)
  @MatchesProperty('password', {
    message: 'Passwords must match',
  })
  readonly confirmPassword: string;
}
