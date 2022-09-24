import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { App } from './App.jsx'
import { LoadingContextProvider } from './components/common/LoadingScreen/LoadingContext'
import './index.css'
import { themeConfig } from './theme.ts'

const rootElement = document.getElementById('root')
const root = createRoot(rootElement)

root.render(
	<StrictMode>
		<ChakraProvider theme={themeConfig}>
			<ColorModeScript initialColorMode={themeConfig?.config?.initialColorMode} />
			<LoadingContextProvider>
				<App />
			</LoadingContextProvider>
		</ChakraProvider>
	</StrictMode>
)
