import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

import { UsersService } from 'users/users.service';

@ValidatorConstraint({ name: 'emailAvailable', async: true })
@Injectable()
export class IsUserEmailAvailableValidator
  implements ValidatorConstraintInterface
{
  constructor(protected readonly usersService: UsersService) {}

  async validate(email: string) {
    const user = await this.usersService.findByEmail(email);
    return !user;
  }
}

export function IsUserEmailAvailable(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsUserEmailAvailableValidator,
    });
  };
}
