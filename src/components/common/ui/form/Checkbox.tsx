import { canInput, ScreenInfo, ScreenInfoState } from '@/slices/screen-info-slices';
import {
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  Checkbox as MuiCheckbox,
} from '@mui/material';
import {
  Control,
  Controller,
  ControllerRenderProps,
  FieldValues,
  Path,
  useWatch,
} from 'react-hook-form';
import { useSelector } from 'react-redux';
import { BaseProps, getItemName, LabelValue } from './common';
import React, { Fragment, memo, ReactNode } from 'react';

/**
 * チェックボックスProps
 */
export type CheckboxProps<T extends FieldValues> = BaseProps<T> & {
  /** チェックボックス用リスト */
  checks: Array<LabelValue>;
  /** 縦並びフラグ */
  vertical?: boolean;
  /** control */
  control: Control<T>;
  /** onChangeイベントハンドラ */
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
  /** onBlurイベントハンドラ */
  onBlur?: React.FocusEventHandler<HTMLButtonElement>;
  /** onFocusイベントハンドラ */
  onFocus?: React.FocusEventHandler<HTMLButtonElement>;
};

const Checkbox = <T extends FieldValues>(props: CheckboxProps<T>) => {
  const screenInfo: ScreenInfo = useSelector((state: ScreenInfoState) => state.screenInfo);

  const {
    name,
    label,
    listName,
    labelClassName,
    control,
    index,
    checks,
    vertical,
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
    check: LabelValue,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const checked = e.target.checked;
    if (checked) {
      field.onChange(check.value);
    } else {
      field.onChange('');
    }
    onChange && onChange(e);
  };

  const handleFocus = (e: React.FocusEvent<HTMLButtonElement>) => {
    onFocus && onFocus(e);
  };

  const handleBlur = (
    field: ControllerRenderProps<T, Path<T>>,
    e: React.FocusEvent<HTMLButtonElement>
  ) => {
    field.onBlur();
    onBlur && onBlur(e);
  };

  /**
   * ラベルを取得する
   * @returns ラベル
   */
  const getLabel = (): string => {
    const label = checks.find((item) => item.value === value)?.label;
    return label ?? '';
  };

  return (
    <>
      {canInput(screenInfo) ? (
        <FormControl>
          <FormLabel component="label">{label}</FormLabel>
          <Controller
            control={control}
            name={itemName}
            render={({ field, fieldState }) => (
              <>
                <FormGroup row={!vertical}>
                  {checks.map((check: LabelValue) => (
                    <Fragment key={check.value}>
                      <FormControlLabel
                        control={
                          <MuiCheckbox
                            {...field}
                            value={check.value}
                            checked={field.value === check.value}
                            onChange={(e) => {
                              handleChange(field, check, e);
                            }}
                            onFocus={handleFocus}
                            onBlur={(e) => {
                              handleBlur(field, e);
                            }}
                          />
                        }
                        label={check.label}
                        {...restProps}
                      />
                    </Fragment>
                  ))}
                </FormGroup>
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

export default memo(Checkbox) as typeof Checkbox;
