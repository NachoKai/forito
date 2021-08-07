import { Flex, Grid, Text, Image, Button, Badge } from "@chakra-ui/react"
import { FaThumbsUp, FaEraser, FaPen } from "react-icons/fa"
import { formatDistance } from "date-fns"
import { useDispatch } from "react-redux"

import { getRandomId } from "../../utils/getRandomId"
import { deletePost, likePost } from "../../redux/posts"

const Post = ({
	setCurrentId,
	post: { _id, title, creator, message, likeCount, createdAt, tags, selectedFile },
}) => {
	const dispatch = useDispatch()

	const handleLike = () => {
		dispatch(likePost(_id))
	}

	const handleEdit = () => {
		setCurrentId(_id)
	}

	const handleDelete = () => {
		dispatch(deletePost(_id))
	}

	return (
		<Grid flexGrow backgroundColor="primary.50" direction="column" gap={4} p="8" w="100%">
			<Flex direction="column">
				<Text fontSize="lg">{creator}</Text>
				<Text fontSize="sm">
					{formatDistance(new Date(), createdAt ? new Date(createdAt) : new Date()) + " ago"}
				</Text>
			</Flex>

			<Text fontSize="3xl" marginBottom="2">
				{title}
			</Text>
			{selectedFile && <Image alt={title} boxSize="200px" src={selectedFile} />}
			<Text fontSize="md">{message}</Text>

			<Flex>
				{tags &&
					tags.map(tag => (
						<Badge key={getRandomId()} backgroundColor="primary.400" color="white" marginX="0.5">
							{tag}
						</Badge>
					))}
			</Flex>

			<Flex>
				<Button leftIcon={<FaThumbsUp />} size="sm" variant="ghost" onClick={handleLike}>
					<Text>
						{likeCount} {likeCount !== 1 ? "Likes" : "Like"}
					</Text>
				</Button>
				<Button leftIcon={<FaPen />} size="sm" variant="ghost" onClick={handleEdit}>
					Edit
				</Button>
				<Button
					backgroundColor="red.200"
					leftIcon={<FaEraser />}
					size="sm"
					variant="solid"
					onClick={handleDelete}
				>
					Delete
				</Button>
			</Flex>
		</Grid>
	)
}

export default Post
