export const getUserLocalStorage = () =>
	JSON.parse(localStorage.getItem('forito-profile')) || {}
