import React from 'react'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { ChakraProvider } from '@chakra-ui/react'
import { MemoryRouter } from 'react-router-dom'

import { store } from '../redux/store'
import theme from '../theme'

const AllTheProviders = ({ children }) => (
	<ChakraProvider theme={theme}>
		<Provider store={store}>
			<MemoryRouter>{children}</MemoryRouter>
		</Provider>
	</ChakraProvider>
)

const customRender = (ui, options) => render(ui, { wrapper: AllTheProviders, ...options })

export * from '@testing-library/react'
export { customRender as render }
