import { StrictMode } from 'react'
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import { createRoot } from 'react-dom/client'

import { App } from './App.jsx'
import { LoadingContextProvider } from './components/common/LoadingScreen/LoadingContext'
import { themeConfig } from './theme.ts'
import './index.css'

const rootElement = document.getElementById('root')
const root = createRoot(rootElement)

root.render(
	<ChakraProvider theme={themeConfig}>
		<ColorModeScript initialColorMode={themeConfig?.config?.initialColorMode} />
		<LoadingContextProvider>
			<StrictMode>
				<App />
			</StrictMode>
		</LoadingContextProvider>
	</ChakraProvider>
)
