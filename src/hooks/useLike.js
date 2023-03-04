import PropTypes from 'prop-types'
import { v4 as uuid } from 'uuid'

import { getUserLocalStorage } from '../utils/getUserLocalStorage'
import { useAddNotification } from './data/auth'
import { useLikePost } from './data/posts'
import { showError } from '../utils/showError'

export const useLike = (id, creator, isPostCreator, hasUserLike) => {
	const { mutateAsync: likePost, isLoading } = useLikePost()
	const { mutateAsync: addNotification } = useAddNotification()
	const user = getUserLocalStorage()
	const userName = user?.result?.name

	const handleLike = async () => {
		try {
			await likePost(id)

			if (!isPostCreator && !hasUserLike) {
				await addNotification({
					userId: creator,
					notification: {
						_id: uuid(),
						postId: id,
						read: false,
						username: userName,
						type: 'like',
						createdAt: new Date().toISOString(),
					},
				})
			}
		} catch (err) {
			showError('Something went wrong when trying to like post. Please try again.')
			console.error(err)
			throw err
		}
	}

	return { handleLike, likeLoading: isLoading }
}

useLike.propTypes = {
	id: PropTypes.string,
	creator: PropTypes.string,
	isPostCreator: PropTypes.bool,
	hasUserLike: PropTypes.bool,
}
