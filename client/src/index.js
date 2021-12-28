import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'

import { store } from './redux/store'
import './index.css'
import App from './App.jsx'
import theme from './theme'

ReactDOM.render(
	<React.StrictMode>
		<ChakraProvider theme={theme}>
			<Provider store={store}>
				<ColorModeScript initialColorMode={theme?.config?.initialColorMode} />
				<App />
			</Provider>
		</ChakraProvider>
	</React.StrictMode>,
	document.getElementById('root') || document.createElement('div')
)
