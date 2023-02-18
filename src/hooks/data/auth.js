import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import {
	addNotification,
	getNotifications,
	getUser,
	login,
	signup,
	updateBirthday,
	updateEmail,
	updateName,
	updateNotifications,
} from '../../clients/userClients'
import { showError } from '../../utils/showError'

export const useLogin = () => {
	return useMutation(
		async formData => {
			try {
				const { data } = await login(formData)

				localStorage.setItem('forito-profile', JSON.stringify({ ...data }))
			} catch (err) {
				console.error(err)
			}
		},
		{
			onError: () => {
				showError('Something went wrong when trying to log in. Please try again.')
			},
		}
	)
}

export const useLogout = () => {
	return useMutation(
		async () => {
			try {
				localStorage.removeItem('forito-profile')
				localStorage.removeItem('forito-theme')
			} catch (err) {
				console.error(err)
			}
		},
		{
			onError: () => {
				showError('Something went wrong when trying to log out. Please try again.')
			},
		}
	)
}

export const useSignup = () => {
	return useMutation(
		async formData => {
			try {
				const { data } = await signup(formData)

				localStorage.setItem('forito-profile', JSON.stringify({ ...data }))
			} catch (err) {
				console.error(err)
			}
		},
		{
			onError: () => {
				showError('Something went wrong when trying to sign up. Please try again.')
			},
		}
	)
}

export const useGetUser = id => {
	const getUserQuery = useQuery(
		['getUserQuery'],
		async () => {
			try {
				const { data } = await getUser(id)

				return data
			} catch (err) {
				console.error(err)
			}
		},
		{
			enabled: !!id,
			onError: () => {
				showError('Something went wrong when trying to get user. Please try again.')
			},
		}
	)

	return {
		...getUserQuery,
		user: getUserQuery?.data,
	}
}

export const useGoogleLogin = () => {
	return useMutation(
		async formData => {
			try {
				localStorage.setItem('forito-profile', JSON.stringify({ ...formData }))
			} catch (err) {
				console.error(err)
			}
		},
		{
			onError: () => {
				showError(
					'Something went wrong when trying to login with Google. Please try again.'
				)
			},
		}
	)
}

export const useUpdateUserName = () => {
	return useMutation(
		async ({ userId, firstName, lastName }) => {
			try {
				const { data } = await updateName(userId, { firstName, lastName })
				const profile = JSON.parse(localStorage.getItem('forito-profile'))

				profile.result.name = lastName ? `${firstName} ${lastName}` : firstName
				localStorage.setItem('forito-profile', JSON.stringify({ ...profile }))

				return data
			} catch (err) {
				console.error(err)
			}
		},
		{
			onError: () => {
				showError(
					'Something went wrong when trying to update your name. Please try again.'
				)
			},
		}
	)
}

export const useUpdateUserEmail = () => {
	return useMutation(
		async ({ userId, email }) => {
			try {
				const { data } = await updateEmail(userId, { email })
				const profile = JSON.parse(localStorage.getItem('forito-profile'))

				profile.result.email = email
				localStorage.setItem('forito-profile', JSON.stringify({ ...profile }))

				return data
			} catch (err) {
				console.error(err)
			}
		},
		{
			onError: () => {
				showError(
					'Something went wrong when trying to update your email. Please try again.'
				)
			},
		}
	)
}

export const useUpdateUserBirthday = () => {
	return useMutation(
		async ({ userId, birthday }) => {
			try {
				const { data } = await updateBirthday(userId, { birthday })
				const profile = JSON.parse(localStorage.getItem('forito-profile'))

				profile.result.birthday = birthday
				localStorage.setItem('forito-profile', JSON.stringify({ ...profile }))

				return data
			} catch (err) {
				console.error(err)
			}
		},
		{
			onError: () => {
				showError(
					'Something went wrong when trying to update your birthday. Please try again.'
				)
			},
		}
	)
}

export const useNotifications = userId => {
	const notificationsQuery = useQuery(
		['notificationsQuery'],
		async () => {
			try {
				const { data } = await getNotifications(userId)

				return data
			} catch (err) {
				console.error(err)
			}
		},
		{
			enabled: !!userId,
			onError: () => {
				showError(
					'Something went wrong when trying to get notifications. Please try again.'
				)
			},
		}
	)

	return {
		...notificationsQuery,
		notifications: notificationsQuery?.data,
		count: notificationsQuery?.data?.length,
		readCount: notificationsQuery?.data?.filter(notification => notification.read).length,
		notReadCount: notificationsQuery?.data?.filter(notification => !notification.read)
			.length,
	}
}

export const useAddNotification = () => {
	const queryClient = useQueryClient()

	return useMutation(
		async ({ userId, notification }) => {
			try {
				const { data } = await addNotification(userId, notification)

				return data
			} catch (err) {
				console.error(err)
			}
		},
		{
			onSuccess: async () => {
				await queryClient.refetchQueries({ queryKey: ['notificationsQuery'] })
			},
			onError: () => {
				showError(
					'Something went wrong when trying to add notification. Please try again.'
				)
			},
		}
	)
}

export const useUpdateNotifications = () => {
	const queryClient = useQueryClient()

	return useMutation(
		async ({ userId, notifications }) => {
			try {
				const { data } = await updateNotifications(userId, notifications)

				return data
			} catch (err) {
				console.error(err)
			}
		},
		{
			onSuccess: async () => {
				await queryClient.refetchQueries({ queryKey: ['notificationsQuery'] })
			},
			onError: () => {
				showError(
					'Something went wrong when trying to update notifications. Please try again.'
				)
			},
		}
	)
}
