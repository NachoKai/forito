import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
	Button,
	Divider,
	Flex,
	Image,
	Stack,
	Text,
	useColorModeValue,
} from "@chakra-ui/react"
import { FaExclamationCircle } from "react-icons/fa"
import { useHistory } from "react-router-dom"
import ImageUploading from "react-images-uploading"

import { createPost, updatePost } from "../redux/posts"
import FormInput from "./common/FormInput"
import FormTextArea from "./common/FormTextArea"
import { getUser } from "../utils/getUser"
import showError from "../utils/showError"

const initialState = {
	title: "",
	message: "",
	tags: [],
	selectedFile: "",
}

const Form = ({ currentId, setCurrentId }) => {
	const [postData, setPostData] = useState(initialState)
	const [images, setImages] = useState([])
	const dispatch = useDispatch()
	const user = getUser()
	const history = useHistory()
	const bg = useColorModeValue("primary.100", "primary.900")
	const grayBg = useColorModeValue("gray.200", "gray.700")
	const color = useColorModeValue("primary.600", "primary.100")
	const grayColor = useColorModeValue("gray.700", "gray.200")
	const gradColor = useColorModeValue(
		"linear(to-l, primary.600,primary.900)",
		"linear(to-l, primary.100,primary.400)"
	)
	const areValidTags = ![...new Set(postData.tags)].every(tag =>
		/^[a-zA-Z0-9_.-]*$/.test(tag)
	)

	const post = useSelector(state =>
		currentId ? state.posts?.posts?.find(message => message._id === currentId) : null
	)

	const onChange = imageList => {
		setPostData({ ...postData, selectedFile: imageList && imageList[0]?.data_url })
		setImages(imageList)
	}

	const handleSubmit = e => {
		e.preventDefault()

		if (currentId === 0) {
			dispatch(createPost({ ...postData, name: user?.result?.name }, history))
		} else {
			dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }))
		}
		handleClear()
	}

	const handleClear = () => {
		setCurrentId(0)
		setImages([])
		setPostData(initialState)
	}

	useEffect(() => {
		if (post) setPostData(post)
	}, [post])

	const handleChange = e => {
		setPostData({ ...postData, [e.target.name]: e.target.value })
	}

	if (!user?.result?.name) {
		return (
			<Stack
				align="center"
				color={color}
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
				<Stack bg={bg} borderRadius="lg" p="8" spacing={4}>
					<Text fontSize="xl" fontWeight="bold">
						{currentId ? "Edit" : "Create"} Post ✏️
					</Text>
					<FormInput
						isRequired
						label="Title"
						maxLength="105"
						name="title"
						value={postData.title}
						onChange={handleChange}
					/>
					<FormTextArea
						isRequired
						label="Message"
						maxLength="5000"
						name="message"
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
								multiple={false}
								value={images}
								onChange={onChange}
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
												borderColor={isDragging ? grayColor : color}
												borderRadius="lg"
												borderStyle="dashed"
												borderWidth="2px"
											>
												<Button
													bg={isDragging ? grayBg : undefined}
													color={isDragging ? grayColor : color}
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
													objectFit="cover"
													src={image["data_url"]}
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

					<Divider />

					<Stack spacing="4">
						<Button
							bgGradient={gradColor}
							colorScheme="primary"
							disabled={
								!(
									postData.title.trim().length > 0 && postData.message.trim().length > 0
								) ||
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
