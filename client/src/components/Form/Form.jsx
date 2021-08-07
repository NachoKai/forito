import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { Flex, Text, Input, Button, FormControl } from "@chakra-ui/react"
import FileBase from "react-file-base64"

import { createPost } from "../../redux/posts"

const Form = () => {
	const dispatch = useDispatch()
	const [postData, setPostData] = useState({
		creator: "",
		title: "",
		message: "",
		tags: "",
		selectedFile: "",
	})

	const handleSubmit = e => {
		e.preventDefault()
		dispatch(createPost(postData))
	}

	const handleClear = () => {}

	useEffect(() => {}, [])

	return (
		<Flex>
			<FormControl autoComplete="off" noValidate>
				<Text>Create Post</Text>
				<Input
					name="creator"
					placeholder="Creator"
					variant="outline"
					value={postData.creator}
					onChange={e => {
						setPostData({
							...postData,
							creator: e.target.value,
						})
					}}
				/>
				<Input
					name="title"
					placeholder="Title"
					variant="outline"
					value={postData.title}
					onChange={e => {
						setPostData({
							...postData,
							title: e.target.value,
						})
					}}
				/>
				<Input
					name="message"
					placeholder="Message"
					variant="outline"
					value={postData.message}
					onChange={e => {
						setPostData({
							...postData,
							message: e.target.value,
						})
					}}
				/>
				<Input
					name="tags"
					placeholder="Tags"
					variant="outline"
					value={postData.tags}
					onChange={e => {
						setPostData({
							...postData,
							tags: e.target.value,
						})
					}}
				/>
				<Flex>
					<FileBase
						type="file"
						multiple={false}
						onDone={({ base64 }) => {
							setPostData({ ...postData, selectedFile: base64 })
						}}
					/>
				</Flex>
				<Flex>
					<Button onClick={handleSubmit}>Submit</Button>
					<Button onClick={handleClear} variant="ghost">
						Clear
					</Button>
				</Flex>
			</FormControl>
		</Flex>
	)
}

export default Form
