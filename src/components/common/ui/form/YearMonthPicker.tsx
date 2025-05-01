import {
  ControllerFieldState,
  ControllerRenderProps,
  FieldValues,
  Path,
  PathValue,
} from 'react-hook-form';
import { BaseProps } from './common';
import { DatePicker as MuiDatePicker } from '@mui/x-date-pickers/DatePicker';
import { Dispatch, memo, SetStateAction, useState } from 'react';
import dayjs from 'dayjs';
import { PickersActionBarAction } from '@mui/x-date-pickers/PickersActionBar';
import { DateValidationError, TimeValidationError } from '@mui/x-date-pickers/models';
import 'dayjs/locale/ja';
import DatePickerProvider from './DatePickerProvider';
import { DateTimeValidationError } from '@mui/x-date-pickers/models';

export type YearMonthPickerProps<T extends FieldValues> = BaseProps<T> & {
  format?: 'YYYY/MM' | 'YYYY年MM月' | 'YYYY-MM' | 'YYYYMM';
  minDate?: Date;
  maxDate?: Date;
};

const YearMonthPickerProps = <T extends FieldValues>(props: YearMonthPickerProps<T>) => {
  const {
    name,
    listName,
    labelClassName,
    control,
    index,
    format,
    minDate,
    maxDate,
    margin,
    ...restProps
  } = props;

  const actions: Array<PickersActionBarAction> = ['cancel'];
  !props.required && actions.unshift('clear');

  return (
    <DatePickerProvider
      control={control}
      format={format ?? 'YYYY/MM'}
      name={name}
      listName={listName}
      index={index}
    >
      {(
        field: ControllerRenderProps<T, Path<T>>,
        fieldState: ControllerFieldState,
        value: PathValue<T, Path<T>>,
        setError: Dispatch<
          SetStateAction<DateValidationError | DateTimeValidationError | TimeValidationError | null>
        >,
        errorMessage: string
      ) => (
        <MuiDatePicker
          {...field}
          format={format ?? `YYYY/MM`}
          value={field?.value?.length > 0 ? dayjs(field.value) : null}
          views={['year', 'month']}
          onError={(newError) => setError(newError)}
          onChange={(newValue) => {
            const formatted = newValue ? dayjs(newValue).format('YYYY-MM') : '';
            field.onChange(formatted);
          }}
          slotProps={{
            field: { clearable: !props.required && value && true },
            textField: {
              error: errorMessage.length > 0 || fieldState.invalid,
              helperText: errorMessage.length > 0 ? errorMessage : fieldState.error?.message,
            },
            actionBar: {
              actions: actions,
            },
          }}
          minDate={minDate && dayjs(minDate)}
          maxDate={maxDate && dayjs(maxDate)}
          {...restProps}
        />
      )}
    </DatePickerProvider>
  );
};

export default memo(YearMonthPickerProps) as typeof YearMonthPickerProps;
