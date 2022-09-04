export const loadState = () => {
	try {
		const serializedState = localStorage.getItem('forito') || '{}'

		if (serializedState?.length < 5_200_000) return JSON.parse(serializedState)
		localStorage.removeItem('forito')
	} catch (error) {
		console.error(error)

		return undefined
	}
}

export const saveState = state => {
	try {
		const serializedState = JSON.stringify(state)

		localStorage.setItem('forito', serializedState)
	} catch (error) {
		localStorage.removeItem('forito')
		console.error(error)
	}
}
