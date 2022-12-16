import { Text } from '@chakra-ui/react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import {
	fetchUser,
	login,
	signup,
	updateBirthday,
	updateEmail,
	updateName,
} from '../../clients/userClients'
import { showError } from '../../utils/showError.ts'
import { handleErrorResponse, retry } from './utils'

export const useLogin = () => {
	const queryClient = useQueryClient()

	return useMutation(
		async formData => {
			try {
				const { data } = await login(formData)

				localStorage.setItem('forito-profile', JSON.stringify({ ...data }))
			} catch (err) {
				showError(
					<>
						<Text fontWeight='bold'>{err.name}</Text>
						<Text>Something went wrong when trying to log in. {err.message}</Text>
						<Text>Please try again.</Text>
					</>
				)
				console.error(err)
				handleErrorResponse(err, { source: 'login' })
			}
		},
		{
			onSuccess: async () => {
				await queryClient.refetchQueries({ queryKey: ['postsQuery'] })
			},
		}
	)
}

export const useLogout = () => {
	const queryClient = useQueryClient()

	return useMutation(
		async () => {
			try {
				localStorage.removeItem('forito-profile')
				localStorage.removeItem('forito-theme')
			} catch (err) {
				showError(
					<>
						<Text fontWeight='bold'>{err.name}</Text>
						<Text>Something went wrong when trying to log out. {err.message}</Text>
						<Text>Please try again.</Text>
					</>
				)
				console.error(err)
				handleErrorResponse(err, { source: 'logout' })
			}
		},
		{
			onSuccess: async () => {
				await queryClient.refetchQueries({ queryKey: ['postsQuery'] })
			},
		}
	)
}

export const useSignup = () => {
	const queryClient = useQueryClient()

	return useMutation(
		async formData => {
			try {
				const { data } = await signup(formData)

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
				handleErrorResponse(err, { source: 'signup' })
			}
		},
		{
			onSuccess: async () => {
				await queryClient.refetchQueries({ queryKey: ['postsQuery'] })
			},
		}
	)
}

export const useGetUser = id => {
	const getUserQuery = useQuery(
		['getUserQuery'],
		async () => {
			try {
				const { data } = await fetchUser(id)

				return data
			} catch (err) {
				showError(
					<>
						<Text fontWeight='bold'>{err.name}</Text>
						<Text>Something went wrong when trying to get user. {err.message}</Text>
						<Text>Please try again.</Text>
					</>
				)
				handleErrorResponse(err, { source: 'get-user' })
			}
		},
		{
			retry,
		}
	)

	return {
		...getUserQuery,
		user: getUserQuery?.data,
	}
}

export const useGoogleLogin = () => {
	const queryClient = useQueryClient()

	return useMutation(
		async formData => {
			try {
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
				handleErrorResponse(err, { source: 'google-login' })
			}
		},
		{
			onSuccess: async () => {
				await queryClient.refetchQueries({ queryKey: ['postsQuery'] })
			},
		}
	)
}

export const useUpdateUserName = () => {
	const queryClient = useQueryClient()

	return useMutation(
		async ({ userId, firstName, lastName }) => {
			try {
				const { data } = await updateName(userId, { firstName, lastName })
				const profile = JSON.parse(localStorage.getItem('forito-profile'))

				profile.result.name = lastName ? `${firstName} ${lastName}` : firstName
				localStorage.setItem('forito-profile', JSON.stringify({ ...profile }))

				return data
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
				handleErrorResponse(err, { source: 'update-user-name' })
			}
		},
		{
			onSuccess: async () => {
				await queryClient.refetchQueries({ queryKey: ['getUserQuery'] })
			},
		}
	)
}

export const useUpdateUserEmail = () => {
	const queryClient = useQueryClient()

	return useMutation(
		async ({ userId, email }) => {
			try {
				const { data } = await updateEmail(userId, { email })
				const profile = JSON.parse(localStorage.getItem('forito-profile'))

				profile.result.email = email
				localStorage.setItem('forito-profile', JSON.stringify({ ...profile }))

				return data
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
				handleErrorResponse(err, { source: 'update-user-email' })
			}
		},
		{
			onSuccess: async () => {
				await queryClient.refetchQueries({ queryKey: ['getUserQuery'] })
			},
		}
	)
}

export const useUpdateUserBirthday = () => {
	const queryClient = useQueryClient()

	return useMutation(
		async ({ userId, birthday }) => {
			try {
				const { data } = await updateBirthday(userId, { birthday })
				const profile = JSON.parse(localStorage.getItem('forito-profile'))

				profile.result.birthday = birthday
				localStorage.setItem('forito-profile', JSON.stringify({ ...profile }))

				return data
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
				handleErrorResponse(err, { source: 'update-user-birthday' })
			}
		},
		{
			onSuccess: async () => {
				await queryClient.refetchQueries({ queryKey: ['getUserQuery'] })
			},
		}
	)
}
