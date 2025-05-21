'use client';

import { useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@mui/material';
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
  setScreenModeRegist,
  setScreenStatusConfirm,
  setScreenStatusFinish,
  setScreenStatusInput,
} from '@/slices/screen-info-slices';
import Card from './component/Card';
import InputEmail from './form/InputEmail';
import InputTel from './form/InputTel';
import InputNumber from './form/InputNumber';
import TextArea from './form/TextArea';
import Radio from './form/Radio';
import Checkbox from './form/Checkbox';
import Select from './form/Select';
import MultiCheckbox from './form/MultiCheckbox';
import MultiSelect from './form/MultiSelect';
import DatePicker from './form/DatePicker';
import YearMonthPicker from './form/YearMonthPicker';
import DateTimePicker from './form/DateTimePicker';
import TimePicker from './form/TimePicker';
import dayjs from 'dayjs';

// TODO イベントハンドラの動作確認
// TODO フォームのJSON送信
export default memo(function MuiForm() {
  const screenInfo: ScreenInfo = useSelector((state: ScreenInfoState) => state.screenInfo);

  const schema = z.object({
    name1: z.string().min(1).max(30),
    name2: z.string().min(1).max(30),
    email: z.string().min(1).max(50).email('無効なメールアドレスです'),
    gender: z.string().min(1),
    memo: z.string().min(1).max(100),
    password1: z.string().min(1).max(10),
    password2: z.string().min(1).max(10),
    tel: z.string().min(1),
    num1: z.string().min(1),
    num2: z.number(),
    check1: z.string().min(1),
    check2: z.array(z.string()).min(1),
    select1: z.string().min(1),
    select2: z.array(z.string()).min(1),
    date: z.string().min(1),
    yearMonth: z.string().min(1),
    dateTime: z.string().min(1),
    time: z.string().min(1),
    list: z
      .array(
        z.object({
          id: z.number().min(1).max(3),
          value: z.string().min(1).max(10),
        })
      )
      .min(1),
  });
  type FormData = z.infer<typeof schema>;

  const defaultValues: FormData = {
    name1: '名無し権兵衛1',
    name2: '名無し権兵衛2',
    email: 'hoge@example.com',
    gender: '1',
    memo: '',
    password1: '',
    password2: '',
    tel: '09000000000',
    num1: '0',
    num2: 0,
    check1: '0',
    check2: [],
    select1: '',
    select2: [],
    date: '',
    yearMonth: '',
    dateTime: '',
    time: '',
    list: [
      { id: 1, value: 'value1' },
      { id: 2, value: 'value2' },
      { id: 3, value: 'value3' },
    ],
  };

  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isLoading },
    getValues,
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
    dispatch(setScreenModeRegist());
    dispatch(setScreenStatusInput());
    // 空配列だと初期表示のみ、指定なしだと再描画される度に実行される
  }, []);

  useEffect(() => {
    dispatch(setValidationErrors(getValidationErrorMessage(errors)));
    dispatch(setSuccess('成功だよ'));
    dispatch(setInfos(['情報１', '情報２', '情報３']));
    dispatch(setWarnings(['警告１', '警告２', '警告３']));
    dispatch(setErrors(['エラー１', 'エラー２', 'エラー３']));
  }, [errors]);

  const onsubmit = (data: FormData, e: any) => {
    console.log('onSubmit!!!!');
    console.log(data);
    console.log(data.name1);
    console.log(e.nativeEvent.submitter.name);
    console.log(isValid);
    console.log(isLoading);
  };
  const onerror = (err: any, e: any) => {
    console.log('onError!!!!');
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
            console.log('form value ↓↓↓↓↓↓↓');
            console.log(getValues());
            console.log('form value ↑↑↑↑↑↑↑');
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
      <div>
        <Button name="submit" variant="contained" type="submit">
          送信
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
            <Card
              title="イベントハンドラテスト"
              subheader={getValues('name1')}
              action={PAGE_STATUS_BUTTONS}
            >
              <Select
                label="住所"
                name="select1"
                control={control}
                required={true}
                items={[
                  { label: '千葉', value: '1' },
                  { label: '東京', value: '2' },
                  { label: '埼玉', value: '3' },
                  { label: '茨城', value: '4' },
                  { label: '栃木', value: '5' },
                  { label: '北海道はでっかいどう', value: '6' },
                ]}
                onFocus={() =>
                  console.log('イベントハンドラテスト(onFocus):[' + getValues('select1') + ']')
                }
                onBlur={() =>
                  console.log('イベントハンドラテスト(onBlur):[' + getValues('select1') + ']')
                }
                onChange={() =>
                  console.log('イベントハンドラテスト(onChange):[' + getValues('select1') + ']')
                }
              />
            </Card>
          </div>

          <div className="p-2">
            <Card title="テキストボックス" subheader="基本" action={PAGE_STATUS_BUTTONS}>
              <InputText name="name1" type="text" label="名前" control={control} />
            </Card>
          </div>
          <div className="p-2">
            <Card title="テキストボックス" subheader="全props指定" action={PAGE_STATUS_BUTTONS}>
              <InputText
                name="name2"
                label="名前"
                labelClassName="labelClass"
                type="text"
                control={control}
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
                sx={{
                  backgroundColor: 'lightblue',
                }}
                className={`test2`}
                classes={{
                  root: true ? 'test' : undefined,
                }}
                onFocus={() => console.log('onFocus!!!!!!!!!!!!!!!!!')}
                onChange={(e) =>
                  console.log('onChange!!!!![' + e.target.value + ':' + getValues('name2') + ']')
                }
                onBlur={(e) =>
                  console.log('onBlur!!!!!![' + e.target.value + ':' + getValues('name2') + ']')
                }
              />
            </Card>
          </div>
          <div className="p-2">
            <Card title="数値入力" subheader="カンマ編集なし" action={PAGE_STATUS_BUTTONS}>
              <InputNumber name="num1" label="数値" control={control} />
            </Card>
          </div>
          <div className="p-2">
            <Card title="数値入力" subheader="カンマ編集あり" action={PAGE_STATUS_BUTTONS}>
              <InputNumber name="num2" label="数値" isFormat={true} control={control} />[
              {getValues('num2')}
            </Card>
          </div>

          <div className="p-2">
            <Card title="パスワード入力" subheader="通常" action={PAGE_STATUS_BUTTONS}>
              <InputPassword name="password1" label="パスワード" control={control} />
            </Card>
          </div>
          <div className="p-2">
            <Card title="パスワード入力" subheader="表示切替あり" action={PAGE_STATUS_BUTTONS}>
              <InputPassword
                name="password2"
                label="パスワード"
                canPasswordShow={true}
                control={control}
              />
            </Card>
          </div>
          <div className="p-2">
            <Card title="メールアドレス入力" action={PAGE_STATUS_BUTTONS}>
              <InputEmail name="email" label="メールアドレス" control={control} />
            </Card>
          </div>
          <div className="p-2">
            <Card title="電話番号入力" action={PAGE_STATUS_BUTTONS}>
              <InputTel name="tel" label="電話番号" control={control} />
            </Card>
          </div>
          <div className="p-2">
            <Card title="テキストエリア" action={PAGE_STATUS_BUTTONS}>
              <TextArea name="memo" label="テキストエリア" rows={3} control={control} />
            </Card>
          </div>
          <div className="p-2">
            <Card title="ラジオボタン" action={PAGE_STATUS_BUTTONS}>
              <Radio
                label="性別"
                name="gender"
                control={control}
                radios={[
                  { label: '男性', value: '0' },
                  { label: '女性', value: '1' },
                ]}
              />
            </Card>
          </div>
          <div className="p-2">
            <Card title="チェックボックス（単一）" action={PAGE_STATUS_BUTTONS}>
              <Checkbox
                label="フラグ"
                name="check1"
                control={control}
                checks={[{ label: '利用する', value: '1' }]}
              />
            </Card>
          </div>
          <div className="p-2">
            <Card title="チェックボックス（複数）" action={PAGE_STATUS_BUTTONS}>
              <MultiCheckbox
                label="食べ物"
                name="check2"
                control={control}
                checks={[
                  { label: 'りんご', value: '1' },
                  { label: 'メロン', value: '2' },
                  { label: '生ハム', value: '3' },
                ]}
              />
            </Card>
          </div>
          <div className="p-2">
            <Card title="プルダウン（単一選択）" action={PAGE_STATUS_BUTTONS}>
              <Select
                label="住所"
                name="select1"
                control={control}
                required={true}
                items={[
                  { label: '千葉', value: '1' },
                  { label: '東京', value: '2' },
                  { label: '埼玉', value: '3' },
                  { label: '茨城', value: '4' },
                  { label: '栃木', value: '5' },
                  { label: '北海道はでっかいどう', value: '6' },
                ]}
              />
            </Card>
          </div>
          <div className="p-2">
            <Card title="プルダウン（複数選択）" action={PAGE_STATUS_BUTTONS}>
              <MultiSelect
                label="住所"
                name="select2"
                control={control}
                required={false}
                items={[
                  { label: '千葉', value: '1' },
                  { label: '東京', value: '2' },
                  { label: '埼玉', value: '3' },
                  { label: '茨城', value: '4' },
                  { label: '栃木', value: '5' },
                  { label: '北海道はでっかいどう', value: '6' },
                ]}
              />
            </Card>
          </div>
          <div className="p-2">
            <Card title="日付" action={PAGE_STATUS_BUTTONS}>
              <DatePicker label="日付を選択" name="date" control={control} required={false} />
              {getValues('date')}
            </Card>
          </div>
          <div className="p-2">
            <Card title="年月" action={PAGE_STATUS_BUTTONS}>
              <YearMonthPicker
                label="年月を選択"
                name="yearMonth"
                control={control}
                required={false}
              />
              {getValues('yearMonth')}
            </Card>
          </div>
          <div className="p-2">
            <Card title="日時" action={PAGE_STATUS_BUTTONS}>
              <DateTimePicker
                label="日時を選択"
                name="dateTime"
                control={control}
                required={false}
                minDate={new Date(2025, 2, 1)}
                maxDate={new Date(2025, 2, 20)}
              />
              {getValues('dateTime')}
            </Card>
          </div>
          <div className="p-2">
            <Card title="時刻" action={PAGE_STATUS_BUTTONS}>
              <TimePicker label="時刻を選択" name="time" control={control} required={false} />
              [[[{getValues('time')}]]]
            </Card>
          </div>
        </div>
        <div className="py-5">
          {getValues('name1')}
          {errors['name1'] && <div>{errors['name1']?.message}</div>}
        </div>
        <div>
          {fields.map((field: any, index: number) => (
            <div key={field.id}>
              <InputText
                name="id"
                listName="list"
                index={index}
                label="ID"
                margin="normal"
                control={control}
              />
              <InputText
                name="value"
                listName="list"
                index={index}
                label="VALUE"
                margin="normal"
                control={control}
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
