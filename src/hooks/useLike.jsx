import { Text, useBoolean } from '@chakra-ui/react'
import React from 'react'

import { usePostsStore } from '../state/postsStore'
import { showError } from '../utils/showError'

export const useLike = id => {
	const { likePost } = usePostsStore()
	const [likeLoading, setLikeLoading] = useBoolean()

	const handleLike = async () => {
		try {
			setLikeLoading.on()
			await likePost(id)
			setLikeLoading.off()
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

	return { handleLike, likeLoading, setLikeLoading }
}
