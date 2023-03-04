import {
	Button,
	Drawer,
	DrawerCloseButton,
	DrawerContent,
	DrawerOverlay,
} from '@chakra-ui/react'
import PropTypes from 'prop-types'
import { useCallback, useEffect, useRef, useState } from 'react'

import { firebaseApp } from '../../firebaseApp'
import { useCreatePost, usePost, useUpdatePost } from '../../hooks/data/posts'
import { useImage } from '../../hooks/useImage'
import { usePrivacy } from '../../hooks/usePrivacy'
import { usePostsStore } from '../../state/postsStore'
import { calculateValidTags } from '../../utils/calculateValidTags'
import { getUserLocalStorage } from '../../utils/getUserLocalStorage'
import { isEmpty } from '../../utils/isEmpty'
import { FormBody } from './FormBody'
import { FormFooter } from './FormFooter'
import { FormHeader } from './FormHeader'

const initialState = {
	title: '',
	message: '',
	tags: [],
	selectedFile: { url: null, name: null, id: null },
	privacy: 'public',
	alt: '',
}

export const Form = ({ isOpen, onOpen, onClose }) => {
	const { currentId, setCurrentId } = usePostsStore()
	const { post } = usePost(currentId)
	const { mutateAsync: createPost } = useCreatePost()
	const { mutateAsync: updatePost } = useUpdatePost()
	const btnRef = useRef()
	const user = getUserLocalStorage()
	const [postData, setPostData] = useState(initialState)
	const areValidTags = calculateValidTags(postData?.tags)
	const isSubmitDisabled =
		isEmpty(postData?.title) || isEmpty(postData?.message) || !areValidTags
	const { privacy, setPrivacy, handlePrivacy } = usePrivacy(postData, setPostData)
	const { onImageUpload, handleRemoveImage, images, setImages } = useImage(
		postData,
		setPostData
	)

	const handleClear = useCallback(() => {
		setCurrentId(null)
		setImages([])
		setPrivacy('public')
		setPostData(initialState)
	}, [setCurrentId, setImages, setPrivacy])

	const handleSubmit = async () => {
		try {
			if (postData?.selectedFile?.id) {
				const imageCollectionRef = firebaseApp
					.firestore()
					.collection(process.env.REACT_APP_IMAGE_COLLECTION_NAME)

				await imageCollectionRef.doc(postData?.selectedFile?.id).set({
					url: postData?.selectedFile?.url,
					name: postData?.selectedFile?.name,
					id: postData?.selectedFile?.id,
				})
			}

			const newPost = {
				...postData,
				name: user?.result?.name,
			}

			if (currentId === null) {
				createPost(newPost)
			} else {
				updatePost({ id: currentId, post: newPost })
			}

			handleClear()
			onClose()
		} catch (err) {
			console.error(err)
			throw err
		}
	}

	const handleChange = useCallback(
		e => {
			setPostData({ ...postData, [e.target.name]: e.target.value })
		},
		[postData]
	)

	const handleCreatePost = () => {
		handleClear()
		onOpen()
	}

	useEffect(() => {
		if (!post) return

		setImages(post?.selectedFile?.url ? [{ data_url: post?.selectedFile?.url }] : [])
		setPrivacy(post?.privacy)
		setPostData(post)
	}, [post, setImages, setPrivacy])

	if (!user?.result?.name) return null

	return (
		<>
			<Button
				ref={btnRef}
				className='button'
				display={{ sm: 'none', md: 'flex', lg: 'flex', xl: 'flex' }}
				size='sm'
				onClick={handleCreatePost}
			>
				Create Post
			</Button>
			<Button
				ref={btnRef}
				className='button'
				display={{ sm: 'flex', md: 'none', lg: 'none', xl: 'none' }}
				size='sm'
				onClick={handleCreatePost}
			>
				Create
			</Button>
			<Drawer
				finalFocusRef={btnRef}
				isOpen={isOpen}
				placement='right'
				size='md'
				onClose={onClose}
			>
				<DrawerOverlay backdropFilter='blur(10px)' bg='blackAlpha.300' />
				<DrawerContent bg='primary_100_900' className='form'>
					<DrawerCloseButton />
					<FormHeader currentId={currentId} />

					<FormBody
						areValidTags={areValidTags}
						handleChange={handleChange}
						handlePrivacy={handlePrivacy}
						handleRemoveImage={handleRemoveImage}
						images={images}
						postData={postData}
						privacy={privacy}
						setPostData={setPostData}
						onImageUpload={onImageUpload}
					/>

					<FormFooter
						handleClear={handleClear}
						handleSubmit={handleSubmit}
						isSubmitDisabled={isSubmitDisabled}
					/>
				</DrawerContent>
			</Drawer>
		</>
	)
}

Form.propTypes = {
	isOpen: PropTypes.bool,
	onOpen: PropTypes.func,
	onClose: PropTypes.func,
}
