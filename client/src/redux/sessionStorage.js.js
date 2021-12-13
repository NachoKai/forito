export const loadState = () => {
	try {
		const serializedState = localStorage.getItem("forito")

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

		localStorage.setItem("forito", serializedState)
	} catch (error) {
		console.error(error)
	}
}
