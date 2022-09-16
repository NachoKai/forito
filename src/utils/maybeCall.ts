export const maybeCall = (maybeFunc: object, ...args): object => {
	return typeof maybeFunc === 'function' ? maybeFunc(...args) : maybeFunc
}
