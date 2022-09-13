import { useContext, useLayoutEffect } from 'react'

import { useLoadingStore } from '../../../state/loadingStore'
import { LoadingContext } from './LoadingContext'

export default function LoadingSync() {
	const loading = useLoadingStore(state => state.loading)
	const { showLoading, hideLoading } = useContext(LoadingContext)

	useLayoutEffect(() => {
		if (loading) {
			showLoading()
		} else {
			hideLoading()
		}
	}, [loading, showLoading, hideLoading])

	return <></>
}
