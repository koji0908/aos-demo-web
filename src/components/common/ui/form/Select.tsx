import { canInput, ScreenInfo, ScreenInfoState } from '@/slices/screen-info-slices';
import {
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  InputLabel,
  MenuItem,
  Select as MuiSelect,
  SelectChangeEvent,
} from '@mui/material';
import React, { Fragment, memo, useState } from 'react';
import { BaseProps, getErrorMessage, getItemName, hasError, LabelValue } from './common';
import {
  Control,
  Controller,
  ControllerRenderProps,
  FieldValues,
  Path,
  PathValue,
  useWatch,
} from 'react-hook-form';
import { useSelector } from 'react-redux';

/**
 * プルダウンProps
 */
export type SelectProps<T extends FieldValues> = BaseProps<T> & {
  /** プルダウン用リスト */
  items: Array<LabelValue>;
  /** 未選択用ラベル */
  emptyLabel?: string;
  /** control */
  control: Control<T>;
  /** onBlurイベントハンドラ */
  onBlur?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  /** onChangeイベントハンドラ */
  onChange?: React.ChangeEventHandler<SelectChangeEvent<PathValue<T, Path<T>>>>;
  /** onFocusイベントハンドラ */
  onFocus?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
};

const Select = <T extends FieldValues>(props: SelectProps<T>) => {
  const screenInfo: ScreenInfo = useSelector((state: ScreenInfoState) => state.screenInfo);

  const {
    name,
    label,
    listName,
    labelClassName,
    control,
    index,
    margin,
    emptyLabel,
    items,
    onChange,
    onFocus,
    onBlur,
    ...restProps
  } = props;

  // 項目名
  const itemName: Path<T> = getItemName(name, listName, index);

  // 入力値
  const value: string = useWatch({ name: itemName, control });

  // ラベル用クラス
  const labelClass = 'form-display-label ' + (props.labelClassName ? props.labelClassName : '');

  const handleChange = (
    field: ControllerRenderProps<T, Path<T>>,
    e: SelectChangeEvent<PathValue<T, Path<T>>>
  ) => {
    console.log('Select.onChange');
    field.onChange(e);
    onChange && onChange(e);
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    console.log('Select.onFocus');
    onFocus && onFocus(e);
  };

  const handleBlur = (
    field: ControllerRenderProps<T, Path<T>>,
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    console.log('Select.onBlur');
    field.onBlur();
    onBlur && onBlur(e);
  };

  /**
   * ラベルを取得する
   * @returns ラベル
   */
  const getLabel = (): String => {
    const label = items.find((item) => item.value === value)?.label;
    return label ?? '';
  };

  return (
    <>
      {canInput(screenInfo) ? (
        <FormControl fullWidth>
          <FormLabel component="label">{label}</FormLabel>
          <Controller
            control={control}
            name={itemName}
            render={({ field, fieldState }) => (
              <>
                <MuiSelect
                  {...field}
                  {...restProps}
                  value={field.value}
                  displayEmpty={true}
                  renderValue={(selected) => {
                    if (!selected) {
                      return '選択してください';
                    }
                    const item = items.find((item) => item.value === selected);
                    return item ? item.label : '';
                  }}
                  onChange={(e) => handleChange(field, e)}
                  onFocus={(e) => handleFocus(e)}
                  onBlur={(e) => handleBlur(field, e)}
                >
                  {!props.required && (
                    <MenuItem value="">{emptyLabel ? emptyLabel : '　'}</MenuItem>
                  )}
                  {items.map((item) => (
                    <MenuItem key={'key:' + item.value} value={item.value}>
                      {item.label}
                    </MenuItem>
                  ))}
                </MuiSelect>
                <FormHelperText error={fieldState.invalid}>
                  {fieldState.error?.message}
                </FormHelperText>
              </>
            )}
          />
        </FormControl>
      ) : (
        <span className={labelClass}>{getLabel()}</span>
      )}
    </>
  );
};

export default memo(Select) as typeof Select;
