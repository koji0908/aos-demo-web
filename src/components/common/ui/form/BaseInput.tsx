import { ChangeEvent, memo, ReactNode } from 'react';
import { TextField } from '@mui/material';
import { Controller, ControllerRenderProps, FieldValues, Path } from 'react-hook-form';
import { BaseProps, getItemName } from './common';
import { canInput, ScreenInfo, ScreenInfoState } from '@/slices/screen-info-slices';
import { useSelector } from 'react-redux';

/**
 * 入力部品Props
 */
export type InputProps<T extends FieldValues> = BaseProps<T> & {
  /** 入力種類 */
  type?: 'email' | 'file' | 'number' | 'password' | 'reset' | 'tel' | 'text';
  /** 最大値 */
  max?: number | string | undefined;
  /** 最小値 */
  min?: number | string | undefined;
  /** 最大文字数 */
  maxLength?: number | undefined;
  /** 最小文字数 */
  minLength?: number | undefined;
  /** 複数行入力可能フラグ */
  multiline?: boolean;
  /** 行数 */
  rows?: string | number;
  /** 最大行数 */
  maxRows?: string | number;
  /** 最小行数 */
  minRows?: string | number;
  /** オートフォーカスフラグ */
  autoFocus?: boolean;
  /** プレースホルダ */
  placeholder?: string | undefined;
  /** 末尾の装飾 */
  endAdornment?: React.ReactNode;
  /** 先頭の装飾 */
  startAdornment?: React.ReactNode;
  /** テキストボックスへのref */
  inputRef?: React.Ref<any>;
  /** onBlurイベントハンドラ */
  onBlur?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  /** onChangeイベントハンドラ */
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
  /** onFocusイベントハンドラ */
  onFocus?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
};

/**
 * 入力部品Props
 */
export type BaseInputProps<T extends FieldValues> = InputProps<T> & {
  /** ラベル表示用Node */
  children: (field: ControllerRenderProps<T, Path<T>>) => ReactNode;
};

/**
 * テキストボックス基底部品
 *
 * @param props 入力部品Props
 * @returns テキストボックス
 */
const BaseInput = <T extends FieldValues>(props: BaseInputProps<T>) => {
  const screenInfo: ScreenInfo = useSelector((state: ScreenInfoState) => state.screenInfo);

  const {
    name,
    listName,
    labelClassName,
    index,
    type,
    readOnly,
    disabled,
    startAdornment,
    endAdornment,
    control,
    children,
    onChange,
    onFocus,
    onBlur,
    ...restProps
  } = props;

  // 項目名
  const itemName = getItemName(name, listName, index);

  const handleChange = (
    field: ControllerRenderProps<T, Path<T>>,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    console.log('BaseInput.onChange');
    field.onChange(e);
    onChange && onChange(e);
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    console.log('BaseInput.onFocus');
    onFocus && onFocus(e);
  };

  const handleBlur = (
    field: ControllerRenderProps<T, Path<T>>,
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    console.log('BaseInput.onBlur');
    field.onBlur();
    onBlur && onBlur(e);
  };

  return (
    <Controller
      control={control}
      name={itemName}
      render={({ field, fieldState }) => (
        <>
          {canInput(screenInfo) ? (
            <TextField
              id={itemName}
              type={type ? type : 'text'}
              autoComplete="off"
              slotProps={{
                input: {
                  readOnly: readOnly,
                  disabled: disabled,
                  startAdornment: startAdornment,
                  endAdornment: endAdornment,
                },
                inputLabel: { shrink: true },
              }}
              {...field}
              error={fieldState.invalid}
              helperText={fieldState.error?.message}
              onChange={(e) => handleChange(field, e)}
              onFocus={(e) => handleFocus(e)}
              onBlur={(e) => handleBlur(field, e)}
              {...restProps}
            />
          ) : (
            <>{children(field)}</>
          )}
        </>
      )}
    />
  );
};

export default memo(BaseInput) as typeof BaseInput;
