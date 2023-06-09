import { ChakraProvider, DarkMode } from '@chakra-ui/react'
import { BaseLayout } from '@components/layout/BaseLayout'
import { HotToastConfig } from '@components/layout/HotToastConfig'
import { cache } from '@emotion/css'
import { CacheProvider } from '@emotion/react'
import { darkTheme, RainbowKitProvider } from '@rainbow-me/rainbowkit'
import '@rainbow-me/rainbowkit/styles.css'
import { env } from '@shared/environment'
import { chains, wagmiClient } from '@shared/wagmiClient'
import GlobalStyles from '@styles/GlobalStyles'
import { DefaultSeo } from 'next-seo'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import Router from 'next/router'
import NProgress from 'nprogress'
import { WagmiConfig } from 'wagmi'

// Router Loading Animation with @tanem/react-nprogress
Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <DefaultSeo
        dangerouslySetAllPagesToNoFollow={!env.isProduction}
        dangerouslySetAllPagesToNoIndex={!env.isProduction}
        defaultTitle="HiKyaku Protocol"
        titleTemplate="%s | HiKyaku"
        description="Resolve any email address to web3 address"
        openGraph={{
          type: 'website',
          locale: 'en',
          url: env.url,
          site_name: 'HiKyaku',
          images: [
            {
              url: `${env.url}/images/cover.jpg`,
              width: 1200,
              height: 670,
            },
          ],
        }}
        twitter={{
          handle: '@hikyaku',
        }}
      />

      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <CacheProvider value={cache}>
        <ChakraProvider>
          <DarkMode>
            <GlobalStyles />

            <WagmiConfig client={wagmiClient}>
              <RainbowKitProvider chains={chains} theme={darkTheme()} coolMode={true}>
                <BaseLayout>
                  <Component {...pageProps} />
                </BaseLayout>
              </RainbowKitProvider>
            </WagmiConfig>

            <HotToastConfig />
          </DarkMode>
        </ChakraProvider>
      </CacheProvider>
    </>
  )
}

export default MyApp
