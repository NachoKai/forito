import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
	Badge,
	Divider,
	Heading,
	Image,
	Skeleton,
	Stack,
	Text,
	useColorModeValue,
} from "@chakra-ui/react"
import { formatDistance } from "date-fns"
import { useHistory, useParams } from "react-router-dom"

import { getPost, getPostsBySearch } from "../redux/posts"
import { getRandomId } from "../utils/getRandomId"
import Comments from "../components/Comments"

const PostDetails = () => {
	const { post, posts, isLoading } = useSelector(state => state.posts)
	const dispatch = useDispatch()
	const history = useHistory()
	const { id } = useParams()
	const bg = useColorModeValue("primary.100", "primary.900")
	const color = useColorModeValue("primary.600", "primary.100")

	useEffect(() => {
		dispatch(getPost(id))
	}, [id])

	useEffect(() => {
		if (post) {
			dispatch(getPostsBySearch({ search: "none", tags: post?.tags.join(",") }))
		}
	}, [post])

	const openPost = _id => history.push(`/posts/${_id}`)

	if (isLoading) {
		return (
			<Stack p="8">
				<Skeleton borderRadius="lg" h="500px" />
			</Stack>
		)
	}

	const recommendedPosts = posts?.filter(({ _id }) => _id !== post?._id)

	if (!post) return null

	return (
		<Stack borderRadius="lg" p="32px" spacing="8">
			<Stack spacing="8">
				<Stack
					direction={{ sm: "column", md: "column", lg: "row", xl: "row" }}
					spacing="8"
				>
					<Stack spacing="8" w="100%">
						<Heading as="h2" size="xl">
							{post?.title}
						</Heading>
						<Text fontSize="md">{post?.message}</Text>
					</Stack>

					{post?.selectedFile && (
						<Image
							alt={post?.title}
							borderRadius="lg"
							fallback={<Skeleton borderRadius="lg" h="600px" />}
							fit="contain"
							h="600px"
							loading="lazy"
							maxHeight="600px"
							maxWidth="800"
							src={
								post?.selectedFile ||
								"https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
							}
							w="800"
						/>
					)}
				</Stack>

				<Stack direction="row" spacing="2">
					<Stack spacing="4">
						{post?.tags && (
							<Stack direction="row" spacing="2">
								{post?.tags.map(tag => (
									<Badge key={getRandomId()} bg="primary.400" color="white">
										{tag}
									</Badge>
								))}
							</Stack>
						)}
						<Stack
							direction={{ sm: "column", md: "column", lg: "row", xl: "row" }}
							spacing="2"
						>
							<Text fontSize="lg">Created by: </Text>
							<Text fontSize="lg" fontWeight="bold">
								{post?.name}
							</Text>
							<Text fontSize="lg">
								{formatDistance(
									new Date(),
									post?.createdAt ? new Date(post?.createdAt) : new Date()
								) + " ago"}
							</Text>
						</Stack>
					</Stack>
				</Stack>
				<Divider />
				<Text fontSize="lg" fontWeight="bold">
					Comments
				</Text>
				<Comments post={post} />
				<Divider />
			</Stack>

			{!!recommendedPosts?.length && (
				<Stack overflow="auto" spacing="8">
					<Text fontWeight="bold">You might also like:</Text>
					<Stack
						className="recommended-posts"
						direction="row"
						overflow="auto"
						spacing="8"
					>
						{recommendedPosts?.map(
							({ title, name, message, likes, selectedFile, _id }) => (
								<Stack
									key={_id}
									bg={bg}
									borderRadius="lg"
									className="recommended-post"
									color={color}
									cursor="pointer"
									h="100%"
									maxWidth="320px"
									minWidth="320px"
									p="8"
									spacing="2"
									onClick={() => openPost(_id)}
								>
									<Heading as="h3" fontSize="lg" fontWeight="bold">
										{title}
									</Heading>
									<Text>{name}</Text>
									<Text noOfLines={[2, 4, 6]}>{message}</Text>
									<Text>Likes: {likes?.length}</Text>
									{selectedFile && (
										<Image
											alt={post?.title}
											borderRadius="lg"
											fallback={<Skeleton borderRadius="lg" h="300px" />}
											fit="cover"
											h="300px"
											loading="lazy"
											maxHeight="300px"
											p="8px 0 0 0"
											src={selectedFile}
											w="300px"
										/>
									)}
								</Stack>
							)
						)}
					</Stack>
				</Stack>
			)}
		</Stack>
	)
}

export default PostDetails
