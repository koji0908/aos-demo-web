import { FieldValues } from 'react-hook-form';

/**
 * ログイン画面
 * ログインボタン押下処理
 *
 * @param form
 */
export const doLogin = async (form: FieldValues) => {
  const ret = await fetch('/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(form),
  });
  console.log(await ret.json());
};
