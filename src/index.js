import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import '@fontsource/roboto'
import '@fontsource/roboto-slab'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Analytics } from '@vercel/analytics/react'

import { App } from './App'
import { LoadingContextProvider } from './components/common/LoadingScreen/LoadingContext'
import './index.css'
import { themeConfig } from './theme'

const rootElement = document.getElementById('root')
const root = createRoot(rootElement)
const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000), // 1s, 2s, 4s, 8s, 16s, 30s
		},
	},
})

root.render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<ChakraProvider theme={themeConfig}>
				<ColorModeScript initialColorMode={themeConfig?.config?.initialColorMode} />
				<LoadingContextProvider>
					<Analytics />
					<App />
				</LoadingContextProvider>
			</ChakraProvider>
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	</StrictMode>
)
