import { memo } from 'react';
import { FieldValues, Path } from 'react-hook-form';
import BaseInput, { BaseInputProps } from './BaseInput';
import { ScreenInfo, ScreenInfoState } from '@/slices/screen-info-slices';
import { useSelector } from 'react-redux';

/**
 * 電話番号入力部品
 *
 * @param props 入力Props
 * @returns 電話番号入力テキストボックス
 */
const InputTel = <T extends FieldValues>(props: BaseInputProps<T>) => {
  const screenInfo: ScreenInfo = useSelector((state: ScreenInfoState) => state.screenInfo);

  const { name, listName, index, ...restProps } = props;

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
      {screenInfo.status === 'input' && (
        <BaseInput type="tel" name={name} listName={listName} index={index} {...restProps} />
      )}
      {screenInfo.status !== 'input' && <span className={labelClassName}>{getValue()}</span>}
    </>
  );
};

export default memo(InputTel) as typeof InputTel;
