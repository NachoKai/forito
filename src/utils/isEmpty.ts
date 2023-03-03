type Value = string | object | undefined | null

export const isEmpty = (value: Value) => {
	if (value === undefined) return true
	if (value === null) return true
	if (typeof value === 'object') return Object.keys(value).length === 0
	if (typeof value === 'string') return value.trim().length === 0

	return true
}
