import PropTypes from 'prop-types'
import { v4 as uuid } from 'uuid'

import { getUserLocalStorage } from '../utils/getUserLocalStorage'
import { useAddNotification } from './data/auth'
import { useSavePost } from './data/posts'
import { showError } from '../utils/showError'

export const useSave = (id, creator, isPostCreator, hasUserLike) => {
	const { mutateAsync: savePost, isLoading } = useSavePost()
	const { mutateAsync: addNotification } = useAddNotification()
	const user = getUserLocalStorage()
	const userName = user?.result?.name

	const handleSave = async () => {
		try {
			await savePost(id)

			if (!isPostCreator && !hasUserLike) {
				await addNotification({
					userId: creator,
					notification: {
						_id: uuid(),
						postId: id,
						read: false,
						username: userName,
						type: 'save',
						createdAt: new Date().toISOString(),
					},
				})
			}
		} catch (err) {
			showError('Something went wrong when trying to save post. Please try again.')
			console.error(err)
			throw err
		}
	}

	return { handleSave, saveLoading: isLoading }
}

useSave.propTypes = {
	id: PropTypes.string,
	creator: PropTypes.string,
	isPostCreator: PropTypes.bool,
	hasUserLike: PropTypes.bool,
}
