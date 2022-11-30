import type { AppProps } from 'next/app';
import { globalStyles } from '../styles/global';

import logoImage from '../assets/logo.svg';
import { AppContainer, AppHeader } from '../styles/pages/app';

globalStyles();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppContainer>
      <AppHeader>
        <img src={logoImage.src} alt="" />
      </AppHeader>
      <Component {...pageProps} />
    </AppContainer>
  );
}
