import { registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator';

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
          if (value && !relatedValue) {
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

export function RequireAtleastOne(fields: string[], validationOptions?: ValidationOptions) {
  return (object: object, propertyName: string) => {
    let errorMsg = '';
    registerDecorator({
      name: 'RequireBothFields',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [fields],
      validator: {
        validate(value: any, args: ValidationArguments) {
          for (let arg of args.constraints[0] as any) {
            const relatedValue = args.object[arg];
            if (relatedValue) {
              return true;
            }
            errorMsg += `[${arg}]`;
          }
          return false;
        },
        defaultMessage(args: ValidationArguments) {
          return `Atleast one of ${errorMsg} should be present`;
        },
      },
    });
  };
}
