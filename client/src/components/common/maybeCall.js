export function maybeCall(maybeFunc, ...args) {
	return typeof maybeFunc === 'function' ? maybeFunc(...args) : maybeFunc
}
