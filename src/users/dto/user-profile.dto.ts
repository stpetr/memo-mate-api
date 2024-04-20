import { User } from 'users/schemas/user.schema';

export class UserProfileDto {
  readonly id?: string;
  readonly email: string;
}

export const getUserProfile = (user: User): UserProfileDto => ({
  id: user.id,
  email: user.email,
});
