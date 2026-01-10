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
import { NotificationI } from '../../types'
import { showError } from '../../utils/showError'

interface LoginFormData {
	email: string
	password: string
}

interface SignupFormData {
	firstName: string
	lastName: string
	email: string
	password: string
	confirmPassword: string
}

interface GoogleLoginData {
	result?: {
		googleId?: string
		email?: string
		name?: string
		imageUrl?: string
	}
	token?: string
}

interface UpdateNameParams {
	userId: string
	firstName: string
	lastName: string
}

interface UpdateEmailParams {
	userId: string
	email: string
}

interface UpdateBirthdayParams {
	userId: string
	birthday: string
}

interface AddNotificationParams {
	userId: string
	notification: NotificationI
}

interface UpdateNotificationsParams {
	userId: string
	notifications: NotificationI[]
}

export const useLogin = () => {
	return useMutation({
		mutationFn: async (formData: LoginFormData) => {
			try {
				const { data } = await login(formData)

				localStorage.setItem('forito-profile', JSON.stringify({ ...data }))
			} catch (err) {
				showError('Something went wrong when trying to log in. Please try again.')
				console.error(err)
				throw err
			}
		},
	})
}

export const useLogout = () => {
	return useMutation({
		mutationFn: async () => {
			try {
				localStorage.removeItem('forito-profile')
				localStorage.removeItem('forito-theme')
			} catch (err) {
				console.error(err)
				throw err
			}
		},
		onError: () => {
			showError('Something went wrong when trying to log out. Please try again.')
		},
	})
}

export const useSignup = () => {
	return useMutation({
		mutationFn: async (formData: SignupFormData) => {
			try {
				const { data } = await signup(formData)

				localStorage.setItem('forito-profile', JSON.stringify({ ...data }))
			} catch (err) {
				console.error(err)
				throw err
			}
		},
		onError: () => {
			showError('Something went wrong when trying to sign up. Please try again.')
		},
	})
}

export const useGetUser = (id: string) => {
	const getUserQuery = useQuery({
		queryKey: ['getUserQuery'],
		queryFn: async () => {
			try {
				const { data } = await getUser(id)

				return data
			} catch (err) {
				console.error(err)
				throw err
			}
		},
		enabled: !!id,
		onError: () => {
			showError('Something went wrong when trying to get user. Please try again.')
		},
	})

	return {
		...getUserQuery,
		user: getUserQuery?.data,
	}
}

export const useGoogleLogin = () => {
	return useMutation({
		mutationFn: async (formData: GoogleLoginData) => {
			try {
				localStorage.setItem('forito-profile', JSON.stringify({ ...formData }))
			} catch (err) {
				console.error(err)
				throw err
			}
		},
		onError: () => {
			showError(
				'Something went wrong when trying to login with Google. Please try again.'
			)
		},
	})
}

export const useUpdateUserName = () => {
	return useMutation({
		mutationFn: async ({ userId, firstName, lastName }: UpdateNameParams) => {
			try {
				const { data } = await updateName(userId, { firstName, lastName })
				const profile = JSON.parse(localStorage.getItem('forito-profile') || '{}')

				profile.result.name = lastName ? `${firstName} ${lastName}` : firstName
				localStorage.setItem('forito-profile', JSON.stringify({ ...profile }))

				return data
			} catch (err) {
				console.error(err)
				throw err
			}
		},
		onError: () => {
			showError('Something went wrong when trying to update your name. Please try again.')
		},
	})
}

export const useUpdateUserEmail = () => {
	return useMutation({
		mutationFn: async ({ userId, email }: UpdateEmailParams) => {
			try {
				const { data } = await updateEmail(userId, { email })
				const profile = JSON.parse(localStorage.getItem('forito-profile') || '{}')

				profile.result.email = email
				localStorage.setItem('forito-profile', JSON.stringify({ ...profile }))

				return data
			} catch (err) {
				console.error(err)
				throw err
			}
		},
		onError: () => {
			showError(
				'Something went wrong when trying to update your email. Please try again.'
			)
		},
	})
}

export const useUpdateUserBirthday = () => {
	return useMutation({
		mutationFn: async ({ userId, birthday }: UpdateBirthdayParams) => {
			try {
				const { data } = await updateBirthday(userId, { birthday })
				const profile = JSON.parse(localStorage.getItem('forito-profile') || '{}')

				profile.result.birthday = birthday
				localStorage.setItem('forito-profile', JSON.stringify({ ...profile }))

				return data
			} catch (err) {
				console.error(err)
				throw err
			}
		},
		onError: () => {
			showError(
				'Something went wrong when trying to update your birthday. Please try again.'
			)
		},
	})
}

export const useNotifications = (userId: string) => {
	const notificationsQuery = useQuery({
		queryKey: ['notificationsQuery'],
		queryFn: async () => {
			try {
				const { data } = await getNotifications(userId)

				return data
			} catch (err) {
				console.error(err)
				throw err
			}
		},
		enabled: !!userId,
		onError: () => {
			showError(
				'Something went wrong when trying to get notifications. Please try again.'
			)
		},
	})

	return {
		...notificationsQuery,
		notifications: notificationsQuery?.data,
		count: notificationsQuery?.data?.length,
		readCount: notificationsQuery?.data?.filter(
			(notification: NotificationI) => notification.read
		).length,
		notReadCount: notificationsQuery?.data?.filter(
			(notification: NotificationI) => !notification.read
		).length,
	}
}

export const useAddNotification = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async ({ userId, notification }: AddNotificationParams) => {
			try {
				const { data } = await addNotification(userId, notification)

				return data
			} catch (err) {
				console.error(err)
				throw err
			}
		},
		onSuccess: async () => {
			await queryClient.refetchQueries({ queryKey: ['notificationsQuery'] })
		},
		onError: () => {
			showError('Something went wrong when trying to add notification. Please try again.')
		},
	})
}

export const useUpdateNotifications = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async ({ userId, notifications }: UpdateNotificationsParams) => {
			try {
				const { data } = await updateNotifications(userId, notifications)

				return data
			} catch (err) {
				console.error(err)
				throw err
			}
		},
		onSuccess: async () => {
			await queryClient.refetchQueries({ queryKey: ['notificationsQuery'] })
		},
		onError: () => {
			showError(
				'Something went wrong when trying to update notifications. Please try again.'
			)
		},
	})
}
