import { canInput, ScreenInfo, ScreenInfoState } from '@/slices/screen-info-slices';
import {
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  Checkbox as MuiCheckbox,
} from '@mui/material';
import { Controller, FieldValues, Path, useWatch } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { getItemName, LabelValue } from './common';
import React, { Fragment, memo } from 'react';
import { CheckboxProps } from './Checkbox';

const MultiCheckbox = <T extends FieldValues>(props: CheckboxProps<T>) => {
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
    ...restProps
  } = props;

  // 項目名
  const itemName: Path<T> = getItemName(name, listName, index);

  // 入力値
  const value: Array<string> = useWatch({ name: itemName, control });

  // ラベル用クラス
  const labelClass = 'form-display-label ' + (props.labelClassName ? props.labelClassName : '');

  /**
   * 入力値を取得する
   * @returns 項目値
   */
  const getLabelValue = (): Array<LabelValue> => {
    const checkedList = checks.filter((item) => value?.includes(item.value));

    return checkedList;
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
                            checked={field.value?.includes(check.value)}
                            onChange={(e) => {
                              const checked = e.target.checked;
                              if (checked) {
                                field.onChange([...field.value, check.value]);
                              } else {
                                field.onChange(
                                  field.value.filter((v: string) => v !== check.value)
                                );
                              }
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
        <span className={labelClass}>
          {getLabelValue().map((check) => (
            <React.Fragment key={check.value}>
              <div>{check.label}</div>
            </React.Fragment>
          ))}
        </span>
      )}
    </>
  );
};

export default memo(MultiCheckbox) as typeof MultiCheckbox;
