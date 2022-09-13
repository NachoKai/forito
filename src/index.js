import { StrictMode } from 'react'
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import { createRoot } from 'react-dom/client'

import App from './App.jsx'
import { LoadingContextProvider } from './components/common/LoadingScreen/LoadingContext'
import './index.css'
import theme from './theme.ts'

const rootElement = document.getElementById('root')
const root = createRoot(rootElement)

root.render(
	<ChakraProvider theme={theme}>
		<ColorModeScript initialColorMode={theme?.config?.initialColorMode} />
		<LoadingContextProvider>
			<StrictMode>
				<App />
			</StrictMode>
		</LoadingContextProvider>
	</ChakraProvider>
)
