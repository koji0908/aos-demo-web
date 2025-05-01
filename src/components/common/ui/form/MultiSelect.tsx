import { canInput, ScreenInfo, ScreenInfoState } from '@/slices/screen-info-slices';
import {
  Checkbox,
  FormControl,
  FormHelperText,
  FormLabel,
  ListItemText,
  MenuItem,
  Select as MuiSelect,
} from '@mui/material';
import React, { memo, ReactNode } from 'react';
import { getItemName, LabelValue } from './common';
import { Controller, FieldValues, Path, useWatch } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { SelectProps } from './Select';

/**
 * 複数選択プルダウンProps
 */
export type MultiSelectProps<T extends FieldValues> = SelectProps<T> & {};

const MultiSelect = <T extends FieldValues>(props: MultiSelectProps<T>) => {
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
    ...restProps
  } = props;

  // 項目名
  const itemName: Path<T> = getItemName(name, listName, index);

  // 入力値
  const value: Array<string> = useWatch({ name: itemName, control });

  // ラベル用クラス
  const labelClass = 'form-display-label ' + (props.labelClassName ? props.labelClassName : '');

  /**
   * ラベルを取得する
   * @returns ラベル
   */
  const getLabel = (): ReactNode => {
    const label = value.map((val) => (
      <React.Fragment key={val}>
        <div>{items.find((item) => item.value === val)?.label}</div>
      </React.Fragment>
    ));
    return label ?? <></>;
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
                  multiple
                  value={field.value}
                  displayEmpty={true}
                  renderValue={(selected) => {
                    if (!selected || selected.length == 0) {
                      return '選択してください';
                    }
                    const selectedItems = items
                      .filter((item) => selected.find((obj: string) => obj === item.value))
                      .flatMap((item) => item.label);
                    return selectedItems ? selectedItems.join(',') : '';
                  }}
                >
                  {items.map((item) => (
                    <MenuItem key={'key:' + item.value} value={item.value}>
                      <Checkbox checked={value.includes(item.value)} />
                      <ListItemText primary={item.label} />
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

export default memo(MultiSelect) as typeof MultiSelect;
