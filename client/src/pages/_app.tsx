import { ChakraProvider } from '@chakra-ui/react'

import theme from '../theme'
import { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { store } from '../store'
import { Context, initialContext } from '../utils/context'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Context.Provider value={initialContext}>
        <ChakraProvider resetCSS theme={theme}>
          <Component {...pageProps} />
        </ChakraProvider>
      </Context.Provider>
    </Provider>
  )
}

export default MyApp
