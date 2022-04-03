import { useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
	Button,
	Drawer,
	DrawerBody,
	DrawerCloseButton,
	DrawerContent,
	DrawerFooter,
	DrawerHeader,
	DrawerOverlay,
	Flex,
	Image,
	Radio,
	RadioGroup,
	Stack,
	Text,
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import ImageUploading from 'react-images-uploading'

import { firebaseApp } from '../firebaseApp'
import { createPost, setCurrentId, updatePost } from '../redux/posts'
import FormInput from './common/FormInput'
import FormTextArea from './common/FormTextArea'
import { getUserLocalStorage } from '../utils/getUserLocalStorage'
import showError from '../utils/showError'
import { CreateGradColor } from '../theme'
import { checkEmpty } from '../utils/checkEmpty'
import { hideLoading, showLoading } from '../redux/loading'
import { getRandomId } from '../utils/getRandomId'

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
	const areValidTags = ![...new Set(postData.tags)].every(tag =>
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

				const imageFile = imageList && imageList[0]?.file
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
						id: postData?.selectedFile?.id ? postData?.selectedFile?.id : getRandomId(),
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
				colorScheme='primary'
				display={{
					sm: 'none',
					md: 'flex',
					lg: 'flex',
					xl: 'flex',
				}}
				onClick={handleCreatePost}
			>
				Create Post
			</Button>
			<Button
				ref={btnRef}
				colorScheme='primary'
				display={{
					sm: 'flex',
					md: 'none',
					lg: 'none',
					xl: 'none',
				}}
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
					<DrawerHeader>
						<Text
							bgClip='text'
							bgGradient={CreateGradColor('primary', 700, 900, 50, 200)}
							fontSize='xl'
							fontWeight='bold'
						>
							{currentId ? 'Edit' : 'Create'} Post ✏️
						</Text>
					</DrawerHeader>

					<DrawerBody>
						<form noValidate autoComplete='off' style={{ width: '100%' }}>
							<Stack spacing='4'>
								<FormInput
									isRequired
									dataCy='form-title'
									label='Title'
									maxLength='105'
									name='title'
									tooltip='Required'
									value={postData?.title}
									onChange={handleChange}
								/>

								<FormTextArea
									isRequired
									dataCy='form-message'
									label='Message'
									maxLength='27440'
									name='message'
									tooltip='Required'
									value={postData?.message}
									onChange={handleChange}
								/>

								<FormInput
									dataCy='form-tags'
									helper='Separated by commas.'
									isInvalid={areValidTags}
									label='Tags'
									maxLength='55'
									name='tags'
									validation={areValidTags && 'Insert only letters and numbers.'}
									value={[...new Set(postData?.tags)]}
									onChange={e => {
										setPostData({
											...postData,
											tags: e.target.value.toLowerCase().trim().split(','),
										})
									}}
								/>

								<FormInput
									child={
										<ImageUploading
											acceptType={['jpg', 'jpeg', 'gif', 'png']}
											dataURLKey='data_url'
											maxFileSize={1024 * 1024 * 2.1}
											maxNumber={1}
											value={images}
											onChange={onImageUpload}
											onError={() =>
												showError(
													'Something went wrong when trying to upload image. Please try again.'
												)
											}
										>
											{({
												imageList,
												onImageUpload,
												onImageUpdate,
												isDragging,
												dragProps,
												errors,
											}) => (
												<Stack className='upload__image-wrapper' spacing='2'>
													{errors && (
														<Stack m='4px 0' spacing='2'>
															{errors.maxNumber && (
																<Flex
																	color='red.400'
																	fontWeight='bold'
																	marginBottom='4px'
																>
																	Number of selected images exceed maxNumber.
																</Flex>
															)}
															{errors.acceptType && (
																<Flex
																	color='red.400'
																	fontWeight='bold'
																	marginBottom='4px'
																>
																	Your selected file type is not allow.
																</Flex>
															)}
															{errors.maxFileSize && (
																<Flex
																	color='red.400'
																	fontWeight='bold'
																	marginBottom='4px'
																>
																	Selected file size exceed maxFileSize.
																</Flex>
															)}
															{errors.resolution && (
																<Flex
																	color='red.400'
																	fontWeight='bold'
																	marginBottom='4px'
																>
																	Selected file is not match your desired resolution.
																</Flex>
															)}
														</Stack>
													)}
													{(!postData?.selectedFile?.url || !images.length) && (
														<Stack
															borderColor={
																isDragging ? 'gray_700_200' : 'primary_600_100'
															}
															borderRadius='lg'
															borderStyle='dashed'
															borderWidth='2px'
														>
															<Button
																bg={isDragging ? 'gray_200_700' : undefined}
																color={isDragging ? 'gray_700_200' : 'primary_600_100'}
																variant='ghost'
																onClick={onImageUpload}
																{...dragProps}
																p={{
																	sm: '6',
																	md: '8',
																	lg: '8',
																	xl: '8',
																}}
															>
																Click or drag & drop image here
															</Button>
														</Stack>
													)}
													{imageList?.map((image, index) => (
														<Stack
															key={index}
															className='image-item'
															direction='row'
															spacing='2'
														>
															<Image
																alt=''
																h='100px'
																objectFit='contain'
																src={image?.data_url}
																w='100px'
															/>
															<Flex align='center' direction='column' justify='center'>
																<Button
																	colorScheme='primary'
																	variant='ghost'
																	onClick={() => onImageUpdate(index)}
																>
																	Update
																</Button>
																<Button
																	colorScheme='primary'
																	variant='ghost'
																	onClick={() => {
																		setPostData({
																			...postData,
																			selectedFile: {
																				url: null,
																				name: null,
																				id: null,
																			},
																		})
																		setImages([])
																	}}
																>
																	Remove
																</Button>
															</Flex>
														</Stack>
													))}
												</Stack>
											)}
										</ImageUploading>
									}
									helper='Max: 2mb. Formats: jpg, jpeg, png, gif.'
									label='Upload image'
								/>

								<FormInput
									isRequired
									child={
										<RadioGroup
											defaultValue='public'
											name='privacy'
											value={privacy}
											onChange={privacy => handlePrivacy(privacy)}
										>
											<Stack direction='row'>
												<Radio colorScheme='primary' value='public'>
													Public
												</Radio>
												<Radio colorScheme='primary' value='private'>
													Private
												</Radio>
											</Stack>
										</RadioGroup>
									}
									label='Privacy'
									name='privacy'
									tooltip='Private Posts will only be visible to their creator'
								/>
							</Stack>
						</form>
					</DrawerBody>

					<DrawerFooter w='100%'>
						<Stack spacing='4' w='100%'>
							<Button
								bgGradient={CreateGradColor('primary', 400, 800, 100, 400)}
								boxShadow='blue'
								colorScheme='primary'
								data-cy='form-submit-button'
								disabled={
									!(checkEmpty(postData?.title) && checkEmpty(postData?.message)) ||
									![...new Set(postData.tags)].every(tag => /^[a-zA-Z0-9_.-]*$/.test(tag))
								}
								onClick={handleSubmit}
							>
								Submit
							</Button>
							<Button
								colorScheme='primary'
								data-cy='form-clear-button'
								variant='outline'
								onClick={handleClear}
							>
								Clear
							</Button>
						</Stack>
					</DrawerFooter>
				</DrawerContent>
			</Drawer>
		</>
	)
}

export default Form
