import { useCallback, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Button, Flex, Image, Stack, Text } from "@chakra-ui/react"
import { FaExclamationCircle } from "react-icons/fa"
import { useHistory } from "react-router-dom"
import ImageUploading from "react-images-uploading"

import { createPost, updatePost } from "../redux/posts"
import FormInput from "./common/FormInput"
import FormTextArea from "./common/FormTextArea"
import { getUser } from "../utils/getUser"
import showError from "../utils/showError"
import { CreateColor, CreateGradColor } from "../theme"
import { checkEmpty } from "../utils/checkEmpty"

const initialState = {
	title: "",
	message: "",
	tags: [],
	selectedFile: "",
}

const Form = ({ currentId, setCurrentId }) => {
	const dispatch = useDispatch()
	const user = getUser()
	const history = useHistory()
	const [postData, setPostData] = useState(initialState)
	const [images, setImages] = useState([])
	const areValidTags = ![...new Set(postData.tags)].every(tag =>
		/^[a-zA-Z0-9_.-]*$/.test(tag)
	)

	const post = useSelector(state =>
		currentId ? state.posts?.posts?.find(message => message._id === currentId) : null
	)

	const onImageUpload = useCallback(
		imageList => {
			setPostData({ ...postData, selectedFile: imageList && imageList[0]?.data_url })
			setImages(imageList)
		},
		[postData]
	)

	const handleClear = useCallback(() => {
		setCurrentId(0)
		setImages([])
		setPostData(initialState)
	}, [setCurrentId])

	const handleSubmit = useCallback(
		e => {
			e.preventDefault()

			if (currentId === 0) {
				dispatch(createPost({ ...postData, name: user?.result?.name }, history))
			} else {
				dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }))
			}
			handleClear()
		},
		[currentId, dispatch, handleClear, history, postData, user]
	)

	const handleChange = useCallback(
		e => {
			setPostData({ ...postData, [e.target.name]: e.target.value })
		},
		[postData]
	)

	useEffect(() => {
		if (post) setPostData(post)
	}, [post])

	if (!user?.result?.name) {
		return (
			<Stack
				align="center"
				color={CreateColor("primary", 600, 100)}
				direction="column"
				minWidth="320px"
				p="8"
				spacing="4"
			>
				<Text fontSize="4xl" fontWeight="bold">
					<FaExclamationCircle />
				</Text>
				<Text fontSize="lg" fontWeight="bold">
					Please login to create a Post.
				</Text>
			</Stack>
		)
	}

	return (
		<Flex minWidth="320px" w="100%">
			<form
				noValidate
				autoComplete="off"
				style={{ width: "100%" }}
				onSubmit={handleSubmit}
			>
				<Stack
					bgGradient={CreateGradColor("primary", 100, 50, 900, 600, "135deg")}
					borderRadius="lg"
					boxShadow="md"
					p="8"
					spacing="4"
				>
					<Text
						bgClip="text"
						bgGradient={CreateGradColor("primary", 700, 900, 50, 200)}
						fontSize="xl"
						fontWeight="bold"
					>
						{currentId ? "Edit" : "Create"} Post ✏️
					</Text>
					<FormInput
						isRequired
						label="Title"
						maxLength="105"
						name="title"
						tooltip="Required"
						value={postData.title}
						onChange={handleChange}
					/>
					<FormTextArea
						isRequired
						label="Message"
						maxLength="5000"
						name="message"
						tooltip="Required"
						value={postData.message}
						onChange={handleChange}
					/>
					<FormInput
						helper="Separated by commas."
						isInvalid={areValidTags}
						label="Tags"
						maxLength="55"
						name="tags"
						validation={areValidTags && "Insert only letters and numbers."}
						value={[...new Set(postData.tags)]}
						onChange={e => {
							setPostData({
								...postData,
								tags: e.target.value.trim().split(","),
							})
						}}
					/>
					<FormInput
						child={
							<ImageUploading
								acceptType={["jpg", "jpeg", "gif", "png"]}
								dataURLKey="data_url"
								maxFileSize={1024 * 1024 * 5.1}
								maxNumber={1}
								value={images}
								onChange={onImageUpload}
								onError={() =>
									showError(
										"Something went wrong when trying to upload image. Please try again."
									)
								}
							>
								{({
									imageList,
									onImageUpload,
									onImageUpdate,
									onImageRemove,
									isDragging,
									dragProps,
									errors,
								}) => (
									<Stack className="upload__image-wrapper" spacing="2">
										{errors && (
											<Stack m="4px 0" spacing="2">
												{errors.maxNumber && (
													<Flex color="red.400" fontWeight="bold" marginBottom="4px">
														Number of selected images exceed maxNumber.
													</Flex>
												)}
												{errors.acceptType && (
													<Flex color="red.400" fontWeight="bold" marginBottom="4px">
														Your selected file type is not allow.
													</Flex>
												)}
												{errors.maxFileSize && (
													<Flex color="red.400" fontWeight="bold" marginBottom="4px">
														Selected file size exceed maxFileSize.
													</Flex>
												)}
												{errors.resolution && (
													<Flex color="red.400" fontWeight="bold" marginBottom="4px">
														Selected file is not match your desired resolution.
													</Flex>
												)}
											</Stack>
										)}
										{!postData.selectedFile && (
											<Stack
												borderColor={
													isDragging
														? CreateColor("gray", 700, 200)
														: CreateColor("primary", 600, 100)
												}
												borderRadius="lg"
												borderStyle="dashed"
												borderWidth="2px"
											>
												<Button
													bg={isDragging ? CreateColor("gray", 200, 700) : undefined}
													color={
														isDragging
															? CreateColor("gray", 700, 200)
															: CreateColor("primary", 600, 100)
													}
													variant="ghost"
													onClick={onImageUpload}
													{...dragProps}
													p="8"
												>
													Upload Image
												</Button>
											</Stack>
										)}
										{imageList.map((image, index) => (
											<Stack
												key={index}
												className="image-item"
												direction="row"
												spacing="2"
											>
												<Image
													alt=""
													boxSize="100px"
													objectFit="contain"
													src={image.data_url}
												/>
												<Flex align="center" direction="column" justify="center">
													<Button
														colorScheme="primary"
														variant="ghost"
														onClick={() => onImageUpdate(index)}
													>
														Update
													</Button>
													<Button
														colorScheme="primary"
														variant="ghost"
														onClick={() => onImageRemove(index)}
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
						helper="Max: 5mb. Formats: jpg, jpeg, png, gif."
						label="Upload image"
					/>

					<Stack spacing="4">
						<Button
							bgGradient={CreateGradColor("primary", 400, 800, 100, 400)}
							colorScheme="primary"
							disabled={
								!(checkEmpty(postData?.title) && checkEmpty(postData?.message)) ||
								![...new Set(postData.tags)].every(tag => /^[a-zA-Z0-9_.-]*$/.test(tag))
							}
							type="submit"
						>
							Submit
						</Button>
						<Button colorScheme="primary" variant="outline" onClick={handleClear}>
							Clear
						</Button>
					</Stack>
				</Stack>
			</form>
		</Flex>
	)
}

export default Form
