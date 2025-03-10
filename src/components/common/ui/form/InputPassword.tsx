import { memo, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import { FieldValues, Path } from 'react-hook-form';
import BaseInput, { BaseInputProps } from './BaseInput';
import { ScreenInfo, ScreenInfoState } from '@/slices/screen-info-slices';
import { useSelector } from 'react-redux';
import { Visibility, VisibilityOff } from '@mui/icons-material';

/**
 * パスワード入力Props
 */
export type PasswordProps<T extends FieldValues> = BaseInputProps<T> & {
  /** パスワード表示/非表示可否
   */
  canPasswordShow?: boolean;
};

/**
 * パスワード入力部品
 *
 * @param props パスワード入力Props
 * @returns パスワード入力テキストボックス
 */
const InputPassword = <T extends FieldValues>(props: PasswordProps<T>) => {
  const screenInfo: ScreenInfo = useSelector((state: ScreenInfoState) => state.screenInfo);
  const [showPassword, setShowPassword] = useState(false);

  const { name, listName, index, canPasswordShow, ...restProps } = props;

  // 項目名
  const itemName = listName ? `${listName}.${index}.${name}` : name;

  // ラベル用クラス
  const labelClassName = 'form-display-label ' + (props.labelClassName ? props.labelClassName : '');

  /**
   * パスワード表示/非表示を切り替える
   */
  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  /**
   * 入力値を取得する
   * @returns 項目値
   */
  const getValue = (): String => {
    return props.getValues(itemName as Path<T>);
  };

  /**
   * 入力値(マスク)を取得する
   * @returns 項目値
   */
  const getMaskValue = (): String => {
    const value = props.getValues(itemName as Path<T>);
    let ret = '';
    for (let i = 0; i < value.length; i++) {
      ret += '*';
    }
    return ret;
  };

  /** パスワード表示/非表示切り替え */
  const endAdornment = props.canPasswordShow ? (
    <InputAdornment position="end">
      <IconButton
        aria-label={showPassword ? 'hide the password' : 'display the password'}
        onClick={togglePassword}
        edge="end"
      >
        {showPassword ? <VisibilityOff /> : <Visibility />}
      </IconButton>
    </InputAdornment>
  ) : undefined;

  return (
    <>
      {screenInfo.status === 'input' && (
        <BaseInput
          type={showPassword ? 'text' : 'password'}
          name={name}
          listName={listName}
          index={index}
          {...restProps}
          endAdornment={endAdornment}
        />
      )}
      {screenInfo.status !== 'input' && <span className={labelClassName}>{getMaskValue()}</span>}
    </>
  );
};

export default memo(InputPassword) as typeof InputPassword;
