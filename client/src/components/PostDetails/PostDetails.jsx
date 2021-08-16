import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
	Badge,
	Center,
	Divider,
	Heading,
	Image,
	Skeleton,
	Stack,
	Text,
} from "@chakra-ui/react"
import { formatDistance } from "date-fns"
import { useHistory, useParams } from "react-router-dom"
import { getPost, getPostsBySearch } from "../../redux/posts"
import { getRandomId } from "../../utils/getRandomId"

const PostDetails = () => {
	const { post, posts, isLoading } = useSelector(state => state.posts)
	const dispatch = useDispatch()
	const history = useHistory()
	const { id } = useParams()

	useEffect(() => {
		dispatch(getPost(id))
	}, [id])

	useEffect(() => {
		if (post) {
			dispatch(getPostsBySearch({ search: "none", tags: post?.tags.join(",") }))
		}
	}, [post])

	if (!post) return null

	const openPost = _id => history.push(`/posts/${_id}`)

	if (isLoading) {
		return (
			<Stack p="8">
				<Skeleton borderRadius="lg" h="500px" />
			</Stack>
		)
	}

	const recommendedPosts = posts.filter(({ _id }) => _id !== post?._id)

	return (
		<Stack borderRadius="lg" p="24px" spacing="8">
			<Stack spacing="8">
				<Heading size="xl">{post?.title}</Heading>

				{post?.tags && (
					<Stack direction="row" spacing="2">
						{post?.tags.map(tag => (
							<Badge key={getRandomId()} bg="primary.400" color="white">
								{tag}
							</Badge>
						))}
					</Stack>
				)}

				<Text fontSize="md">{post?.message}</Text>

				{post?.selectedFile && (
					<Center>
						<Image
							alt={post?.title}
							borderRadius="lg"
							boxSize="100%"
							fallback={<Skeleton borderRadius="lg" h="400px" />}
							fit="cover"
							maxWidth="1000px"
							src={
								post?.selectedFile ||
								"https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
							}
						/>
					</Center>
				)}

				<Stack direction="row" spacing="2">
					<Text fontSize="lg">Created by: {post?.name}</Text>
					<Text fontSize="lg">
						{formatDistance(
							new Date(),
							post?.createdAt ? new Date(post?.createdAt) : new Date()
						) + " ago"}
					</Text>
				</Stack>

				<Divider />

				<Text fontSize="lg" fontWeight="bold">
					Comments
				</Text>

				<Divider />
			</Stack>

			{!!recommendedPosts.length && (
				<Stack>
					<Text gutterBottom>You might also like:</Text>
					<Divider />
					<Stack>
						{recommendedPosts.map(
							({ title, name, message, likes, selectedFile, _id }) => (
								<Stack
									key={_id}
									style={{ margin: "20px", cursor: "pointer" }}
									onClick={() => openPost(_id)}
								>
									<Text gutterBottom>{title}</Text>
									<Text gutterBottom>{name}</Text>
									<Text gutterBottom>{message}</Text>
									<Text gutterBottom>Likes: {likes.length}</Text>
									<Image
										alt={post?.title}
										borderRadius="lg"
										boxSize="200px"
										fallback={<Skeleton borderRadius="lg" h="200px" />}
										fit="cover"
										src={selectedFile}
									/>
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
