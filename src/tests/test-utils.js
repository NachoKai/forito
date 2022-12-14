import { ChakraProvider } from '@chakra-ui/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render } from '@testing-library/react'
import PropTypes from 'prop-types'
import React from 'react'
import { MemoryRouter } from 'react-router-dom'

import { themeConfig } from '../theme'

const AllTheProviders = ({ children }) => {
	const queryClient = new QueryClient()

	return (
		<QueryClientProvider client={queryClient}>
			<ChakraProvider theme={themeConfig}>
				<MemoryRouter>{children}</MemoryRouter>
			</ChakraProvider>
		</QueryClientProvider>
	)
}

const customRender = (ui, options) => render(ui, { wrapper: AllTheProviders, ...options })

export * from '@testing-library/react'
export { customRender as render }

AllTheProviders.propTypes = {
	children: PropTypes.node,
}
