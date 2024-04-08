import '../styles/globals.css';
import '../styles/styles.css';

import { AppPropsWithLayout } from '@types';
import { ConfigProvider } from 'antd';
import SidebarLayout from 'components/layout/sidebar';
import i18n from 'configs/i18n';
import Cookies from 'js-cookie';
import { publicRoutes } from 'middleware';
import { useRouter } from 'next/router';
import NextNProgress from 'nextjs-progressbar';
import { LocaleProvider } from 'providers';
import React, { useEffect, useState } from 'react';
import { I18nextProvider } from 'react-i18next';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import Colors from 'utils/colors';

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const [role, setRole] = useState<string | undefined | null>(null);

  const router = useRouter();

  const getRole = Cookies.get('role');

  useEffect(() => {
    if (getRole) {
      setRole(getRole);
    }
  }, [getRole]);

  const getLayout =
    Component.getLayout ??
    ((page: any) => {
      return publicRoutes.includes(router.pathname) ||
        page.type?.name === 'Verification' ||
        page.type?.name === 'uuid' ||
        router.pathname.startsWith('/patient/') ? (
        page
      ) : (
        <SidebarLayout role={role}>{page}</SidebarLayout>
      );
    });

  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            refetchOnReconnect: false
          }
        }
      })
  );

  return (
    <I18nextProvider i18n={i18n}>
      <LocaleProvider>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: Colors.PRIMARY,
              colorPrimaryBg: Colors.COLOR_PRIMARY_BG,
              borderRadius: 2,
              boxShadow: 'none'
            }
          }}
        >
          <QueryClientProvider client={queryClient}>
            <Hydrate state={pageProps.dehydratedState}>
              {getLayout(<Component {...pageProps} />)}
              <NextNProgress color={Colors.PRIMARY} />
              <ReactQueryDevtools initialIsOpen={false} />
            </Hydrate>
          </QueryClientProvider>
        </ConfigProvider>
      </LocaleProvider>
    </I18nextProvider>
  );
}
