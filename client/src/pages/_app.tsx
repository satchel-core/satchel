import { ChakraProvider } from '@chakra-ui/react';

import theme from '../theme';
import { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { store, wrapper } from '../store';
import { Context, initialContext } from '../utils/context';
import { useState } from 'react';

function MyApp({ Component, pageProps }: AppProps) {
	const [asset, setAsset] = useState();
	initialContext.setAsset = setAsset;
	initialContext.asset = asset;

	return (
		<Provider store={store}>
			<Context.Provider value={initialContext}>
				<ChakraProvider resetCSS theme={theme}>
					<Component {...pageProps} />
				</ChakraProvider>
			</Context.Provider>
		</Provider>
	);
}

export default wrapper.withRedux(MyApp);
