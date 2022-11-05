import { useEffect, useRef } from 'react'

export const retry = (count, { response }) => {
	if (isAuthorizationError(response) || isUnexistingUrlError(response)) return false

	return count < 3
}

const isUnexistingUrlError = response => response && [404].includes(response.status)
const isAuthorizationError = response => response && [401, 403].includes(response.status)
const isConnectionError = response => response && response.status === 500

export const handleErrorResponse = (error, { source }) => {
	if (error?.response) {
		const newError = {
			...error,
			name: isConnectionError(error.response)
				? 'Connection Error'
				: isAuthorizationError(error.response)
				? 'Unauthorized'
				: error.name,
			message: error.message,
			source,
		}

		throw newError
	}
	throw error
}

export const useInterval = (callback, delay) => {
	const savedCallback = useRef()

	useEffect(() => {
		savedCallback.current = callback
	}, [callback])

	useEffect(() => {
		const tick = () => {
			savedCallback.current()
		}

		if (delay !== null) {
			const id = setInterval(tick, delay)

			return () => clearInterval(id)
		}
	}, [delay])
}
