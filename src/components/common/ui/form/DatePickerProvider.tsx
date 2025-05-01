import {
  Control,
  Controller,
  ControllerFieldState,
  ControllerRenderProps,
  FieldValues,
  Path,
  PathValue,
  useWatch,
} from 'react-hook-form';
import { getItemName } from './common';
import { canInput, ScreenInfo, ScreenInfoState } from '@/slices/screen-info-slices';
import { useSelector } from 'react-redux';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { memo, Dispatch, SetStateAction, useMemo, useState } from 'react';
import dayjs from 'dayjs';
import {
  DateTimeValidationError,
  DateValidationError,
  TimeValidationError,
} from '@mui/x-date-pickers/models';
import {
  VALIDATION_MESSAGE_INVALID_DATE,
  VALIDATION_MESSAGE_INVALID_DATE_DISABLE_FUTURE,
  VALIDATION_MESSAGE_INVALID_DATE_RANGE,
} from '@/validation-message';

export type DatePickerProviderProps<T extends FieldValues> = {
  /** ラベル用クラス */
  labelClassName?: String;
  /** 項目名 */
  name: Path<T> | string;
  /** リスト名(list項目の場合に使用) */
  listName?: string;
  /** リストのインデックス(list項目の場合に使用) */
  index?: number;
  /** control */
  control: Control<T>;
  format:
    | 'YYYY/MM/DD'
    | 'YYYY年MM月DD日'
    | 'YYYY-MM-DD'
    | 'YYYYMMDD'
    | 'YYYY/MM'
    | 'YYYY年MM月'
    | 'YYYY-MM'
    | 'YYYYMM'
    | 'YYYY/MM/DD HH:mm'
    | 'YYYY年MM月DD日 HH時mm分'
    | 'HH:mm'
    | 'HH時mm分';
  children: (
    field: ControllerRenderProps<T, Path<T>>,
    fieldState: ControllerFieldState,
    value: PathValue<T, Path<T>>,
    setError: Dispatch<
      SetStateAction<DateValidationError | DateTimeValidationError | TimeValidationError | null>
    >,
    errorMessage: string
  ) => JSX.Element;
};

const DatePickerProvider = <T extends FieldValues>(props: DatePickerProviderProps<T>) => {
  const [error, setError] = useState<
    DateValidationError | DateTimeValidationError | TimeValidationError | null
  >(null);

  const errorMessage = useMemo(() => {
    switch (error) {
      case 'maxDate':
      case 'minDate':
        return VALIDATION_MESSAGE_INVALID_DATE_RANGE;
      case 'disableFuture':
        return VALIDATION_MESSAGE_INVALID_DATE_DISABLE_FUTURE;
      case 'invalidDate':
        return VALIDATION_MESSAGE_INVALID_DATE;
      default:
        return '';
    }
  }, [error]);

  const screenInfo: ScreenInfo = useSelector((state: ScreenInfoState) => state.screenInfo);

  const { name, listName, control, index, format, children } = props;

  // 項目名
  const itemName: Path<T> = getItemName(name, listName, index);

  // 入力値
  const value = useWatch({ name: itemName, control });

  // ラベル用クラス
  const labelClass = 'form-display-label ' + (props.labelClassName ? props.labelClassName : '');

  const getLabel = (): String => {
    return value ? dayjs(value)?.format(format) : '';
  };

  return (
    <Controller
      control={control}
      name={itemName}
      render={({ field, fieldState }) => (
        <>
          {canInput(screenInfo) ? (
            <>
              <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ja">
                {children(field, fieldState, value, setError, errorMessage)}
              </LocalizationProvider>
            </>
          ) : (
            <span className={labelClass}>{getLabel()}</span>
          )}
        </>
      )}
    />
  );
};

export default memo(DatePickerProvider) as typeof DatePickerProvider;
