import create from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

import * as api from '../api'
import { showError } from '../utils/showError.ts'

const INITIAL_STATE = {
	authData: null,
	user: null,
	loading: true,
}

const store = set => ({
	...INITIAL_STATE,
	cleanUp: () => set(INITIAL_STATE, false, 'auth-clean-up'),

	login: async (formData, navigate) => {
		set({ loading: true }, false, 'login')
		try {
			const { data } = await api.login(formData)

			localStorage.setItem('forito-profile', JSON.stringify({ ...data }))
			set({ authData: data, loading: false }, false, 'login')
			navigate('/')
			navigate(0)
		} catch (err) {
			showError('Something went wrong when trying to log in. Please try again.')
			console.error(err)
		} finally {
			set({ loading: false }, false, 'login')
		}
	},

	logout: async navigate => {
		try {
			localStorage.removeItem('forito-profile')
			localStorage.removeItem('forito-theme')
			set({ authData: null, loading: false }, false, 'logout')
			navigate('/')
			navigate(0)
		} catch (err) {
			showError('Something went wrong when trying to log out. Please try again.')
			console.error(err)
		}
	},

	signup: async (formData, navigate) => {
		set({ loading: true }, false, 'signup')
		try {
			const { data } = await api.signup(formData)

			set({ authData: data }, false, 'signup')
			localStorage.setItem('forito-profile', JSON.stringify({ ...data }))
			navigate('/')
			navigate(0)
		} catch (err) {
			showError('Something went wrong when trying to sign up. Please try again.')
			console.error(err)
		} finally {
			set({ loading: false }, false, 'signup')
		}
	},

	getUser: async id => {
		try {
			const { data } = await api.fetchUser(id)

			set({ user: data }, false, 'getUser')
		} catch (err) {
			showError('Something went wrong when trying to get user. Please try again.')
			console.error(err)
		}
	},
})

export const useAuthStore = create(
	devtools(immer(persist(store, { name: 'forito-auth' })))
)
