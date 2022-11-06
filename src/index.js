import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { App } from './App'
import { LoadingContextProvider } from './components/common/LoadingScreen/LoadingContext'
import './index.css'
import { themeConfig } from './theme'

const rootElement = document.getElementById('root')
const root = createRoot(rootElement)

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
		},
	},
})

root.render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<ChakraProvider theme={themeConfig}>
				<ColorModeScript initialColorMode={themeConfig?.config?.initialColorMode} />
				<LoadingContextProvider>
					<App />
				</LoadingContextProvider>
			</ChakraProvider>
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	</StrictMode>
)
