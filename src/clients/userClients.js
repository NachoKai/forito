import { api } from '../api'

export const login = formData => {
	try {
		return api.post('/user/login', formData)
	} catch (err) {
		console.error('Error logging in', err)
	}
}

export const signup = formData => {
	try {
		return api.post('/user/signup', formData)
	} catch (err) {
		console.error('Error signing up', err)
	}
}

export const fetchUser = id => {
	try {
		return api.get(`/user/${id}`)
	} catch (err) {
		console.error('Error fetching user', err)
	}
}
