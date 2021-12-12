export const loadState = () => {
	try {
		const serializedState = sessionStorage.getItem("forito")

		if (serializedState === null) {
			return undefined
		}

		return JSON.parse(serializedState)
	} catch (error) {
		return undefined
	}
}

export const saveState = state => {
	try {
		const serializedState = JSON.stringify(state)

		sessionStorage.setItem("forito", serializedState)
	} catch (error) {
		console.error(error)
	}
}
