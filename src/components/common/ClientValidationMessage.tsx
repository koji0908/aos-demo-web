'use client';

import zod from 'zod';
import { validationMessage } from '../../validation-message';
import { MessageInfo, MessageInfoState } from '@/slices/message-info-slice';
import { useSelector } from 'react-redux';
import Alert from '@mui/material/Alert';
import React, { memo } from 'react';

zod.setErrorMap(validationMessage);

export default memo(function ClientValidationMessage() {
  const messageInfo: MessageInfo = useSelector(
    (state: { messageInfoState: MessageInfoState }) => state.messageInfoState.messageInfo
  );

  return (
    <>
      {messageInfo.success.length > 0 && <Alert severity="success">{messageInfo.success}</Alert>}
      {messageInfo.infos.map((message) => (
        <Alert severity="info" key={message}>
          {message}
        </Alert>
      ))}
      {messageInfo.warnings.map((message) => (
        <Alert severity="warning" key={message}>
          {message}
        </Alert>
      ))}
      {messageInfo.validationErrors.length > 0 && (
        <Alert severity="error">入力内容に誤りがあります。</Alert>
      )}
      {messageInfo.errors.map((message) => (
        <Alert severity="error" key={message}>
          {message}
        </Alert>
      ))}
    </>
  );
});
