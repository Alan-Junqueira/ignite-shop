import type { AppProps } from 'next/app';
import { globalStyles } from '../styles/global';

import logoImage from '../assets/logo.svg';
import { AppContainer, AppHeader } from '../styles/pages/app';
import Image from 'next/image';

globalStyles();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppContainer>
      <AppHeader>
        <Image src={logoImage.src} alt="" width={130} height={52} />
      </AppHeader>
      <Component {...pageProps} />
    </AppContainer>
  );
}
