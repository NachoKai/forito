import { FormDataI } from './../types'
import { api } from '../api/api'

const USER_ENDPOINT = '/user'

export const login = async (formData: FormDataI) => {
	try {
		return await api.post(`${USER_ENDPOINT}/login`, formData)
	} catch (err) {
		console.error('Error logging in', err)
		throw err
	}
}

export const signup = async (formData: FormDataI) => {
	try {
		return await api.post(`${USER_ENDPOINT}/signup`, formData)
	} catch (err) {
		console.error('Error signing up', err)
		throw err
	}
}

export const getUser = async (userId: string) => {
	try {
		return await api.get(`${USER_ENDPOINT}/${userId}`)
	} catch (err) {
		console.error(`Error getting user ${userId}`, err)
		throw err
	}
}

export const updateBirthday = async (userId: string, birthday: string) => {
	try {
		return await api.patch(`${USER_ENDPOINT}/${userId}/setBirthday`, birthday)
	} catch (err) {
		console.error('Error updating user birthday', err)
		throw err
	}
}

export const updateName = async (userId: string, { firstName, lastName }) => {
	try {
		return await api.patch(`${USER_ENDPOINT}/${userId}/setName`, { firstName, lastName })
	} catch (err) {
		console.error('Error updating user name', err)
		throw err
	}
}

export const updateEmail = async (userId: string, email: string) => {
	try {
		return await api.patch(`${USER_ENDPOINT}/${userId}/setEmail`, { email })
	} catch (err) {
		console.error('Error updating user email', err)
		throw err
	}
}

export const getNotifications = async (userId: string) => {
	try {
		return await api.get(`${USER_ENDPOINT}/${userId}/notifications`)
	} catch (err) {
		console.error('Error getting notifications', err)
		throw err
	}
}

export const addNotification = async (userId: string, notification: boolean) => {
	try {
		return await api.patch(`${USER_ENDPOINT}/${userId}/addNotification`, { notification })
	} catch (err) {
		console.error('Error setting notification', err)
		throw err
	}
}

export const updateNotifications = async (userId: string, notifications: boolean) => {
	try {
		return await api.patch(`${USER_ENDPOINT}/${userId}/updateNotifications`, {
			notifications,
		})
	} catch (err) {
		console.error('Error updating notifications', err)
		throw err
	}
}
