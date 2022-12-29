import { Text } from '@chakra-ui/react'
import { v4 as uuid } from 'uuid'
import PropTypes from 'prop-types'

import { showError } from '../utils/showError'
import { useSavePost } from './data/posts'
import { useAddNotification } from './data/auth'
import { getUserLocalStorage } from '../utils/getUserLocalStorage'

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
			showError(
				<>
					<Text fontWeight='bold'>{err.name}</Text>
					<Text>Something went wrong when trying to save post. {err.message}</Text>
					<Text>Please try again.</Text>
				</>
			)
			console.error(err)
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
