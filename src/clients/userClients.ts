import { FormDataI } from './../types'
import { api } from '../api/api'

export const login = async (formData: FormDataI) => {
	try {
		return await api.post('/user/login', formData)
	} catch (err) {
		console.error('Error logging in', err)
		throw err
	}
}

export const signup = async (formData: FormDataI) => {
	try {
		return await api.post('/user/signup', formData)
	} catch (err) {
		console.error('Error signing up', err)
		throw err
	}
}

export const fetchUser = async (id: string) => {
	try {
		return await api.get(`/user/${id}`)
	} catch (err) {
		console.error('Error fetching user', err)
		throw err
	}
}

export const updateBirthday = async (id: string, birthday: string) => {
	try {
		return await api.patch(`/user/${id}/setBirthday`, birthday)
	} catch (err) {
		console.error('Error updating user birthday', err)
		throw err
	}
}

export const updateName = async (id: string, { firstName, lastName }) => {
	try {
		return await api.patch(`/user/${id}/setName`, { firstName, lastName })
	} catch (err) {
		console.error('Error updating user name', err)
		throw err
	}
}

export const updateEmail = async (id: string, email: string) => {
	try {
		return await api.patch(`/user/${id}/setEmail`, email)
	} catch (err) {
		console.error('Error updating user email', err)
		throw err
	}
}

export const fetchNotifications = async (id: string) => {
	try {
		return await api.get(`/user/${id}/notifications`)
	} catch (err) {
		console.error('Error getting notifications', err)
		throw err
	}
}

export const addNotification = async (id: string, notification: boolean) => {
	try {
		return await api.patch(`/user/${id}/addNotification`, { notification })
	} catch (err) {
		console.error('Error setting notification', err)
		throw err
	}
}

export const updateNotifications = async (id: string, notifications: boolean) => {
	try {
		return await api.patch(`/user/${id}/updateNotifications`, { notifications })
	} catch (err) {
		console.error('Error updating notifications', err)
		throw err
	}
}
