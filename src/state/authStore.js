import { Text } from '@chakra-ui/react'

import { login, signup } from '../clients/userClients'
import { showError } from '../utils/showError'
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

		login: async formData => {
			set({ loading: true }, false, 'login')
			try {
				const { data } = await login(formData)

				localStorage.setItem('forito-profile', JSON.stringify({ ...data }))
				set({ authData: data, loading: false }, false, 'login')
			} catch (err) {
				showError(
					<>
						<Text fontWeight='bold'>{err.name}</Text>
						<Text>Something went wrong when trying to log in. {err.message}</Text>
						<Text>Please try again.</Text>
					</>
				)
				console.error(err)
			} finally {
				set({ loading: false }, false, 'login')
			}
		},

		logout: async () => {
			try {
				localStorage.removeItem('forito-profile')
				localStorage.removeItem('forito-theme')
				set({ authData: null, loading: false }, false, 'logout')
			} catch (err) {
				showError(
					<>
						<Text fontWeight='bold'>{err.name}</Text>
						<Text>Something went wrong when trying to log out. {err.message}</Text>
						<Text>Please try again.</Text>
					</>
				)
				console.error(err)
			}
		},

		signup: async formData => {
			set({ loading: true }, false, 'signup')
			try {
				const { data } = await signup(formData)

				set({ authData: data }, false, 'signup')
				localStorage.setItem('forito-profile', JSON.stringify({ ...data }))
			} catch (err) {
				showError(
					<>
						<Text fontWeight='bold'>{err.name}</Text>
						<Text>Something went wrong when trying to sign up. {err.message}</Text>
						<Text>Please try again.</Text>
					</>
				)
				console.error(err)
			} finally {
				set({ loading: false }, false, 'signup')
			}
		},

		googleLogin: async formData => {
			set({ loading: true }, false, 'googleLogin')
			try {
				set({ authData: formData }, false, 'googleLogin')
				localStorage.setItem('forito-profile', JSON.stringify({ ...formData }))
			} catch (err) {
				showError(
					<>
						<Text fontWeight='bold'>{err.name}</Text>
						<Text>
							Something went wrong when trying to login with Google. {err.message}
						</Text>
						<Text>Please try again.</Text>
					</>
				)
				console.error(err)
			} finally {
				set({ loading: false }, false, 'googleLogin')
			}
		},
	}))

export const useAuthStore = createAuthStore()
