import { Theme } from '@emotion/react';
import { InputBaseClasses } from '@mui/material';
import { SxProps } from '@mui/system';
import { Context, createContext } from 'react';
import { Control, FieldErrors, FieldValues, Path } from 'react-hook-form';

/**
 * 入力部品Props
 */
export type BaseProps<T extends FieldValues> = {
  /** style定義 */
  sx?: SxProps<Theme>;
  /** クラス */
  className?: string;
  /** クラス */
  classes?: Partial<InputBaseClasses>;
  /** ラベル用クラス */
  labelClassName?: String;
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
  /** オートフォーカスフラグ */
  autoFocus?: boolean;
  /** 読み取り専用フラグ */
  readOnly?: boolean | undefined;
  /** 非活性フラグ */
  disabled?: boolean | undefined;
  /** 必須フラグ */
  required?: boolean | undefined;
  /** マージン */
  margin?: 'none' | 'normal' | 'dense' | undefined;
  /** control */
  control: Control<T>;
};

/**
 * ラベルと値
 */
export type LabelValue = {
  label: string;
  value: string;
};

/**
 * 項目名を取得する
 *
 * @param name 項目名
 * @param listName リスト名
 * @param index インデックス
 * @returns 項目名
 */
export const getItemName = <T extends FieldValues>(
  name: string | Path<T>,
  listName?: string,
  index?: number
): Path<T> => {
  const itemName = (listName ? `${listName}.${index}.${name}` : name) as Path<T>;
  return itemName;
};

/**
 * 入力チェックエラー有無を判定する
 * @returns true:エラーあり
 */
export const hasError = <T extends FieldValues>(
  errors: FieldErrors<T>,
  name: Path<T>,
  listName?: string,
  index?: number
): boolean => {
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
export const getErrorMessage = <T extends FieldValues>(
  errors: FieldErrors<T>,
  name: Path<T>,
  listName?: string,
  index?: number
): String | undefined => {
  // リスト項目の場合
  if (listName) {
    return (errors?.[listName!] as Array<any>)?.[index!]?.[name]?.message?.toString();
  }
  // リスト項目以外の場合
  return errors?.[name]?.message?.toString();
};
