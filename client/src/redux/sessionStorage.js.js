export const loadState = () => {
	try {
		const serializedState = localStorage.getItem('forito')

		console.log('serializedState', serializedState.length)
		if (serializedState === null) {
			return undefined
		}
		if (serializedState?.length < 5_200_000) {
			return JSON.parse(serializedState)
		}
	} catch (err) {
		console.error(err)

		return undefined
	}
}

export const saveState = state => {
	try {
		const serializedState = JSON.stringify(state)

		localStorage.setItem('forito', serializedState)
	} catch (err) {
		localStorage.removeItem('forito')
		console.error(err)
	}
}
