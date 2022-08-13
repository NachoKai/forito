const maybeCall = (maybeFunc, ...args) => {
	return typeof maybeFunc === 'function' ? maybeFunc(...args) : maybeFunc
}

export default maybeCall
