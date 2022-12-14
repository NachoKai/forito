import { Text } from '@chakra-ui/react'

import { showError } from '../utils/showError'
import { useSavePost } from './data/posts'

export const useSave = id => {
	const { mutateAsync: savePost, isLoading } = useSavePost()

	const handleSave = async () => {
		try {
			await savePost(id)
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
