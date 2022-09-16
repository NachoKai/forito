import { useContext, useEffect, useRef } from 'react'
import { Spinner, useColorMode } from '@chakra-ui/react'

import { getThemeColor } from '../../../utils/getThemeColor.ts'
import { LoadingContext } from './LoadingContext'

export const LoadingScreen = () => {
	const { loading } = useContext(LoadingContext)
	const { colorMode } = useColorMode()
	const loadingRef = useRef(null)

	useEffect(() => {
		if (loading) loadingRef.current.focus()
	}, [loading])

	return loading ? (
		<div
			ref={loadingRef}
			className={
				colorMode === 'light' ? 'loading-background-light' : 'loading-background-dark'
			}
		>
			<div className='loading-bar'>
				<Spinner
					className='loading-circle'
					color={() => `${getThemeColor()}.500`}
					emptyColor='gray.200'
					size='xl'
					speed='0.65s'
					thickness='8px'
				/>
			</div>
		</div>
	) : null
}
