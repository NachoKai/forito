import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
	Flex,
	Text,
	Input,
	Button,
	FormControl,
	FormLabel,
	FormHelperText,
	Textarea,
	Stack,
	useColorModeValue,
} from "@chakra-ui/react"
// import FileBase from "react-file-base64"

import { createPost, updatePost } from "../../redux/posts"

const Form = ({ currentId, setCurrentId }) => {
	const dispatch = useDispatch()
	const bg = useColorModeValue("primary.100", "primary.900")
	const [postData, setPostData] = useState({
		creator: "",
		title: "",
		message: "",
		tags: "",
		selectedFile: "",
	})
	const post = useSelector(state =>
		currentId ? state.posts.find(post => post._id === currentId) : null
	)

	const handleSubmit = e => {
		e.preventDefault()

		if (currentId) {
			dispatch(updatePost(currentId, postData))
		} else {
			dispatch(createPost(postData))
		}

		handleClear()
	}

	const handleClear = () => {
		setCurrentId(null)
		setPostData({
			creator: "",
			title: "",
			message: "",
			tags: "",
			selectedFile: "",
		})
	}

	useEffect(() => {
		if (post) setPostData(post)
	}, [post])

	return (
		<form noValidate autoComplete="off" onSubmit={handleSubmit}>
			<Stack bg={bg} borderRadius="lg" minWidth="320px" p="8" spacing={4}>
				<Text fontSize="xl" fontWeight="bold">
					{currentId ? "Edit" : "Create"} Post
				</Text>

				<FormControl isRequired>
					<FormLabel>Creator</FormLabel>
					<Input
						_placeholder={{ color: "gray" }}
						bg="white"
						color="black"
						errorBorderColor="red.300"
						focusBorderColor="primary.200"
						maxLength="55"
						name="creator"
						placeholder="Creator"
						value={postData.creator}
						variant="outline"
						onChange={e => {
							setPostData({
								...postData,
								creator: e.target.value,
							})
						}}
					/>
				</FormControl>

				<FormControl isRequired>
					<FormLabel>Title</FormLabel>
					<Input
						_placeholder={{ color: "gray" }}
						bg="white"
						color="black"
						errorBorderColor="red.300"
						focusBorderColor="primary.200"
						maxLength="105"
						name="title"
						placeholder="Title"
						value={postData.title}
						variant="outline"
						onChange={e => {
							setPostData({
								...postData,
								title: e.target.value,
							})
						}}
					/>
				</FormControl>

				<FormControl isRequired>
					<FormLabel>Message</FormLabel>
					<Textarea
						_placeholder={{ color: "gray" }}
						bg="white"
						color="black"
						focusBorderColor="primary.200"
						maxLength="5000"
						name="message"
						placeholder="Message"
						value={postData.message}
						variant="outline"
						onChange={e => {
							setPostData({
								...postData,
								message: e.target.value,
							})
						}}
					/>
				</FormControl>

				<FormControl>
					<FormLabel>Tags</FormLabel>
					<FormHelperText>Separated by commas.</FormHelperText>
					<Input
						_placeholder={{ color: "gray" }}
						bg="white"
						color="black"
						errorBorderColor="red.300"
						focusBorderColor="primary.200"
						maxLength="55"
						name="tags"
						placeholder="Tags"
						value={postData.tags}
						variant="outline"
						onChange={e => {
							setPostData({
								...postData,
								tags: e.target.value.split(","),
							})
						}}
					/>
				</FormControl>

				<Flex>
					{/* <FormControl>
						<FormLabel>Upload image</FormLabel>
						<FileBase
							multiple={false}
							type="file"
							onDone={({ base64 }) => {
								setPostData({ ...postData, selectedFile: base64 })
							}}
						/>
					</FormControl> */}
				</Flex>

				<Stack spacing="4">
					<Button
						color="white"
						colorScheme="primary"
						disabled={
							!(
								postData.title.length > 0 &&
								postData.creator.length > 0 &&
								postData.message.length > 0
							)
						}
						loadingText="Submitting"
						spinnerPlacement="end"
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
