import {ValidationArguments, registerDecorator, ValidationOptions} from 'class-validator';

export function RequireBothFields(field: string, validationOptions?: ValidationOptions) {
    return (object: object, propertyName: string) => {
      registerDecorator({
        name: 'RequireBothFields',
        target: object.constructor,
        propertyName,
        options: validationOptions,
        constraints: [field],
        validator: {
          validate(value: any, args: ValidationArguments) {
            const relatedField = args.constraints[0];
            const relatedValue = (args.object as any)[relatedField];
            if ((value && !relatedValue)) {
              return false;
            }
            return true;
          },
          defaultMessage(args: ValidationArguments) {
            return `${args.property} requires ${args.constraints[0]} and vice versa.`;
          },
        },
      });
    };
  }