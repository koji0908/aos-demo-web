import { ChangeEvent, memo, useEffect, useRef, useState } from 'react';
import {
  Controller,
  ControllerRenderProps,
  FieldValues,
  Path,
  PathValue,
  useController,
  useWatch,
} from 'react-hook-form';
import BaseInput from './BaseInput';
import { canInput, ScreenInfo, ScreenInfoState } from '@/slices/screen-info-slices';
import { useSelector } from 'react-redux';
import { TextField } from '@mui/material';
import { BaseProps, getItemName } from './common';

/**
 * 数値入力Props
 */
export type NumberProps<T extends FieldValues> = BaseProps<T> & {
  /** カンマ編集フラグ */
  isFormat?: boolean;
  /** onBlurイベントハンドラ */
  onBlur?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  /** onChangeイベントハンドラ */
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
  /** onFocusイベントハンドラ */
  onFocus?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
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

  const { labelClassName, isFormat, onBlur, onChange, onFocus, ...restProps } = props;

  // ラベル用クラス
  const labelClass = 'form-display-label ' + (labelClassName ? labelClassName : '');

  const itemName = getItemName(props.name, props.listName, props.index);

  const {
    field,
    fieldState: { invalid, error },
  } = useController({
    name: itemName,
    control: props.control,
  });

  /**
   * 入力値を取得する
   * @returns 項目値
   */
  const getFormatValue = (): string | number | null => {
    if (isFormat && field.value && !isNaN(Number(field.value))) {
      return Number(field.value).toLocaleString();
    }
    return field.value ?? null;
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setIsFocus(false);
    onBlur && onBlur(e);
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setIsFocus(true);
    onFocus && onFocus(e);
    displayRef.current?.blur();
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  };

  const parseNumber = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): number | string => {
    if (!isFormat) {
      return e.target.value ?? '';
    }
    return e.target.value ? Number(e.target.value) : '';
  };

  const handleChange = (
    field: ControllerRenderProps<T, Path<T>>,
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    field.onChange(parseNumber(e));
    onChange && onChange(e);
  };

  return (
    <>
      {canInput(screenInfo) && !isFocus ? (
        <>
          <TextField
            inputRef={displayRef}
            type="text"
            onFocus={handleFocus}
            value={getFormatValue()}
            error={invalid}
            helperText={error?.message}
            {...restProps}
          />
        </>
      ) : (
        <>
          <BaseInput
            type="number"
            inputRef={inputRef}
            onBlur={handleBlur}
            onChange={(e) => handleChange(field, e)}
            {...restProps}
          >
            {(field: ControllerRenderProps<T, Path<T>>) => (
              <span className={labelClass}>{getFormatValue()}</span>
            )}
          </BaseInput>
        </>
      )}
    </>
  );
};

export default memo(InputNumber) as typeof InputNumber;
