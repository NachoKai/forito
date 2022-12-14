import { Text } from '@chakra-ui/react'

import { showError } from '../utils/showError'
import { useLikePost } from './data/posts'

export const useLike = id => {
	const { mutateAsync: likePost, isLoading } = useLikePost()

	const handleLike = async () => {
		try {
			await likePost(id)
		} catch (err) {
			showError(
				<>
					<Text fontWeight='bold'>{err.name}</Text>
					<Text>Something went wrong when trying to like post. {err.message}</Text>
					<Text>Please try again.</Text>
				</>
			)
			console.error(err)
		}
	}

	return { handleLike, likeLoading: isLoading }
}
