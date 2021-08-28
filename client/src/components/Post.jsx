import { useState } from "react"
import { Badge, Button, Heading, Image, Stack, Text } from "@chakra-ui/react"
import { FaEraser, FaPen } from "react-icons/fa"
import { formatDistance } from "date-fns"
import { useDispatch } from "react-redux"
import { Link, useHistory } from "react-router-dom"

import { getRandomId } from "../utils/getRandomId"
import { deletePost, likePost } from "../redux/posts"
import Likes from "./Likes"
import { getUser } from "../utils/getUser"
import Dialog from "./common/Dialog"
import { createBg } from "../theme"

const Post = ({
	setCurrentId,
	post: { _id, title, name, creator, message, likes, createdAt, tags, selectedFile },
	handleClick,
}) => {
	const dispatch = useDispatch()
	const history = useHistory()
	const user = getUser()
	const userId = user?.result?.googleId || user?.result?._id
	const isUserLike = likes?.find(like => like === userId)
	const [isDialogOpen, setIsDialogOpen] = useState(false)
	const [likesMock, setLikesMock] = useState(likes)
	const isPostCreator =
		user?.result?.googleId === creator || user?.result?._id === creator

	const handleLike = async () => {
		dispatch(likePost(_id))

		if (isUserLike) {
			setLikesMock(likes.filter(id => id !== userId))
		} else {
			setLikesMock([...likes, userId])
		}
	}

	const openPost = () => {
		history.push(`/posts/${_id}`)
	}

	const handleEdit = () => {
		setCurrentId(_id)
		handleClick()
	}

	return (
		<Stack
			bg={createBg("primary", 50, 800)}
			borderRadius="lg"
			direction={{
				sm: "column-reverse",
				md: "column-reverse",
				lg: "column-reverse",
				xl: "row",
			}}
			h="100%"
			p="8"
			spacing={8}
			w="100%"
		>
			<Stack justify="space-between" spacing="4" w="100%">
				<Stack direction="column" spacing="4">
					<Stack direction="row" spacing="2">
						<Stack direction="column">
							<Text fontSize="lg" fontWeight="bold">
								<Link to={`/creators/${name}`}>{` ${name}`}</Link>
							</Text>
							<Text fontSize="sm">
								{formatDistance(
									new Date(),
									createdAt ? new Date(createdAt) : new Date()
								) + " ago"}
							</Text>
						</Stack>
					</Stack>

					<Heading
						as="h3"
						className="pointer"
						fontSize="3xl"
						marginBottom="2"
						onClick={openPost}
					>
						{title}
					</Heading>

					<Text fontSize="md" noOfLines={[2, 4, 6]} whiteSpace="pre-wrap">
						{message}
					</Text>
				</Stack>

				<Stack direction="column" spacing="4">
					<Stack direction="row" overflow="auto" spacing="2">
						{[...new Set(tags)]
							.filter(e => e)
							.map(tag => (
								<Badge key={getRandomId()} bg="primary.400" color="white">
									<Link to={`/tags/${tag}`}>{` #${tag} `}</Link>
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
								onClick={handleEdit}
							>
								Edit
							</Button>
						)}
						{isPostCreator && (
							<Button
								bg={createBg("red", 500, 200)}
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
				</Stack>
			</Stack>

			{selectedFile && (
				<Image
					alt={title}
					borderRadius="lg"
					boxSize="450px"
					className="pointer"
					loading="lazy"
					objectFit="cover"
					src={selectedFile}
					onClick={openPost}
				/>
			)}

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
