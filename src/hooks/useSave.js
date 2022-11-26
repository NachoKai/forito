import { Text, useBoolean } from '@chakra-ui/react'
import React from 'react'

import { usePostsStore } from '../state/postsStore'
import { showError } from '../utils/showError'

export const useSave = id => {
	const { savePost } = usePostsStore()
	const [saveLoading, setSaveLoading] = useBoolean()

	const handleSave = async () => {
		try {
			setSaveLoading.on()
			await savePost(id)
			setSaveLoading.off()
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

	return { handleSave, saveLoading, setSaveLoading }
}
