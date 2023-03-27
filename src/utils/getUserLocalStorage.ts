import { UserLocalStorageI } from '../types'

export const getUserLocalStorage = (): UserLocalStorageI => {
	const profile = localStorage.getItem('forito-profile')

	if (!profile) return {} as UserLocalStorageI

	return JSON.parse(profile) as UserLocalStorageI
}
