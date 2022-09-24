import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

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
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	</ChakraProvider>
)
