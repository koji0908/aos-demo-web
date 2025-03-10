'use client';

import { messageInfoReducer } from '@/slices/message-info-slice';
import { screenInfoReducer } from '@/slices/screen-info-slices';
import { configureStore, EnhancedStore } from '@reduxjs/toolkit';
import { ReactNode } from 'react';
import { Provider } from 'react-redux';

type ClientStoreProviderProps = {
  children: ReactNode;
};

export default function ClientStoreProvider({ children }: Readonly<ClientStoreProviderProps>) {
  const store = configureStore({
    reducer: {
      messageInfoState: messageInfoReducer,
      screenInfo: screenInfoReducer,
    },
  });
  return (
    <>
      <Provider store={store}>{children}</Provider>
    </>
  );
}
