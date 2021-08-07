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
	Grid,
} from "@chakra-ui/react"
import FileBase from "react-file-base64"

import { createPost, updatePost } from "../../redux/posts"

const Form = ({ currentId, setCurrentId }) => {
	const dispatch = useDispatch()
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
			<Grid
				backgroundColor="primary.100"
				border="1px"
				borderColor="gray.200"
				borderRadius="lg"
				gap={4}
				p="8"
			>
				<Text fontSize="xl">{currentId ? "Edit" : "Create"} Post</Text>

				<FormControl isRequired>
					<FormLabel>Creator</FormLabel>
					<Input
						backgroundColor="white"
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
						backgroundColor="white"
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
						backgroundColor="white"
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
						backgroundColor="white"
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
					<FormControl>
						<FormLabel>Upload image</FormLabel>
						<FileBase
							multiple={false}
							type="file"
							onDone={({ base64 }) => {
								setPostData({ ...postData, selectedFile: base64 })
							}}
						/>
					</FormControl>
				</Flex>

				<Grid display="flex" gap="4">
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
				</Grid>
			</Grid>
		</form>
	)
}

export default Form
