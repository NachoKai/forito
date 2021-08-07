import { Flex, Grid, Text, Image, Button, Badge } from "@chakra-ui/react"
import { FaThumbsUp, FaEraser, FaPen } from "react-icons/fa"
import { formatDistance } from "date-fns"
import { useDispatch } from "react-redux"

import { splitTagList } from "../../utils/splitTagList"
import { getRandomId } from "../../utils/getRandomId"
import { deletePost } from "../../redux/posts"

const Post = ({
	setCurrentId,
	post: { _id, title, creator, message, likeCount, createdAt, tags, selectedFile },
}) => {
	const dispatch = useDispatch()
	const tagList = splitTagList(tags)

	const handleLike = () => {}

	const handleEdit = () => {
		setCurrentId(_id)
	}

	const handleDelete = () => {
		dispatch(deletePost(_id))
	}

	return (
		<Grid gap={2} direction="column" m="4" p="8" backgroundColor="primary.50" flexGrow>
			<Text fontSize="2xl" marginBottom="2">
				{title}
			</Text>
			{selectedFile && <Image boxSize="200px" src={selectedFile} alt={title} />}
			{creator && <Text>Author: {creator}</Text>}
			<Text>{message}</Text>
			{likeCount > 1 && <Text>{likeCount}</Text>}
			{tagList && (
				<Text>
					{tagList.map(tag => (
						<Badge key={getRandomId()} marginX="0.5" backgroundColor="primary.400" color="white">
							{tag}
						</Badge>
					))}
				</Text>
			)}
			<Text>
				{formatDistance(new Date(), createdAt ? new Date(createdAt) : new Date()) + " ago"}
			</Text>

			<Flex>
				<Button leftIcon={<FaThumbsUp />} size="sm" variant="ghost" onClick={handleLike}>
					Like
				</Button>
				<Button leftIcon={<FaPen />} size="sm" variant="ghost" onClick={handleEdit}>
					Edit
				</Button>
				<Button
					leftIcon={<FaEraser />}
					size="sm"
					variant="solid"
					backgroundColor="red.200"
					onClick={handleDelete}
				>
					Delete
				</Button>
			</Flex>
		</Grid>
	)
}

export default Post
