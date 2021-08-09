import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Button, Stack, Text, useColorModeValue } from "@chakra-ui/react"
// import FileBase from "react-file-base64"
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
	const dispatch = useDispatch()
	const bg = useColorModeValue("primary.100", "primary.900")
	const [postData, setPostData] = useState(initialState)
	const post = useSelector(state =>
		currentId ? state.posts.find(post => post._id === currentId) : null
	)
	const user = getUser()

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
		setCurrentId(null)
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
			<Stack align="center" direction="column" spacing="4">
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
		<form noValidate autoComplete="off" onSubmit={handleSubmit}>
			<Stack bg={bg} borderRadius="lg" minWidth="320px" p="8" spacing={4}>
				<Text fontSize="xl" fontWeight="bold">
					{currentId ? "Edit" : "Create"} Post
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
					label="Tags"
					maxLength="55"
					name="tags"
					value={postData.tags}
					onChange={e => {
						setPostData({
							...postData,
							tags: e.target.value.split(","),
						})
					}}
				/>
				{/* <FormInput
					child={
						<FileBase
							multiple={false}
							type="file"
							onDone={({ base64 }) => {
								setPostData({ ...postData, selectedFile: base64 })
							}}
						/>
					}
					label="Upload image"
				/> */}

				<Stack spacing="4">
					<Button
						colorScheme="primary"
						disabled={!(postData.title.length > 0 && postData.message.length > 0)}
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
	)
}

export default Form
