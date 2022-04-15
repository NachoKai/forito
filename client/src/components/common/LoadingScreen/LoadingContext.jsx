import { createContext, useCallback, useState } from 'react'
import PropTypes from 'prop-types'

export const LoadingContext = createContext()

export function LoadingContextProvider({ children }) {
	const [isLoading, setLoading] = useState(false)

	const showLoading = useCallback(() => setLoading(true), [])
	const hideLoading = useCallback(() => setLoading(false), [])

	return (
		<LoadingContext.Provider
			value={{
				isLoading,
				showLoading,
				hideLoading,
			}}
		>
			{children}
		</LoadingContext.Provider>
	)
}

export const LoadingContextConsumer = LoadingContext.Consumer

LoadingContextProvider.propTypes = {
	children: PropTypes.node,
}
