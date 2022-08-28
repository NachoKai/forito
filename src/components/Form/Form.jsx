import {
	Button,
	Drawer,
	DrawerCloseButton,
	DrawerContent,
	DrawerOverlay,
} from '@chakra-ui/react'
import PropTypes from 'prop-types'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { v4 as uuid } from 'uuid'

import { firebaseApp } from '../../firebaseApp.ts'
import { hideLoading, showLoading } from '../../redux/loading'
import { createPost, setCurrentId, updatePost } from '../../redux/posts'
import { checkEmpty } from '../../utils/checkEmpty.ts'
import { getUserLocalStorage } from '../../utils/getUserLocalStorage.ts'
import showError from '../../utils/showError.ts'
import FormBody from './FormBody'
import FormFooter from './FormFooter'
import FormHeader from './FormHeader'

const initialState = {
	title: '',
	message: '',
	tags: [],
	selectedFile: { url: null, name: null, id: null },
	privacy: 'public',
}

const Form = ({ isOpen, onOpen, onClose }) => {
	const currentId = useSelector(state => state.posts.currentId)
	const btnRef = useRef()
	const dispatch = useDispatch()
	const user = getUserLocalStorage()
	const navigate = useNavigate()
	const [postData, setPostData] = useState(initialState)
	const [images, setImages] = useState([])
	const isSubmitDisabled =
		!(checkEmpty(postData?.title) && checkEmpty(postData?.message)) ||
		![...new Set(postData.tags)].every(tag => /^[a-zA-Z0-9_.-]*$/.test(tag))
	const areValidTags = ![...new Set(postData?.tags)].every(tag =>
		/^[a-zA-Z0-9_.-]*$/.test(tag)
	)
	const post = useSelector(state =>
		currentId ? state.posts?.posts?.find(message => message._id === currentId) : null
	)
	const [privacy, setPrivacy] = useState(post?.privacy)

	const onImageUpload = useCallback(
		async imageList => {
			try {
				dispatch(showLoading())
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
			} catch (error) {
				showError('Something went wrong when trying to upload image. Please try again.')
				console.error(error)
				throw error
			} finally {
				dispatch(hideLoading())
			}
		},
		[dispatch, postData]
	)

	const handlePrivacy = useCallback(
		privacy => {
			setPostData({ ...postData, privacy })
			setPrivacy(privacy)
		},
		[postData]
	)

	const handleClear = useCallback(() => {
		dispatch(setCurrentId(null))
		setImages([])
		setPrivacy('public')
		setPostData(initialState)
	}, [dispatch])

	const handleSubmit = useCallback(
		async e => {
			e.preventDefault()

			try {
				dispatch(showLoading())

				if (postData?.selectedFile?.id) {
					const imageCollectionRef = firebaseApp.firestore().collection('images')

					await imageCollectionRef.doc(postData?.selectedFile?.id).set({
						url: postData?.selectedFile?.url,
						name: postData?.selectedFile?.name,
						id: postData?.selectedFile?.id,
					})
				}

				if (currentId === null) {
					dispatch(
						createPost(
							{
								...postData,
								name: user?.result?.name,
							},
							navigate
						)
					)
				} else {
					dispatch(
						updatePost(currentId, {
							...postData,
							name: user?.result?.name,
						})
					)
				}
				handleClear()
				onClose()
			} catch (error) {
				showError('Something went wrong when trying to submit Post. Please try again.')
				console.error(error)
				throw error
			} finally {
				dispatch(hideLoading())
			}
		},
		[currentId, dispatch, handleClear, navigate, onClose, postData, user?.result?.name]
	)

	const handleChange = useCallback(
		e => setPostData({ ...postData, [e.target.name]: e.target.value }),
		[postData]
	)

	const handleCreatePost = useCallback(() => {
		handleClear()
		onOpen()
	}, [handleClear, onOpen])

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
				display={{ sm: 'none', md: 'flex', lg: 'flex', xl: 'flex' }}
				size='sm'
				onClick={handleCreatePost}
			>
				Create Post
			</Button>
			<Button
				ref={btnRef}
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
				<DrawerOverlay />
				<DrawerContent bg='primary_100_900'>
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

export default Form

Form.propTypes = {
	isOpen: PropTypes.bool,
	onOpen: PropTypes.func,
	onClose: PropTypes.func,
}