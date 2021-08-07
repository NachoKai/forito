import {
	Flex,
	Stack,
	Text,
	Image,
	Button,
	Badge,
	CircularProgress,
	useColorModeValue,
} from "@chakra-ui/react"
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
	const bg = useColorModeValue("primary.50", "primary.500")

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
		<Stack bg={bg} borderRadius="lg" direction="column" p="8" spacing={4} w="100%">
			{selectedFile && (
				<Image
					alt={title}
					borderRadius="lg"
					boxSize="320px"
					fallback={<CircularProgress isIndeterminate color="primary.200" />}
					objectFit="cover"
					src={selectedFile}
				/>
			)}

			<Flex direction="column">
				<Text fontSize="lg">{creator}</Text>
				<Text fontSize="sm">
					{formatDistance(new Date(), createdAt ? new Date(createdAt) : new Date()) + " ago"}
				</Text>
			</Flex>

			<Text fontSize="3xl" marginBottom="2">
				{title}
			</Text>

			<Text fontSize="md">{message}</Text>

			<Flex>
				{tags &&
					tags.map(tag => (
						<Badge key={getRandomId()} bg="primary.400" color="white" marginX="0.5">
							{tag}
						</Badge>
					))}
			</Flex>

			<Stack direction="row" spacing="4">
				<Button
					colorScheme="primary"
					leftIcon={<FaThumbsUp />}
					size="sm"
					variant="solid"
					onClick={handleLike}
				>
					<Text>
						{likeCount} {likeCount !== 1 ? "Likes" : "Like"}
					</Text>
				</Button>
				<Button
					colorScheme="primary"
					leftIcon={<FaPen />}
					size="sm"
					variant="outline"
					onClick={handleEdit}
				>
					Edit
				</Button>
				<Button
					bg="red.400"
					colorScheme="primary"
					leftIcon={<FaEraser />}
					size="sm"
					variant="solid"
					onClick={handleDelete}
				>
					Delete
				</Button>
			</Stack>
		</Stack>
	)
}

export default Post
