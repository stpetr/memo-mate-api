import { ValidationArguments, ValidationOptions } from 'class-validator';

export const noSpaces = (): [string, ValidationOptions] => {
  return [
    ' ',
    {
      message: (args: ValidationArguments) => {
        return `${args.property} must not contain spaces`;
      },
    },
  ];
};
