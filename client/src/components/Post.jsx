import { memo, useCallback, useState } from "react"
import {
	AspectRatio,
	Badge,
	Button,
	Heading,
	Image,
	Stack,
	Text,
	Tooltip,
	useColorModeValue,
} from "@chakra-ui/react"
import { FaEraser, FaPen, FaRegComments } from "react-icons/fa"
import { format, formatDistance, isValid } from "date-fns"
import { useDispatch } from "react-redux"
import { Link, useHistory, useLocation } from "react-router-dom"
import { FaBookmark, FaRegBookmark } from "react-icons/fa"

import { getRandomId } from "../utils/getRandomId"
import { deletePost, likePost, savePost } from "../redux/posts"
import Likes from "./Likes"
import { getUser } from "../utils/getUser"
import Dialog from "./common/Dialog"
import { CreateBg } from "../theme"

const Post = ({
	setCurrentId,
	post: {
		_id,
		title,
		name,
		creator,
		message,
		likes,
		saves,
		createdAt,
		tags,
		selectedFile,
		comments,
	},
	handleScroll,
}) => {
	const dispatch = useDispatch()
	const history = useHistory()
	const user = getUser()
	const userId = user?.result?.googleId || user?.result?._id
	const isUserLike = likes?.find(like => like === userId)
	const hasUserSaved = saves?.find(save => save === userId)
	const [isDialogOpen, setIsDialogOpen] = useState(false)
	const [likesMock, setLikesMock] = useState(likes)
	const location = useLocation()
	const userEmail = user?.result?.email

	const isPostCreator = user?.result?.googleId
		? user?.result?.googleId === creator
		: false || user?.result?._id
		? user?.result?._id === creator
		: false

	const isAdmin = userEmail ? process.env.REACT_APP_ADMIN === userEmail : false

	const handleLike = useCallback(async () => {
		dispatch(likePost(_id))

		if (isUserLike) {
			setLikesMock(likes.filter(id => id !== userId))
		} else {
			setLikesMock([...likes, userId])
		}
	}, [_id, dispatch, isUserLike, likes, userId])

	const handleSave = useCallback(async () => {
		dispatch(savePost(_id))
	}, [_id, dispatch])

	const openPost = useCallback(() => {
		history.push(`/posts/${_id}`)
	}, [_id, history])

	const openComments = useCallback(() => {
		history.push(`/posts/${_id}#comments`)
	}, [_id, history])

	const handleEdit = useCallback(() => {
		setCurrentId(_id)
		handleScroll()
	}, [_id, handleScroll, setCurrentId])

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
					<Stack direction="row">
						<Stack direction="column" spacing="0">
							<Text fontSize="lg" fontWeight="bold">
								<Link to={`/creator/${creator}`}>{` ${name}`}</Link>
							</Text>
							<Tooltip
								hasArrow
								colorScheme="primary"
								label={format(
									isValid(new Date(createdAt)) ? new Date(createdAt) : new Date(),
									"dd MMM yyyy - HH:mm"
								)}
								openDelay={200}
								placement="top"
							>
								<Text fontSize="sm">
									{formatDistance(
										new Date(),
										createdAt ? new Date(createdAt) : new Date()
									) + " ago"}
								</Text>
							</Tooltip>
						</Stack>
					</Stack>

					<Heading
						as="h3"
						className="pointer"
						fontSize="3xl"
						marginBottom="2"
						textShadow={useColorModeValue(
							`0 0 2px rgba(0,0,0,0.2)`,
							`0 0 2px rgba(255,255,255,0.2)`
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

					<Stack
						direction={{ sm: "column", md: "column", lg: "row", xl: "row" }}
						spacing={{ sm: "2", md: "2", lg: "4", xl: "4" }}
					>
						<Stack
							direction="row"
							display={location?.pathname.includes("/posts") ? "flex" : "none"}
							flexGrow={{ sm: "1", md: "1", lg: "0", xl: "0" }}
							spacing={{ sm: "2", md: "2", lg: "4", xl: "4" }}
						>
							<Button
								colorScheme="primary"
								disabled={!user?.result}
								flexGrow={{ sm: "1", md: "1", lg: "0", xl: "0" }}
								minWidth="80px"
								size="sm"
								variant={isUserLike ? "ghost" : "outline"}
								onClick={handleLike}
							>
								<Likes isUserLike={isUserLike} likes={likesMock} />
							</Button>
							<Button
								colorScheme="primary"
								flexGrow={{ sm: "1", md: "1", lg: "0", xl: "0" }}
								leftIcon={<FaRegComments />}
								size="sm"
								variant={"outline"}
								onClick={openComments}
							>
								{comments?.length} {comments?.length === 1 ? "Comment" : "Comments"}
							</Button>
						</Stack>

						<Stack
							direction="row"
							display={location?.pathname.includes("/posts") ? "flex" : "none"}
							flexGrow={{ sm: "1", md: "1", lg: "0", xl: "0" }}
							spacing={{ sm: "2", md: "2", lg: "4", xl: "4" }}
						>
							{userEmail && (
								<Button
									colorScheme="primary"
									disabled={!user?.result}
									flexGrow={{ sm: "1", md: "1", lg: "0", xl: "0" }}
									leftIcon={hasUserSaved ? <FaBookmark /> : <FaRegBookmark />}
									minWidth="80px"
									size="sm"
									variant={hasUserSaved ? "ghost" : "outline"}
									onClick={handleSave}
								>
									{hasUserSaved ? "Saved" : "Save"}
								</Button>
							)}
							{(isPostCreator || isAdmin) && (
								<Button
									colorScheme="primary"
									flexGrow={{ sm: "1", md: "1", lg: "0", xl: "0" }}
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
									flexGrow={{ sm: "1", md: "1", lg: "0", xl: "0" }}
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
				<AspectRatio maxH="80vh" ratio={1} w="100%">
					<Image
						alt={title}
						borderRadius="lg"
						className="pointer"
						flexGrow="1"
						loading="lazy"
						objectFit="cover"
						src={selectedFile}
						w="100%"
						onClick={openPost}
					/>
				</AspectRatio>
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

export default memo(Post)
