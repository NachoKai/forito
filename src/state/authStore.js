import { Text } from '@chakra-ui/react'

import { updateBirthday, updateEmail, updateName } from '../clients/userClients'
import { showError } from '../utils/showError'
import { create } from './createStore'

const INITIAL_STATE = {
	user: null,
}

const createAuthStore = () =>
	create('authStore')(set => ({
		...INITIAL_STATE,

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
