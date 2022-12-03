import { Text } from '@chakra-ui/react'
import {
	fetchUser,
	login,
	signup,
	updateBirthday,
	updateEmail,
	updateName,
} from '../clients/userClients'
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
				throw err
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
				throw err
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
				throw err
			} finally {
				set({ loading: false }, false, 'signup')
			}
		},

		getUser: async id => {
			try {
				const { data } = await fetchUser(id)

				set({ user: data }, false, 'getUser')
			} catch (err) {
				showError(
					<>
						<Text fontWeight='bold'>{err.name}</Text>
						<Text>Something went wrong when trying to get user. {err.message}</Text>
						<Text>Please try again.</Text>
					</>
				)
				console.error(err)
				throw err
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
				throw err
			} finally {
				set({ loading: false }, false, 'googleLogin')
			}
		},

		updateUserBirthday: async (id, birthday) => {
			try {
				const { data } = await updateBirthday(id, { birthday })

				set({ user: data }, false, 'updateUserBirthday')
				const profile = JSON.parse(localStorage.getItem('forito-profile'))

				profile.result.birthday = birthday
				localStorage.setItem('forito-profile', JSON.stringify({ ...profile }))
			} catch (err) {
				showError(
					<>
						<Text fontWeight='bold'>{err.name}</Text>
						<Text>
							Something went wrong when trying to update user birthday. {err.message}
						</Text>
						<Text>Please try again.</Text>
					</>
				)
				console.error(err)
				throw err
			}
		},

		updateUserName: async (id, firstName, lastName) => {
			try {
				const { data } = await updateName(id, { firstName, lastName })

				set({ user: data }, false, 'updateUserName')
				const profile = JSON.parse(localStorage.getItem('forito-profile'))

				profile.result.name = lastName ? `${firstName} ${lastName}` : firstName
				localStorage.setItem('forito-profile', JSON.stringify({ ...profile }))
			} catch (err) {
				showError(
					<>
						<Text fontWeight='bold'>{err.name}</Text>
						<Text>
							Something went wrong when trying to update user name. {err.message}
						</Text>
						<Text>Please try again.</Text>
					</>
				)
				console.error(err)
				throw err
			}
		},

		updateUserEmail: async (id, email) => {
			try {
				const { data } = await updateEmail(id, { email })

				set({ user: data }, false, 'updateUserEmail')
				const profile = JSON.parse(localStorage.getItem('forito-profile'))

				profile.result.email = email
				localStorage.setItem('forito-profile', JSON.stringify({ ...profile }))
			} catch (err) {
				showError(
					<>
						<Text fontWeight='bold'>{err.name}</Text>
						<Text>
							Something went wrong when trying to update user email. {err.message}
						</Text>
						<Text>Please try again.</Text>
					</>
				)
				console.error(err)
				throw err
			}
		},
	}))

export const useAuthStore = createAuthStore()
