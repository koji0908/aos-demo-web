import { memo } from 'react';
import { ControllerRenderProps, FieldValues, Path } from 'react-hook-form';
import BaseInput, { InputProps } from './BaseInput';

/**
 * テキストボックスProps
 */
export type InputTextProps<T extends FieldValues> = InputProps<T> & {};

/**
 * テキストボックス部品
 *
 * @param props テキストボックスProps
 * @returns テキストボックス
 */
const InputText = <T extends FieldValues>(props: InputTextProps<T>) => {
  // ラベル用クラス
  const labelClassName = 'form-display-label ' + (props.labelClassName ? props.labelClassName : '');

  return (
    <BaseInput type="text" {...props}>
      {(field: ControllerRenderProps<T, Path<T>>) => (
        <span className={labelClassName}>{field.value}</span>
      )}
    </BaseInput>
  );
};

export default memo(InputText) as typeof InputText;
