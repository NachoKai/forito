import { useContext, useEffect, useRef } from 'react'
import { Spinner, useColorMode } from '@chakra-ui/react'

import { LoadingContext } from './LoadingContext'

const LoadingScreen = () => {
	const { isLoading } = useContext(LoadingContext)
	const { colorMode } = useColorMode()
	const loadingRef = useRef(null)

	useEffect(() => {
		isLoading && loadingRef.current.focus()
	}, [isLoading])

	return isLoading ? (
		<div
			ref={loadingRef}
			className={
				colorMode === 'light' ? 'loading-background-light' : 'loading-background-dark'
			}
		>
			<div className='loading-bar'>
				<Spinner
					className='loading-circle'
					color='blue.500'
					emptyColor='gray.200'
					size='xl'
					speed='0.65s'
					thickness='8px'
				/>
			</div>
		</div>
	) : null
}

export default LoadingScreen
