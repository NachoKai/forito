import React from 'react'
import * as ReactDOMClient from 'react-dom/client'
import { Provider } from 'react-redux'
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'

import './index.css'
import store from './redux/store'
import App from './App.jsx'
import theme from './theme'
import { LoadingContextProvider } from './components/common/LoadingScreen/LoadingContext'

const container = document.getElementById('root')
const root = ReactDOMClient.createRoot(container)

root.render(
	<Provider store={store}>
		<ChakraProvider theme={theme}>
			<ColorModeScript initialColorMode={theme?.config?.initialColorMode} />
			<LoadingContextProvider>
				<App />
			</LoadingContextProvider>
		</ChakraProvider>
	</Provider>
)
