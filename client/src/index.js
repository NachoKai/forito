import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'

import { store } from './redux/store'
import './index.css'
import App from './App.jsx'
import theme from './theme'

ReactDOM.render(
	<>
		<ColorModeScript initialColorMode={theme.config.initialColorMode} />
		<React.StrictMode>
			<Provider store={store}>
				<ChakraProvider theme={theme}>
					<App />
				</ChakraProvider>
			</Provider>
		</React.StrictMode>
	</>,
	document.getElementById('root')
)
