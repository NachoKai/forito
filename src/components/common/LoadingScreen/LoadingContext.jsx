import PropTypes from 'prop-types'
import { createContext, useState } from 'react'

export const LoadingContext = createContext()

export const LoadingContextProvider = ({ children }) => {
	const [isLoading, setIsLoading] = useState(false)

	const showLoading = () => setIsLoading(true)
	const hideLoading = () => setIsLoading(false)

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
