import { memo } from 'react';
import { ControllerRenderProps, FieldValues, Path } from 'react-hook-form';
import BaseInput, { InputProps } from './BaseInput';

/**
 * メールアドレス入力部品
 *
 * @param props 入力Props
 * @returns メールアドレス入力テキストボックス
 */
const InputEmail = <T extends FieldValues>(props: InputProps<T>) => {
  // ラベル用クラス
  const labelClassName = 'form-display-label ' + (props.labelClassName ? props.labelClassName : '');

  return (
    <BaseInput type="email" {...props}>
      {(field: ControllerRenderProps<T, Path<T>>) => (
        <span className={labelClassName}>{field.value}</span>
      )}
    </BaseInput>
  );
};

export default memo(InputEmail) as typeof InputEmail;
