import { useState } from 'react'
import { v4 as uuid } from 'uuid'

import { firebaseApp } from '../firebaseApp'
import { usePostsStore } from '../state/postsStore'
import { showError } from '../utils/showError'

export const useImage = (postData, setPostData) => {
	const [images, setImages] = useState([])
	const { showLoading, hideLoading } = usePostsStore()

	const onImageUpload = async imageList => {
		try {
			showLoading()
			setImages(imageList)

			const imageFile = imageList?.[0]?.file
			const imageName = imageFile ? imageFile.name : ''
			const storageRef = firebaseApp.storage().ref()
			const imagePath = storageRef.child(imageFile?.name)

			await imagePath.put(imageFile)
			const imageURL = imagePath ? await imagePath.getDownloadURL() : ''

			setPostData({
				...postData,
				selectedFile: {
					url: imageURL,
					name: imageName,
					id: postData?.selectedFile?.id ? postData?.selectedFile?.id : uuid(),
				},
			})
		} catch (err) {
			showError('Something went wrong when trying to upload image. Please try again.')
			console.error(err)
			throw err
		} finally {
			hideLoading()
		}
	}

	const handleRemoveImage = () => {
		setPostData({
			...postData,
			selectedFile: {
				url: null,
				name: null,
				id: null,
			},
		})
		setImages([])
	}

	return { onImageUpload, handleRemoveImage, images, setImages }
}
