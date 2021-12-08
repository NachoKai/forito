import { useState } from "react"
import {
	Badge,
	Button,
	Heading,
	Image,
	Stack,
	Text,
	useColorModeValue,
} from "@chakra-ui/react"
import { FaEraser, FaPen, FaRegComments } from "react-icons/fa"
import { formatDistance } from "date-fns"
import { useDispatch } from "react-redux"
import { Link, useHistory, useLocation } from "react-router-dom"
import { FaBookmark, FaRegBookmark } from "react-icons/fa"

import { getRandomId } from "../utils/getRandomId"
import { deletePost, likePost } from "../redux/posts"
import Likes from "./Likes"
import { getUser } from "../utils/getUser"
import Dialog from "./common/Dialog"
import { CreateBg } from "../theme"
import { savePost } from "../redux/auth"

const Post = ({
	setCurrentId,
	post: {
		_id,
		title,
		name,
		creator,
		message,
		likes,
		createdAt,
		tags,
		selectedFile,
		comments,
	},
	handleClick,
}) => {
	const dispatch = useDispatch()
	const history = useHistory()
	const user = getUser()
	const userId = user?.result?.googleId || user?.result?._id
	const isUserLike = likes?.find(like => like === userId)
	const hasUserSaved = user?.result?.savedPosts
	const [isDialogOpen, setIsDialogOpen] = useState(false)
	const [likesMock, setLikesMock] = useState(likes)
	const location = useLocation()

	const isPostCreator = user?.result?.googleId
		? user?.result?.googleId === creator
		: false || user?.result?._id
		? user?.result?._id === creator
		: false

	const isAdmin = user?.result?.email
		? process.env.REACT_APP_ADMIN === user?.result?.email
		: false

	const handleLike = async () => {
		dispatch(likePost(_id))

		if (isUserLike) {
			setLikesMock(likes.filter(id => id !== userId))
		} else {
			setLikesMock([...likes, userId])
		}
	}

	const handleSave = async () => {
		dispatch(savePost(_id))
	}

	const openPost = () => {
		history.push(`/posts/${_id}`)
	}

	const openComments = () => {
		history.push(`/posts/${_id}#comments`)
	}

	const handleEdit = () => {
		setCurrentId(_id)
		handleClick()
	}

	return (
		<Stack
			bg={CreateBg("primary", 50, 800)}
			borderRadius="lg"
			boxShadow="lg"
			direction={{
				sm: "column-reverse",
				md: "column-reverse",
				lg: "column-reverse",
				xl: "row",
			}}
			h="100%"
			p="8"
			spacing="8"
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
						textShadow={useColorModeValue(
							`0 0 3px rgba(0,0,0,0.3)`,
							`0 0 3px rgba(255,255,255,0.3)`
						)}
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

					<Stack direction="row" spacing={{ sm: "2", md: "2", lg: "4", xl: "4" }}>
						<Button
							colorScheme="primary"
							disabled={!user?.result}
							minWidth="80px"
							size="sm"
							variant={isUserLike ? "ghost" : "outline"}
							onClick={handleLike}
						>
							<Likes isUserLike={isUserLike} likes={likesMock} />
						</Button>
						<Button
							colorScheme="primary"
							leftIcon={<FaRegComments />}
							size="sm"
							variant={"outline"}
							onClick={openComments}
						>
							{comments?.length} {comments?.length === 1 ? "Comment" : "Comments"}
						</Button>
						<Stack
							direction="row"
							display={location?.pathname.includes("/posts") ? "flex" : "none"}
							spacing={{ sm: "2", md: "2", lg: "4", xl: "4" }}
						>
							<Button
								colorScheme="primary"
								disabled={!user?.result}
								leftIcon={hasUserSaved ? <FaRegBookmark /> : <FaBookmark />}
								minWidth="80px"
								size="sm"
								variant={hasUserSaved ? "ghost" : "outline"}
								onClick={handleSave}
							>
								Save
							</Button>
							{(isPostCreator || isAdmin) && (
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
							{(isPostCreator || isAdmin) && (
								<Button
									bg={CreateBg("red", 500, 200)}
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
