import { ControllerRenderProps, FieldValues, Path } from 'react-hook-form';
import BaseInput, { BaseInputProps, InputProps } from './BaseInput';
import { memo } from 'react';

/**
 * テキストボックスProps
 */
export type TextAreaProps<T extends FieldValues> = InputProps<T> & {
  /** 行数 */
  rows: string | number;
};

/**
 * テキストエリア部品
 * @param props
 * @returns
 */
const TextArea = <T extends FieldValues>(props: TextAreaProps<T>) => {
  // ラベル用クラス
  const labelClassName = 'form-display-label ' + (props.labelClassName ? props.labelClassName : '');

  /**
   * 入力値を取得する
   * @returns 項目値
   */
  const getValue = (value: string): String => {
    return value
      ? value
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/\n/g, '<br>')
      : '';
  };

  return (
    <BaseInput type="text" multiline={true} {...props}>
      {(field: ControllerRenderProps<T, Path<T>>) => (
        <span
          className={labelClassName}
          dangerouslySetInnerHTML={{ __html: getValue(field.value) }}
        ></span>
      )}
    </BaseInput>
  );
};

export default memo(TextArea) as typeof TextArea;
