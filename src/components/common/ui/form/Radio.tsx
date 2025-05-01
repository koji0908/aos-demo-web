import { Theme } from '@emotion/react';
import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  InputBaseClasses,
  Radio as MuiRadio,
  RadioGroup,
  SxProps,
} from '@mui/material';
import { Control, Controller, FieldValues, Path, useWatch } from 'react-hook-form';
import { BaseProps, getErrorMessage, getItemName, hasError, LabelValue } from './common';
import React, { Fragment, memo, SyntheticEvent } from 'react';
import { canInput, ScreenInfo, ScreenInfoState } from '@/slices/screen-info-slices';
import { useSelector } from 'react-redux';

/**
 * ラジオボタンProps
 */
export type RadioProps<T extends FieldValues> = BaseProps<T> & {
  /** ラジオボタン用リスト */
  radios: Array<LabelValue>;
  /** 縦並びフラグ */
  vertical?: boolean;
  /** control */
  control: Control<T>;
  /** onChangeイベントハンドラ */
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
};

const Radio = <T extends FieldValues>(props: RadioProps<T>) => {
  const screenInfo: ScreenInfo = useSelector((state: ScreenInfoState) => state.screenInfo);

  const {
    name,
    label,
    listName,
    labelClassName,
    control,
    index,
    radios,
    vertical,
    onChange,
    ...restProps
  } = props;

  // 項目名
  const itemName: Path<T> = getItemName(name, listName, index);

  // 入力値
  const value = useWatch({ name: itemName, control });

  // ラベル用クラス
  const labelClass = 'form-display-label ' + (props.labelClassName ? props.labelClassName : '');

  /**
   * ラベルを取得する
   * @returns ラベル
   */
  const getLabel = (): String => {
    const label: string | undefined = radios.find((item) => item.value === value)?.label;
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
                <RadioGroup {...field} row={!vertical}>
                  {radios.map((radio: LabelValue) => (
                    <Fragment key={radio.value}>
                      <FormControlLabel
                        value={radio.value}
                        control={<MuiRadio />}
                        label={radio.label}
                        {...restProps}
                      />
                    </Fragment>
                  ))}
                </RadioGroup>
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

export default memo(Radio) as typeof Radio;
