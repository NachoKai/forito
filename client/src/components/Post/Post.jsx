import { useState } from "react"
import {
	Badge,
	Button,
	Flex,
	Image,
	Skeleton,
	SkeletonCircle,
	Stack,
	Text,
	useColorModeValue,
} from "@chakra-ui/react"
import { FaEraser, FaPen } from "react-icons/fa"
import { formatDistance } from "date-fns"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"

import { getRandomId } from "../../utils/getRandomId"
import { deletePost, likePost } from "../../redux/posts"
import Likes from "./Likes"
import { getUser } from "../../utils/getUser"
import Dialog from "../common/Dialog"

const Post = ({
	setCurrentId,
	post: { _id, title, name, creator, message, likes, createdAt, tags, selectedFile },
}) => {
	const dispatch = useDispatch()
	const bg = useColorModeValue("primary.50", "primary.800")
	const bgDelete = useColorModeValue("red.500", "red.200")
	const user = getUser()
	const userId = user?.result.googleId || user?.result?._id
	const isPostCreator =
		user?.result?.googleId === creator || user?.result?._id === creator
	const isUserLike =
		likes && likes.find(like => like === (user?.result?.googleId || user?.result?._id))
	const hasLikedPost = likes.find(like => like === userId)
	const avatar = false
	const [isDialogOpen, setIsDialogOpen] = useState(false)
	const history = useHistory()
	const [likesMock, setLikesMock] = useState(likes)

	const handleLike = async () => {
		dispatch(likePost(_id))

		if (hasLikedPost) {
			setLikesMock(likes.filter(id => id !== userId))
		} else {
			setLikesMock([...likes, userId])
		}
	}

	const openPost = () => {
		history.push(`/posts/${_id}`)
	}

	return (
		<Stack bg={bg} borderRadius="lg" direction="column" p="8" spacing={4} w="100%">
			{selectedFile && (
				<Image
					alt={title}
					borderRadius="lg"
					boxSize="250"
					fallback={<Skeleton borderRadius="lg" h="250" />}
					fit="cover"
					src={selectedFile}
					w="100%"
				/>
			)}
			<Stack direction="row" spacing="4">
				<Flex direction="column">
					{avatar && (
						<Image
							alt={user?.result?.name}
							borderRadius="full"
							boxSize="50px"
							fallback={<SkeletonCircle size="50" />}
							objectFit="cover"
							src={avatar}
						/>
					)}
				</Flex>
				<Flex direction="column">
					<Text fontSize="lg">{name}</Text>
					<Text fontSize="sm">
						{formatDistance(new Date(), createdAt ? new Date(createdAt) : new Date()) +
							" ago"}
					</Text>
				</Flex>
			</Stack>
			<Text
				_hover={{ cursor: "pointer", textDecoration: "underline" }}
				fontSize="3xl"
				marginBottom="2"
				onClick={openPost}
			>
				{title}
			</Text>
			<Text fontSize="md" noOfLines={[2, 4, 6]}>
				{message}
			</Text>
			<Stack direction="row" overflow="auto" spacing="2">
				{[...new Set(tags)]
					.filter(e => e)
					.map(tag => (
						<Badge key={getRandomId()} bg="primary.400" color="white">
							{tag}
						</Badge>
					))}
			</Stack>
			<Stack direction="row" spacing="4">
				<Button
					colorScheme="primary"
					disabled={!user?.result}
					size="sm"
					variant={isUserLike ? "ghost" : "outline"}
					onClick={handleLike}
				>
					<Likes isUserLike={isUserLike} likes={likesMock} />
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
						onClick={() => setIsDialogOpen(true)}
					>
						Delete
					</Button>
				)}
			</Stack>
			<Dialog
				_id={_id}
				action={() => dispatch(deletePost(_id))}
				button="Delete"
				isDialogOpen={isDialogOpen}
				message="Are you sure you want to delete this post?"
				setIsDialogOpen={setIsDialogOpen}
				title="Delete Post"
			/>
		</Stack>
	)
}

export default Post
