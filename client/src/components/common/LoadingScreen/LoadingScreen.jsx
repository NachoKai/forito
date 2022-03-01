import { Spinner } from '@chakra-ui/react'
import { useContext } from 'react'
import { LoadingContext } from './LoadingContext'

const LoadingScreen = () => {
	const { isLoading } = useContext(LoadingContext)

	return isLoading ? (
		<div className='loading-background'>
			<div className='loading-bar'>
				<Spinner
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