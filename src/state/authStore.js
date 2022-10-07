import { fetchUser, login, signup } from '../clients/userClients'
import { showError } from '../utils/showError.ts'
import { create } from './createStore'

const INITIAL_STATE = {
	authData: null,
	user: null,
	loading: true,
}

const createAuthStore = () =>
	create('authStore')(set => ({
		...INITIAL_STATE,
		cleanUp: () => set(INITIAL_STATE, false, 'auth-clean-up'),

		login: async (formData, navigate) => {
			set({ loading: true }, false, 'login')
			try {
				const { data } = await login(formData)

				localStorage.setItem('forito-profile', JSON.stringify({ ...data }))
				set({ authData: data, loading: false }, false, 'login')
				navigate('/posts')
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
				navigate('/posts')
				navigate(0)
			} catch (err) {
				showError('Something went wrong when trying to log out. Please try again.')
				console.error(err)
			}
		},

		signup: async (formData, navigate) => {
			set({ loading: true }, false, 'signup')
			try {
				const { data } = await signup(formData)

				set({ authData: data }, false, 'signup')
				localStorage.setItem('forito-profile', JSON.stringify({ ...data }))
				navigate('/posts')
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
				const { data } = await fetchUser(id)

				set({ user: data }, false, 'getUser')
			} catch (err) {
				showError('Something went wrong when trying to get user. Please try again.')
				console.error(err)
			}
		},

		googleLogin: async (formData, navigate) => {
			set({ loading: true }, false, 'googleLogin')
			try {
				set({ authData: formData }, false, 'googleLogin')
				localStorage.setItem('forito-profile', JSON.stringify({ ...formData }))
				navigate('/posts')
				navigate(0)
			} catch (err) {
				showError('Something went wrong when trying to sign up. Please try again.')
				console.error(err)
			} finally {
				set({ loading: false }, false, 'googleLogin')
			}
		},
	}))

export const useAuthStore = createAuthStore()
