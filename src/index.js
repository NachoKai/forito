import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { QueryClient, QueryClientProvider } from 'react-query'
import { App } from './App.jsx'
import { LoadingContextProvider } from './components/common/LoadingScreen/LoadingContext'
import './index.css'
import { themeConfig } from './theme.ts'

const rootElement = document.getElementById('root')
const root = createRoot(rootElement)
const queryClient = new QueryClient()

root.render(
	<ChakraProvider theme={themeConfig}>
		<ColorModeScript initialColorMode={themeConfig?.config?.initialColorMode} />
		<QueryClientProvider client={queryClient}>
			<LoadingContextProvider>
				<StrictMode>
					<App />
				</StrictMode>
			</LoadingContextProvider>
		</QueryClientProvider>
	</ChakraProvider>
)
