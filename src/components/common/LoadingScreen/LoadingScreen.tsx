import { useContext, useLayoutEffect } from 'react'

import { usePostsStore } from '../../../state/postsStore'
import { Loading } from '../Loading'
import { LoadingContext } from './LoadingContext'

const LoadingScreen = () => {
	const { isLoading } = useContext(LoadingContext)
	const { loading } = usePostsStore()
	const { showLoading, hideLoading } = useContext(LoadingContext)

	useLayoutEffect(() => {
		if (isLoading) {
			showLoading()
		} else {
			hideLoading()
		}
	}, [isLoading, showLoading, hideLoading])

	return loading ? <Loading /> : null
}

export default LoadingScreen
