import * as zod from 'zod';

export const validationMessage: zod.ZodErrorMap = (issue, ctx) => {
  switch (issue.code) {
    case zod.ZodIssueCode.invalid_type:
      if (issue.received === zod.ZodParsedType.undefined) {
        return { message: '必須項目です。' };
      } else {
        return { message: '値に誤りがあります。' };
      }
    case zod.ZodIssueCode.too_big:
      return { message: `${issue.maximum}文字以内で入力してくださいね` };

    case zod.ZodIssueCode.too_small:
      if (issue.type === 'array') {
        return { message: `${issue.minimum}つ以上チェックしてくださいね` };
      }
      if (issue.minimum == 1) {
        return { message: '必須ですよ' };
      }
      return { message: `${issue.minimum}文字以上で入力してくださいね` };
  }
  return { message: ctx.defaultError };
};
