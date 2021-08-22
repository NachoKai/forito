import { useRef, useState } from "react"
import { useDispatch } from "react-redux"
import { Button, Stack, Text, useColorModeValue } from "@chakra-ui/react"
import { FaExclamationCircle } from "react-icons/fa"

import { getRandomId } from "../utils/getRandomId"
import FormTextArea from "./common/FormTextArea"
import { getUser } from "../utils/getUser"
import { addComment } from "../redux/posts"

const Comments = ({ post }) => {
	const dispatch = useDispatch()
	const [comments, setComments] = useState(post?.comments)
	const [comment, setComment] = useState("")
	const color = useColorModeValue("primary.600", "primary.100")
	const user = getUser()
	const commentsRef = useRef(null)

	const handleClick = async () => {
		const commentContent = `${user?.result?.name}: ${comment}`
		const newComments = await dispatch(addComment(commentContent, post._id))

		setComments(newComments)
		setComment("")

		commentsRef.current.scrollIntoView({ behavior: "smooth" })
	}

	const handleClear = () => setComment("")

	return (
		<Stack direction={{ sm: "column", md: "column", lg: "row", xl: "row" }} spacing="4">
			<Stack maxHeight="230px" overflow="auto" spacing="4" width="100%">
				{comments?.map(comment => (
					<Text key={getRandomId()}>
						<strong>{comment?.split(": ")[0]}: </strong>
						{comment?.split(": ")[1]}
					</Text>
				))}
				<div ref={commentsRef} />
			</Stack>
			{user?.result?.name ? (
				<Stack spacing="4" width="100%">
					<FormTextArea
						label="Write a comment"
						maxLength="500"
						name="comment"
						value={comment}
						onChange={e => setComment(e.target.value)}
					/>
					<Button
						colorScheme="primary"
						disabled={!comment.trim().length > 0}
						onClick={handleClick}
					>
						Comment
					</Button>
					<Button colorScheme="primary" variant="outline" onClick={handleClear}>
						Clear
					</Button>
				</Stack>
			) : (
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
						Please login to comment a Post.
					</Text>
				</Stack>
			)}
		</Stack>
	)
}

export default Comments
