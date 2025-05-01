import {
  ControllerFieldState,
  ControllerRenderProps,
  FieldValues,
  Path,
  PathValue,
} from 'react-hook-form';
import { BaseProps } from './common';
import { TimePicker as MuiTimePicker } from '@mui/x-date-pickers/TimePicker';
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

export type TimePickerProps<T extends FieldValues> = BaseProps<T> & {
  format?: 'HH:mm' | 'HH時mm分';
  minutesStep?: number;
};

const TimePicker = <T extends FieldValues>(props: TimePickerProps<T>) => {
  const {
    name,
    listName,
    labelClassName,
    control,
    index,
    format,
    margin,
    minutesStep,
    ...restProps
  } = props;

  const actions: Array<PickersActionBarAction> = ['cancel', 'accept'];
  !props.required && actions.unshift('clear');

  return (
    <DatePickerProvider
      control={control}
      format={format ?? 'HH:mm'}
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
        <MuiTimePicker
          {...field}
          format={format ?? `HH:mm`}
          minutesStep={minutesStep ?? 5}
          value={field?.value ? dayjs(field.value, 'HH:mm,true') : null}
          onError={(newError) => setError(newError)}
          onChange={(newValue) => {
            const formatted = newValue ? dayjs(newValue).format('HH:mm') : '';
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
          {...restProps}
        />
      )}
    </DatePickerProvider>
  );
};

export default memo(TimePicker) as typeof TimePicker;
