import { StrictMode } from 'react'
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'

import App from './App.jsx'
import { LoadingContextProvider } from './components/common/LoadingScreen/LoadingContext'
import './index.css'
import store from './redux/store'
import theme from './theme'

const rootElement = document.getElementById('root')
const root = createRoot(rootElement)

root.render(
	<Provider store={store}>
		<ChakraProvider theme={theme}>
			<ColorModeScript initialColorMode={theme?.config?.initialColorMode} />
			<LoadingContextProvider>
				<StrictMode>
					<App />
				</StrictMode>
			</LoadingContextProvider>
		</ChakraProvider>
	</Provider>
)
