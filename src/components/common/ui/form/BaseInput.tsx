import { memo } from 'react';
import { InputBaseClasses, OutlinedInput, SxProps, TextField, Theme } from '@mui/material';
import { FieldErrors, FieldValues, Path, UseFormGetValues, UseFormRegister } from 'react-hook-form';

/**
 * 入力部品Props
 */
export type BaseInputProps<T extends FieldValues> = {
  /** 入力種類 */
  type?: 'email' | 'file' | 'number' | 'password' | 'reset' | 'tel' | 'text';
  /** style定義 */
  sx?: SxProps<Theme>;
  /** クラス */
  className?: string;
  /** クラス */
  classes?: Partial<InputBaseClasses>;
  /** ラベル用クラス */
  labelClassName?: String;
  /** 入力値取得 */
  getValues: UseFormGetValues<T>;
  /** 項目名 */
  name: Path<T> | string;
  /** リスト名(list項目の場合に使用) */
  listName?: string;
  /** リストのインデックス(list項目の場合に使用) */
  index?: number;
  /** 項目ラベル */
  label?: string;
  /* サイズ */
  size?: 'small' | 'medium';
  /** 最大幅表示フラグ */
  fullWidth?: boolean;
  /** 最大文字数 */
  maxLength?: number | undefined;
  /** 最小文字数 */
  minLength?: number | undefined;
  /** オートフォーカスフラグ */
  autoFocus?: boolean;
  /** プレースホルダ */
  placeholder?: string | undefined;
  /** 読み取り専用フラグ */
  readOnly?: boolean | undefined;
  /** 非活性フラグ */
  disabled?: boolean | undefined;
  /** 必須フラグ */
  required?: boolean | undefined;
  /** マージン */
  margin?: 'none' | 'normal' | 'dense' | undefined;
  /** 末尾の装飾 */
  endAdornment?: React.ReactNode;
  /** 先頭の装飾 */
  startAdornment?: React.ReactNode;
  /** UseFormRegister */
  register: UseFormRegister<T>;
  /** FieldErrors */
  errors: FieldErrors<T>;
  /** テキストボックスへのref */
  inputRef?: React.Ref<any>;
  /** onBlurイベントハンドラ */
  onBlur?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  /** onChangeイベントハンドラ */
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
  /** onFocusイベントハンドラ */
  onFocus?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
};

/**
 * テキストボックス基底部品
 *
 * @param props 入力部品Props
 * @returns テキストボックス
 */
const BaseInput = <T extends FieldValues>(props: BaseInputProps<T>) => {
  const {
    name,
    getValues,
    listName,
    labelClassName,
    index,
    type,
    register,
    errors,
    readOnly,
    disabled,
    onChange,
    startAdornment,
    endAdornment,
    ...restProps
  } = props;

  // 項目名
  const itemName = listName ? `${listName}.${index}.${name}` : name;

  /**
   * 入力チェックエラー有無を判定する
   * @returns true:エラーあり
   */
  const hasError = (): boolean => {
    // リスト項目の場合
    if (listName) {
      return (errors?.[listName!] as Array<any>)?.[index!]?.[name];
    }
    // リスト項目以外の場合
    return name in errors;
  };

  /**
   * 入力チェックエラーメッセージを取得する
   * @returns 入力チェックエラーメッセージ
   */
  const getErrorMessage = (): String | undefined => {
    // リスト項目の場合
    if (listName) {
      return (errors?.[listName!] as Array<any>)?.[index!]?.[name]?.message?.toString();
    }
    // リスト項目以外の場合
    return errors?.[name]?.message?.toString();
  };

  /**
   * onChangeイベント
   * @param e ChangeEvent
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    // react-hook-formのonChangeイベントをトリガー
    register(itemName as Path<T>).onChange(e);

    // props.onChangeが渡されていれば、それも呼び出す
    if (onChange) {
      onChange(e);
    }
  };

  return (
    <>
      <TextField
        id={itemName}
        type={type ? type : 'text'}
        autoComplete="off"
        slotProps={{
          input: {
            readOnly: readOnly,
            disabled: disabled,
            startAdornment: startAdornment,
            endAdornment: endAdornment,
          },
          inputLabel: { shrink: true },
        }}
        {...register(itemName as Path<T>)}
        error={hasError()}
        helperText={getErrorMessage()}
        onChange={handleChange}
        {...restProps}
      />
    </>
  );
};

export default memo(BaseInput) as typeof BaseInput;
