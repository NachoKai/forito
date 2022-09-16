import { StrictMode } from 'react'
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'

import { App } from './App.jsx'
import { LoadingContextProvider } from './components/common/LoadingScreen/LoadingContext'
import { store } from './redux/store.ts'
import { themeConfig } from './theme.ts'
import './index.css'

const rootElement = document.getElementById('root')
const root = createRoot(rootElement)

root.render(
	<Provider store={store}>
		<ChakraProvider theme={themeConfig}>
			<ColorModeScript initialColorMode={themeConfig?.config?.initialColorMode} />
			<LoadingContextProvider>
				<StrictMode>
					<App />
				</StrictMode>
			</LoadingContextProvider>
		</ChakraProvider>
	</Provider>
)
