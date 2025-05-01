import { memo } from 'react';
import { ControllerRenderProps, FieldValues, Path } from 'react-hook-form';
import BaseInput, { InputProps } from './BaseInput';

/**
 * 電話番号入力部品
 *
 * @param props 入力Props
 * @returns 電話番号入力テキストボックス
 */
const InputTel = <T extends FieldValues>(props: InputProps<T>) => {
  // ラベル用クラス
  const labelClassName = 'form-display-label ' + (props.labelClassName ? props.labelClassName : '');

  return (
    <BaseInput type="tel" {...props}>
      {(field: ControllerRenderProps<T, Path<T>>) => (
        <span className={labelClassName}>{field.value}</span>
      )}
    </BaseInput>
  );
};

export default memo(InputTel) as typeof InputTel;
