import {
	Badge,
	Button,
	CircularProgress,
	Flex,
	Image,
	Stack,
	Text,
	useColorModeValue,
} from "@chakra-ui/react"
import { FaEraser, FaPen } from "react-icons/fa"
import { formatDistance } from "date-fns"
import { useDispatch } from "react-redux"

import { getRandomId } from "../../utils/getRandomId"
import { deletePost, likePost } from "../../redux/posts"
import Likes from "./Likes"
import { getUser } from "../../utils/getUser"

const Post = ({
	setCurrentId,
	post: { _id, title, name, creator, message, likes, createdAt, tags, selectedFile },
}) => {
	const dispatch = useDispatch()
	const bg = useColorModeValue("primary.50", "primary.800")
	const bgDelete = useColorModeValue("red.500", "red.200")
	const user = getUser()
	const isPostCreator =
		user?.result?.googleId === creator || user?.result?._id === creator

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
				<Text fontSize="lg">{name}</Text>
				<Text fontSize="sm">
					{formatDistance(new Date(), createdAt ? new Date(createdAt) : new Date()) +
						" ago"}
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
					disabled={!user?.result}
					size="sm"
					variant="outline"
					onClick={() => dispatch(likePost(_id))}
				>
					<Likes likes={likes} />
				</Button>
				{isPostCreator && (
					<Button
						colorScheme="primary"
						leftIcon={<FaPen />}
						size="sm"
						variant="outline"
						onClick={() => setCurrentId(_id)}
					>
						Edit
					</Button>
				)}
				{isPostCreator && (
					<Button
						bg={bgDelete}
						colorScheme="primary"
						leftIcon={<FaEraser />}
						size="sm"
						variant="solid"
						onClick={() => dispatch(deletePost(_id))}
					>
						Delete
					</Button>
				)}
			</Stack>
		</Stack>
	)
}

export default Post
