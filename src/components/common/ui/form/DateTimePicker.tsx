import {
  ControllerFieldState,
  ControllerRenderProps,
  FieldValues,
  Path,
  PathValue,
} from 'react-hook-form';
import { BaseProps } from './common';
import { DateTimePicker as MuiDateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { Dispatch, memo, SetStateAction, useState } from 'react';
import dayjs from 'dayjs';
import { PickersActionBarAction } from '@mui/x-date-pickers/PickersActionBar';
import 'dayjs/locale/ja';
import {
  DateTimeValidationError,
  DateValidationError,
  TimeValidationError,
} from '@mui/x-date-pickers/models';
import DatePickerProvider from './DatePickerProvider';

export type DateTimePickerProps<T extends FieldValues> = BaseProps<T> & {
  format?: 'YYYY/MM/DD HH:mm' | 'YYYY年MM月DD日 HH時mm分';
  minDate?: Date;
  maxDate?: Date;
  minutesStep?: number;
};

const DateTimePicker = <T extends FieldValues>(props: DateTimePickerProps<T>) => {
  const {
    name,
    listName,
    labelClassName,
    control,
    index,
    format,
    minDate,
    maxDate,
    minutesStep,
    margin,
    ...restProps
  } = props;

  const actions: Array<PickersActionBarAction> = ['cancel', 'accept'];
  !props.required && actions.unshift('clear');

  return (
    <DatePickerProvider
      control={control}
      format={format ?? 'YYYY/MM/DD HH:mm'}
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
        <MuiDateTimePicker
          {...field}
          format={format ?? `YYYY/MM/DD HH:mm`}
          value={field?.value?.length > 0 ? dayjs(field.value) : null}
          minutesStep={minutesStep ?? 5}
          onError={(newError) => setError(newError)}
          onChange={(newValue) => {
            const formatted = newValue ? dayjs(newValue).format('YYYY-MM-DD HH:mm') : '';
            field.onChange(formatted);
          }}
          slotProps={{
            calendarHeader: { format: 'YYYY年MM月' },
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

export default memo(DateTimePicker) as typeof DateTimePicker;
