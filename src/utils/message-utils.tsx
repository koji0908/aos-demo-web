import { FieldErrors } from 'react-hook-form';

export const getValidationErrorMessage = (errors: FieldErrors): Array<string> => {
  const ret: Array<string> = [];
  Object.keys(errors).forEach((key: string) => {
    if (errors[key]) {
      ret.push(errors[key].message?.toString()!);
    }
  });
  return ret;
};
