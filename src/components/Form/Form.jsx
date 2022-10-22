import {
	Button,
	Drawer,
	DrawerCloseButton,
	DrawerContent,
	DrawerOverlay,
} from '@chakra-ui/react'
import PropTypes from 'prop-types'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { v4 as uuid } from 'uuid'

import { firebaseApp } from '../../firebaseApp'
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

export const Form = ({ isOpen, onOpen, onClose }) => {
	const navigate = useNavigate()
	const { currentId, setCurrentId, createPost, updatePost, showLoading, hideLoading } =
		usePostsStore()
	const btnRef = useRef()
	const user = getUserLocalStorage()
	const [postData, setPostData] = useState(initialState)
	const [images, setImages] = useState([])

	const isSubmitDisabled = useMemo(
		() =>
			!(checkEmpty(postData?.title) && checkEmpty(postData?.message)) ||
			![...new Set(postData.tags)].every(tag => /^[a-zA-Z0-9_.-]*$/.test(tag)),
		[postData?.message, postData.tags, postData?.title]
	)

	const areValidTags = useMemo(
		() => ![...new Set(postData?.tags)].every(tag => /^[a-zA-Z0-9_.-]*$/.test(tag)),
		[postData?.tags]
	)

	const post = usePostsStore(state =>
		currentId ? state.posts?.find(message => message._id === currentId) : null
	)
	const [privacy, setPrivacy] = useState(post?.privacy)

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

	const handlePrivacy = privacy => {
		setPostData({ ...postData, privacy })
		setPrivacy(privacy)
	}

	const handleClear = useCallback(() => {
		setCurrentId(null)
		setImages([])
		setPrivacy('public')
		setPostData(initialState)
	}, [setCurrentId])

	const handleSubmit = async e => {
		e.preventDefault()
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
			showError('Something went wrong when trying to submit Post. Please try again.')
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

	useEffect(() => {
		if (post) {
			setImages(post?.selectedFile?.url ? [{ data_url: post?.selectedFile?.url }] : [])
			setPrivacy(post?.privacy)
			setPostData(post)
		}
	}, [post])

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
