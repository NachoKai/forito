import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Button, Flex, Stack, Text, useColorModeValue } from "@chakra-ui/react"
import FileBase from "react-file-base64"
import { FaExclamationCircle } from "react-icons/fa"

import { createPost, updatePost } from "../../redux/posts"
import FormInput from "../common/FormInput"
import FormTextArea from "../common/FormTextArea"
import { getUser } from "../../utils/getUser"

const initialState = {
	title: "",
	message: "",
	tags: [],
	selectedFile: "",
}

const Form = ({ currentId, setCurrentId }) => {
	const [postData, setPostData] = useState(initialState)
	const dispatch = useDispatch()
	const user = getUser()
	const bg = useColorModeValue("primary.100", "primary.900")
	const color = useColorModeValue("primary.600", "primary.100")
	const post = useSelector(state =>
		currentId ? state.posts?.posts?.find(message => message._id === currentId) : null
	)
	const gradColor = useColorModeValue(
		"linear(to-l, primary.600,primary.900)",
		"linear(to-l, primary.100,primary.400)"
	)

	const handleSubmit = e => {
		e.preventDefault()

		if (currentId === 0) {
			dispatch(createPost({ ...postData, name: user?.result?.name }))
		} else {
			dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }))
		}
		handleClear()
	}

	const handleClear = () => {
		setCurrentId(0)
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
						helper="Separated by commas"
						label="Tags"
						maxLength="55"
						name="tags"
						value={postData.tags}
						onChange={e => {
							setPostData({
								...postData,
								tags: e.target.value.trim().split(","),
							})
						}}
					/>
					<FormInput
						child={
							<FileBase
								multiple={false}
								style="background:red"
								type="file"
								onDone={({ base64 }) => {
									setPostData({ ...postData, selectedFile: base64 })
								}}
							/>
						}
						helper="Max: 5mb"
						label="Upload image"
					/>

					<Stack spacing="4">
						<Button
							bgGradient={gradColor}
							colorScheme="primary"
							disabled={
								!(postData.title.trim().length > 0 && postData.message.trim().length > 0)
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
