import { Text } from '@chakra-ui/react'
// import { v4 as uuid } from 'uuid'

import { showError } from '../utils/showError'
import { useSavePost } from './data/posts'
// import { useUpdateNotification } from './data/auth'
// import { getUserLocalStorage } from '../utils/getUserLocalStorage'

export const useSave = id => {
	const { mutateAsync: savePost, isLoading } = useSavePost()
	// const { mutateAsync: updateNotification } = useUpdateNotification()
	// const user = getUserLocalStorage()
	// const userId = user?.result?.googleId || user?.result?._id
	// const userName = user?.result?.name

	const handleSave = async () => {
		try {
			await savePost(id)
			// await updateNotification({
			// 	userId,
			// 	notification: {
			// 		_id: uuid(),
			// 		postId: id,
			// 		read: false,
			// 		username: userName,
			// 		type: 'save',
			// 		createdAt: new Date().toISOString(),
			// 	},
			// })
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
