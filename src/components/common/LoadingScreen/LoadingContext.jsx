import { useBoolean } from '@chakra-ui/react'
import PropTypes from 'prop-types'
import { createContext } from 'react'

export const LoadingContext = createContext()

export const LoadingContextProvider = ({ children }) => {
	const [isLoading, setIsLoading] = useBoolean()

	const showLoading = () => setIsLoading.on()
	const hideLoading = () => setIsLoading.off()

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
