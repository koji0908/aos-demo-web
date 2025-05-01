import { memo, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import { ControllerRenderProps, FieldValues, Path } from 'react-hook-form';
import BaseInput, { InputProps } from './BaseInput';
import { Visibility, VisibilityOff } from '@mui/icons-material';

/**
 * パスワード入力Props
 */
export type PasswordProps<T extends FieldValues> = InputProps<T> & {
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
  const [showPassword, setShowPassword] = useState(false);

  const { canPasswordShow, ...restProps } = props;

  // ラベル用クラス
  const labelClassName = 'form-display-label ' + (props.labelClassName ? props.labelClassName : '');

  /**
   * パスワード表示/非表示を切り替える
   */
  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  /**
   * 入力値(マスク)を取得する
   * @returns 項目値
   */
  const getMaskValue = (value: string): String => {
    let ret = '';
    for (let i = 0; i < value.length; i++) {
      ret += '*';
    }
    return ret;
  };

  /** パスワード表示/非表示切り替え */
  const endAdornment = canPasswordShow ? (
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
    <BaseInput type={showPassword ? 'text' : 'password'} {...restProps} endAdornment={endAdornment}>
      {(field: ControllerRenderProps<T, Path<T>>) => (
        <span className={labelClassName}>{getMaskValue(field.value)}</span>
      )}
    </BaseInput>
  );
};

export default memo(InputPassword) as typeof InputPassword;
