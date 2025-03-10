'use client';

import { useForm } from 'react-hook-form';
import { doLogin } from '@/slices/login-slices';

export default function Login() {
  const { register, handleSubmit } = useForm();

  return (
    <div>
      <form onSubmit={handleSubmit(doLogin)}>
        <h1>ログイン</h1>
        <div>
          <span className="font-bold">社員番号:</span>
          <input type="text" id="empNo" {...register('empNo')} className="form-base" />
        </div>
        <div>
          パスワード:
          <input type="password" id="password" {...register('password')} className="border" />
        </div>
        <div>
          <button type="submit">ログイン</button>
        </div>
      </form>
    </div>
  );
}
