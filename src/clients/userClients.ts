import { FormDataI } from './../types'
import { api } from '../api'

export const login = async (formData: FormDataI) => {
	try {
		return await api.post('/user/login', formData)
	} catch (err) {
		console.error('Error logging in', err)
	}
}

export const signup = async (formData: FormDataI) => {
	try {
		return await api.post('/user/signup', formData)
	} catch (err) {
		console.error('Error signing up', err)
	}
}

export const fetchUser = async (id: string) => {
	try {
		return await api.get(`/user/${id}`)
	} catch (err) {
		console.error('Error fetching user', err)
	}
}
