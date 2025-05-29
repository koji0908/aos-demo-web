import { canInput, ScreenInfo, ScreenInfoState } from '@/slices/screen-info-slices';
import {
  Checkbox,
  FormControl,
  FormHelperText,
  FormLabel,
  ListItemText,
  MenuItem,
  Select as MuiSelect,
  SelectChangeEvent,
} from '@mui/material';
import React, { memo, ReactNode, useRef } from 'react';
import { getItemName, LabelValue } from './common';
import {
  Controller,
  ControllerRenderProps,
  FieldValues,
  Path,
  PathValue,
  useWatch,
} from 'react-hook-form';
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
    onChange,
    onFocus,
    onBlur,
    ...restProps
  } = props;

  // 項目名
  const itemName: Path<T> = getItemName(name, listName, index);

  // 入力値
  const value: Array<string> = useWatch({ name: itemName, control });

  // ラベル用クラス
  const labelClass = 'form-display-label ' + (props.labelClassName ? props.labelClassName : '');

  const handleChange = (
    field: ControllerRenderProps<T, Path<T>>,
    e: SelectChangeEvent<PathValue<T, Path<T>>>
  ) => {
    field.onChange(e);
    onChange && onChange(e);
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onFocus && onFocus(e);
  };

  const handleBlur = (
    field: ControllerRenderProps<T, Path<T>>,
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    field.onBlur();
    onBlur && onBlur(e);
  };

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
                  onChange={(e) => handleChange(field, e)}
                  onFocus={(e) => handleFocus(e)}
                  onBlur={(e) => handleBlur(field, e)}
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
