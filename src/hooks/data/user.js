import { Text } from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'

import { fetchUser } from '../../clients/userClients'
import { showError } from '../../utils/showError.ts'
import { handleErrorResponse, retry } from './utils'

export const useGetUser = id => {
	const query = useQuery(
		['user', id],
		async () => {
			try {
				const user = await fetchUser(id)

				if (!user) return []

				return user
			} catch (err) {
				showError(
					<>
						<Text fontWeight='bold'>{err.name}</Text>
						<Text>Something went wrong when trying to get user. {err.message}</Text>
						<Text>Please try again.</Text>
					</>
				)
				handleErrorResponse(err, { source: 'user' })
			}
		},
		{
			retry,
			staleTime: 60 * 1000,
		}
	)

	return {
		...query,
		user: query?.data?.data?.data || [],
		refetch: async () => {
			await query.refetch()
		},
	}
}
