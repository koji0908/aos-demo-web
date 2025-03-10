import ClientValidationMessage from '@/components/common/ClientValidationMessage';
import '../validation-message';
import UiSample from '@/components/common/ui/UiSample';
import Login from '@/components/login/Login';
import { Suspense } from 'react';
import ClientStoreProvider from '@/components/provider/ClientStoreProvider';

export default function Root() {
  return (
    <>
      <ClientStoreProvider>
        <ClientValidationMessage />
        <Suspense fallback={<p>読み込み中...</p>}>
          <UiSample />
        </Suspense>
        // <Login />
      </ClientStoreProvider>
    </>
  );
}
