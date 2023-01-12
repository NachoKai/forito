import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/roboto'
import '@fontsource/roboto-slab'

import { App } from './App'
import { LoadingContextProvider } from './components/common/LoadingScreen/LoadingContext'
import { themeConfig } from './theme'
import './index.css'

const rootElement = document.getElementById('root')
const root = createRoot(rootElement)

const queryClient = new QueryClient()

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
