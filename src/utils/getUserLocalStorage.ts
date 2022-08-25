export const getUserLocalStorage = (): object => {
	const profile = localStorage.getItem('forito-profile')

	return profile ? JSON.parse(profile) : {}
}
