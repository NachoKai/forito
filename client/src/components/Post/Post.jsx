import { useRef, useState } from "react"
import {
	AlertDialog,
	AlertDialogBody,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogOverlay,
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
	const isUserLike =
		likes && likes.find(like => like === (user?.result?.googleId || user?.result?._id))
	const avatar = false
	const [isOpen, setIsOpen] = useState(false)

	const Dialog = () => {
		const cancelRef = useRef()
		const onCancel = () => setIsOpen(false)
		const onAccept = () => {
			dispatch(deletePost(_id))
			setIsOpen(false)
		}

		return (
			<AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onCancel}>
				<AlertDialogOverlay>
					<AlertDialogContent>
						<AlertDialogHeader fontSize="lg" fontWeight="bold">
							Delete Post
						</AlertDialogHeader>
						<AlertDialogBody>Are you sure you want to delete this post?</AlertDialogBody>
						<AlertDialogFooter>
							<Button ref={cancelRef} onClick={onCancel}>
								Cancel
							</Button>
							<Button colorScheme="red" ml={3} onClick={onAccept}>
								Delete
							</Button>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialogOverlay>
			</AlertDialog>
		)
	}

	return (
		<Stack bg={bg} borderRadius="lg" direction="column" p="8" spacing={4} w="100%">
			{selectedFile && (
				<Image
					alt={title}
					borderRadius="lg"
					boxSize="400px"
					fallback={<Skeleton borderRadius="lg" h="400px" />}
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
			<Text fontSize="3xl" marginBottom="2">
				{title}
			</Text>
			<Text fontSize="md">{message}</Text>
			<Stack direction="row" overflow="auto" spacing="2">
				{tags?.map(tag => (
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
					onClick={() => dispatch(likePost(_id))}
				>
					<Likes isUserLike={isUserLike} likes={likes} />
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
						onClick={() => setIsOpen(true)}
					>
						Delete
					</Button>
				)}
			</Stack>
			<Dialog />
		</Stack>
	)
}

export default Post
