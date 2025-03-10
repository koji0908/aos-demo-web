import { memo, useRef, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import { FieldValues, Path } from 'react-hook-form';
import BaseInput, { BaseInputProps } from './BaseInput';
import { ScreenInfo, ScreenInfoState } from '@/slices/screen-info-slices';
import { useSelector } from 'react-redux';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Button, TextField } from '@mui/material';

/**
 * 数値入力Props
 */
export type NumberProps<T extends FieldValues> = BaseInputProps<T> & {
  isFormat?: boolean;
};

/**
 * 数値入力部品
 *
 * @param props 数値入力Props
 * @returns 数値入力テキストボックス
 */
const InputNumber = <T extends FieldValues>(props: NumberProps<T>) => {
  const screenInfo: ScreenInfo = useSelector((state: ScreenInfoState) => state.screenInfo);
  const inputRef = useRef<HTMLInputElement>(null);
  const displayRef = useRef<HTMLInputElement>(null);
  const [isFocus, setIsFocus] = useState(false);

  const {
    name,
    listName,
    index,
    labelClassName,
    getValues,
    register,
    errors,
    isFormat,
    ...restProps
  } = props;

  // 項目名
  const itemName = (listName ? `${listName}.${index}.${name}` : name) as Path<T>;
  const [displayValue, setDisplayValue] = useState(getValues(itemName));

  // ラベル用クラス
  const labelClass = 'form-display-label ' + (labelClassName ? labelClassName : '');

  /**
   * 入力値を取得する
   * @returns 項目値
   */
  const getValue = (): String => {
    const value = getValues(itemName);
    if (isFormat) {
      //return value ? value.replace(/,/g, '') : '';
      if (value) {
        const val = Number(value);
        return val.toLocaleString();
      }
    }
    return value;
  };

  const handleBlur = (e: any) => {
    register(itemName).onChange(e);
    setDisplayValue(getValues(itemName));
    setIsFocus(false);
  };

  const handleFocus = (e: any) => {
    console.log('===========' + getValues(itemName));
    setIsFocus(true);
    displayRef.current?.blur();
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  };

  return (
    <>
      {screenInfo.status === 'input' && (
        <>
          {isFocus && (
            <>
              <BaseInput
                type="number"
                name={name}
                listName={listName}
                index={index}
                inputRef={inputRef}
                register={register}
                errors={errors}
                getValues={getValues}
                onBlur={handleBlur}
                {...restProps}
              />
              focus
            </>
          )}
          {!isFocus && (
            <>
              <TextField
                inputRef={displayRef}
                type="text"
                onFocus={handleFocus}
                value={displayValue}
                {...restProps}
              />
              blur
            </>
          )}
        </>
      )}
      {screenInfo.status !== 'input' && <span className={labelClass}>{getValue()}</span>}
    </>
  );
};

export default memo(InputNumber) as typeof InputNumber;
