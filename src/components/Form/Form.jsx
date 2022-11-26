import {
	Button,
	Drawer,
	DrawerCloseButton,
	DrawerContent,
	DrawerOverlay,
	Text,
} from '@chakra-ui/react'
import PropTypes from 'prop-types'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { firebaseApp } from '../../firebaseApp'
import { useImage } from '../../hooks/useImage'
import { usePostsStore } from '../../state/postsStore'
import { checkEmpty } from '../../utils/checkEmpty'
import { getUserLocalStorage } from '../../utils/getUserLocalStorage'
import { showError } from '../../utils/showError'
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

const regEx = /^[a-zA-Z0-9_.-]*$/

export const Form = ({ isOpen, onOpen, onClose }) => {
	const navigate = useNavigate()
	const {
		posts,
		currentId,
		setCurrentId,
		createPost,
		updatePost,
		showLoading,
		hideLoading,
	} = usePostsStore()
	const btnRef = useRef()
	const user = getUserLocalStorage()
	const [postData, setPostData] = useState(initialState)
	const isSubmitDisabled =
		!(checkEmpty(postData?.title) && checkEmpty(postData?.message)) ||
		![...new Set(postData.tags)].every(tag => regEx.test(tag))
	const areValidTags = ![...new Set(postData?.tags)].every(tag => regEx.test(tag))
	const post = currentId ? posts?.find(message => message._id === currentId) : null
	const [privacy, setPrivacy] = useState(post?.privacy)
	const { onImageUpload, handleRemoveImage, images, setImages } = useImage(
		postData,
		setPostData
	)

	const handlePrivacy = privacy => {
		setPostData({ ...postData, privacy })
		setPrivacy(privacy)
	}

	const handleClear = useCallback(() => {
		setCurrentId(null)
		setImages([])
		setPrivacy('public')
		setPostData(initialState)
	}, [setCurrentId, setImages])

	const handleSubmit = async () => {
		try {
			showLoading()

			if (postData?.selectedFile?.id) {
				const imageCollectionRef = firebaseApp.firestore().collection('images')

				await imageCollectionRef.doc(postData?.selectedFile?.id).set({
					url: postData?.selectedFile?.url,
					name: postData?.selectedFile?.name,
					id: postData?.selectedFile?.id,
				})
			}

			if (currentId === null) {
				createPost(
					{
						...postData,
						name: user?.result?.name,
					},
					navigate
				)
			} else {
				updatePost(currentId, {
					...postData,
					name: user?.result?.name,
				})
			}
			handleClear()
			onClose()
		} catch (err) {
			showError(
				<>
					<Text fontWeight='bold'>{err.name}</Text>
					<Text>Something went wrong when trying to submit post. {err.message}</Text>
					<Text>Please try again.</Text>
				</>
			)
			console.error(err)
			throw err
		} finally {
			hideLoading()
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
	}, [post, setImages])

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
