import { memo } from 'react';
import { FieldValues, Path } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { ScreenInfo, ScreenInfoState } from '@/slices/screen-info-slices';
import BaseInput, { BaseInputProps } from './BaseInput';

/**
 * TODO これはNumberInputとかTextAreaのpropsに移動させる
 * テキストボックスProps
 */
export type InputTextProps<T extends FieldValues> = BaseInputProps<T> & {
  /** 最大値 */
  max?: number | string | undefined;
  /** 最小値 */
  min?: number | string | undefined;
  /** 複数行入力可能フラグ */
  multiline?: boolean;
  /** 行数 */
  rows?: string | number;
  /** 最大行数 */
  maxRows?: string | number;
  /** 最小行数 */
  minRows?: string | number;
};

/**
 * テキストボックス部品
 *
 * @param props テキストボックスProps
 * @returns テキストボックス
 */
const InputText = <T extends FieldValues>(props: InputTextProps<T>) => {
  const screenInfo: ScreenInfo = useSelector((state: ScreenInfoState) => state.screenInfo);

  const { name, listName, index } = props;

  // 項目名
  const itemName = listName ? `${listName}.${index}.${name}` : name;

  // ラベル用クラス
  const labelClassName = 'form-display-label ' + (props.labelClassName ? props.labelClassName : '');

  /**
   * 入力値を取得する
   * @returns 項目値
   */
  const getValue = (): String => {
    return props.getValues(itemName as Path<T>);
  };

  return (
    <>
      {screenInfo.status === 'input' && <BaseInput type="text" {...props} />}
      {screenInfo.status !== 'input' && <span className={labelClassName}>{getValue()}</span>}
    </>
  );
};

export default memo(InputText) as typeof InputText;
