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
		<Flex maxWidth="300px">
			<form noValidate autoComplete="off" onSubmit={handleSubmit}>
				<Text fontSize="xl">{currentId ? "Edit" : "Create"} Post</Text>

				<FormControl isRequired>
					<FormLabel>Creator</FormLabel>
					<Input
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
						name="tags"
						placeholder="Tags"
						value={postData.tags}
						variant="outline"
						onChange={e => {
							setPostData({
								...postData,
								tags: e.target.value,
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

				<Flex>
					<Button
						backgroundColor="primary.300"
						color="white"
						disabled={!(postData.title.length > 0)}
						loadingText="Submitting"
						spinnerPlacement="end"
						type="submit"
					>
						Submit
					</Button>
					<Button variant="ghost" onClick={handleClear}>
						Clear
					</Button>
				</Flex>
			</form>
		</Flex>
	)
}

export default Form
