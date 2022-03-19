import { useContext, useLayoutEffect } from 'react'
import { useSelector } from 'react-redux'

import { getLoading } from '../../../redux/loading'
import { LoadingContext } from './LoadingContext'

export default function LoadingSync() {
	const loading = useSelector(getLoading)
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
