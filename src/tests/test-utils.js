import React from 'react'
import { render } from '@testing-library/react'
import { ChakraProvider } from '@chakra-ui/react'
import { MemoryRouter } from 'react-router-dom'
import PropTypes from 'prop-types'

import theme from '../theme.ts'

const AllTheProviders = ({ children }) => {
	return (
		<ChakraProvider theme={theme}>
			<MemoryRouter>{children}</MemoryRouter>
		</ChakraProvider>
	)
}

const customRender = (ui, options) => render(ui, { wrapper: AllTheProviders, ...options })

export * from '@testing-library/react'
export { customRender as render }

AllTheProviders.propTypes = {
	children: PropTypes.node,
}
