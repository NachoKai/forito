import { Spinner, useColorMode } from '@chakra-ui/react'
import { useContext, useEffect, useLayoutEffect, useRef } from 'react'

import { usePostsStore } from '../../../state/postsStore'
import { getThemeColor } from '../../../utils/getThemeColor.ts'
import { LoadingContext } from './LoadingContext'

const LoadingScreen = () => {
	const { isLoading } = useContext(LoadingContext)
	const { colorMode } = useColorMode()
	const { loading } = usePostsStore()
	const loadingRef = useRef(null)
	const { showLoading, hideLoading } = useContext(LoadingContext)

	useLayoutEffect(() => {
		if (isLoading) {
			showLoading()
		} else {
			hideLoading()
		}
	}, [isLoading, showLoading, hideLoading])

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

export default LoadingScreen
