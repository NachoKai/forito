import PropTypes from 'prop-types'
import { createContext, useState } from 'react'

export const LoadingContext = createContext()

export const LoadingContextProvider = ({ children }) => {
	const [loading, setLoading] = useState(false)

	const showLoading = () => setLoading(true)
	const hideLoading = () => setLoading(false)

	return (
		<LoadingContext.Provider
			value={{
				loading,
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
