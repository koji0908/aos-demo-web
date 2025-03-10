'use client';

import { useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Button,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from '@mui/material';
import InputText from './form/InputText';
import { memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setErrors,
  setInfos,
  setSuccess,
  setValidationErrors,
  setWarnings,
} from '@/slices/message-info-slice';
import { getValidationErrorMessage } from '@/utils/message-utils';
import './MuiForm.scss';
import InputPassword from './form/InputPassword';
import {
  ScreenInfo,
  ScreenInfoState,
  setScreenStatusConfirm,
  setScreenStatusFinish,
  setScreenStatusInput,
} from '@/slices/screen-info-slices';
import Card from './component/Card';
import InputEmail from './form/InputEmail';
import InputTel from './form/InputTel';
import InputNumber from './form/InputNumber';

export default memo(function MuiForm() {
  const screenInfo: ScreenInfo = useSelector((state: ScreenInfoState) => state.screenInfo);

  const schema = z.object({
    name: z.string().min(1).max(30),
    email: z.string().min(1).max(50).email('無効なメールアドレスです'),
    gender: z.string().min(1),
    memo: z.string().max(100),
    password: z.string().max(10),
    num: z.number(),
    list: z
      .array(
        z.object({
          id: z.number().max(3),
          value: z.string().max(10),
        })
      )
      .min(1),
  });
  type FormData = z.infer<typeof schema>;

  const defaultValues = {
    name: '名無し権兵衛',
    email: 'hoge@example.com',
    gender: 'male',
    memo: '',
    password: '',
    tel: '09000000000',
    num: 0,
    list: [
      { id: 1, value: 'value1' },
      { id: 2, value: 'value2' },
      { id: 3, value: 'value3' },
    ],
  } as {
    name: string;
    email: string;
    gender: string;
    memo: string;
    password: string;
    num: number;
    tel: string;
    list: Array<{
      id: number;
      value: string;
    }>;
  };

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isValid, isLoading },
    getValues,
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues,
    mode: 'onSubmit',
  });

  const { fields, append, remove } = useFieldArray({
    name: 'list',
    control,
  });

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setValidationErrors(getValidationErrorMessage(errors)));
    dispatch(setSuccess('成功だよ'));
    dispatch(setInfos(['情報１', '情報２', '情報３']));
    dispatch(setWarnings(['警告１', '警告２', '警告３']));
    dispatch(setErrors(['エラー１', 'エラー２', 'エラー３']));
  }, [errors]);

  const onsubmit = (data: any, e: any) => {
    console.log(data);
    console.log(data.name);
    console.log(e.nativeEvent.submitter.name);
    console.log(isValid);
    console.log(isLoading);
  };
  const onerror = (err: any, e: any) => {
    console.log(err);
    console.log(e.nativeEvent.submitter.name);
    console.log(isValid);
    console.log(isLoading);
  };

  const PAGE_STATUS_BUTTONS = (
    <div className="flex flex-row gap-2">
      <div>
        <Button
          type="button"
          variant="contained"
          color="primary"
          onClick={() => {
            dispatch(setScreenStatusInput());
          }}
        >
          入力
        </Button>
      </div>
      <div>
        <Button
          type="button"
          variant="contained"
          color="success"
          onClick={() => {
            dispatch(setScreenStatusConfirm());
          }}
        >
          確認
        </Button>
      </div>
      <div>
        <Button
          type="button"
          variant="contained"
          color="error"
          onClick={() => {
            dispatch(setScreenStatusFinish());
          }}
        >
          完了
        </Button>
      </div>
    </div>
  );
  return (
    <>
      <h1>MUI + React Hook Form</h1>
      <a href="https://mui.com/material-ui/getting-started" target="_blank">
        公式ドキュメント
      </a>
      <form onSubmit={handleSubmit(onsubmit, onerror)} noValidate>
        <div>{screenInfo.status}</div>
        <div className="grid grid-cols-1 sm:grid-cols-2">
          <div className="p-2">
            <Card title="テキストボックス" subheader="基本" action={PAGE_STATUS_BUTTONS}>
              <InputText
                name="name"
                type="text"
                getValues={getValues}
                label="名前"
                register={register}
                errors={errors}
              />
            </Card>
          </div>
          <div className="p-2">
            <Card title="テキストボックス" subheader="全props指定" action={PAGE_STATUS_BUTTONS}>
              <InputText
                name="name"
                getValues={getValues}
                label="名前"
                labelClassName="labelClass"
                type="text"
                size="small"
                fullWidth={true}
                maxLength={10}
                minLength={5}
                autoFocus={true}
                placeholder="テキストボックスですよ"
                readOnly={false}
                disabled={false}
                required={true}
                margin="dense"
                register={register}
                errors={errors}
                sx={{
                  backgroundColor: 'lightblue',
                }}
                className={`test2`}
                classes={{
                  root: true ? 'test' : undefined,
                }}
                onFocus={() => console.log('onFocus!!!!!!!!!!!!!!!!!')}
                onChange={(e) =>
                  console.log('onChange!!!!![' + e.target.value + ':' + getValues('name') + ']')
                }
                onBlur={(e) =>
                  console.log('onBlur!!!!!![' + e.target.value + ':' + getValues('name') + ']')
                }
              />
            </Card>
          </div>
          <div className="p-2">
            <Card title="パスワード入力" subheader="通常" action={PAGE_STATUS_BUTTONS}>
              <InputPassword
                name="password"
                label="パスワード"
                getValues={getValues}
                register={register}
                errors={errors}
              />
            </Card>
          </div>
          <div className="p-2">
            <Card title="パスワード入力" subheader="表示切替あり" action={PAGE_STATUS_BUTTONS}>
              <InputPassword
                name="password"
                label="パスワード"
                canPasswordShow={true}
                getValues={getValues}
                register={register}
                errors={errors}
              />
            </Card>
          </div>
          <div className="p-2">
            <Card title="メールアドレス入力" action={PAGE_STATUS_BUTTONS}>
              <InputEmail
                name="email"
                label="メールアドレス"
                getValues={getValues}
                register={register}
                errors={errors}
              />
            </Card>
          </div>
          <div className="p-2">
            <Card title="電話番号入力" action={PAGE_STATUS_BUTTONS}>
              <InputTel
                name="tel"
                label="電話番号"
                getValues={getValues}
                register={register}
                errors={errors}
              />
            </Card>
          </div>
          <div className="p-2">
            <Card title="数値入力" subheader="カンマ編集なし" action={PAGE_STATUS_BUTTONS}>
              <InputNumber
                name="num"
                label="数値"
                getValues={getValues}
                register={register}
                errors={errors}
              />
            </Card>
          </div>
          <div className="p-2">
            <Card title="数値入力" subheader="カンマ編集あり" action={PAGE_STATUS_BUTTONS}>
              <InputNumber
                name="num"
                label="数値"
                isFormat={true}
                getValues={getValues}
                register={register}
                errors={errors}
              />
              <Button
                type="button"
                onClick={() => {
                  setValue('num', 123);
                }}
              >
                button
              </Button>
              [{getValues('num')}]
            </Card>
          </div>
        </div>
        <div className="py-5">
          {getValues('name')}
          {errors['name'] && <div>{errors['name']?.message}</div>}
        </div>
        <div>
          <FormControl>
            <FormLabel component="legend">性別：</FormLabel>
            <RadioGroup name="gender">
              <FormControlLabel
                value="male"
                control={<Radio />}
                label="男性"
                {...register('gender')}
              />
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="女性"
                {...register('gender')}
              />
            </RadioGroup>
            <FormHelperText error={'gender' in errors}>{errors.gender?.message}</FormHelperText>
          </FormControl>
        </div>
        <div>
          <TextField
            type="email"
            label="メールアドレス"
            margin="normal"
            {...register('email')}
            error={'email' in errors}
            helperText={errors['email']?.message}
          />
        </div>
        <div>
          <TextField
            label="メモ"
            margin="normal"
            multiline
            {...register('memo')}
            error={'memo' in errors}
            helperText={errors.memo?.message}
          />
        </div>
        <div>
          {fields.map((field: any, index: number) => (
            <div key={field.id}>
              <InputText
                name="id"
                getValues={getValues}
                listName="list"
                index={index}
                label="ID"
                margin="normal"
                register={register}
                errors={errors}
              />
              <InputText
                name="value"
                getValues={getValues}
                listName="list"
                index={index}
                label="VALUE"
                margin="normal"
                register={register}
                errors={errors}
              />
            </div>
          ))}
        </div>
        <div>
          <Button name="submit" variant="contained" type="submit">
            送信
          </Button>
          <Button name="reset" variant="contained" type="submit">
            リセット
          </Button>
        </div>
      </form>
    </>
  );
});
