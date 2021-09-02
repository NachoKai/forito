import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Badge, Divider, Heading, Image, Skeleton, Stack, Text } from "@chakra-ui/react"
import { formatDistance } from "date-fns"
import { Link, useHistory, useParams } from "react-router-dom"

import { getPost, getPostsBySearch } from "../redux/posts"
import { getRandomId } from "../utils/getRandomId"
import Comments from "../components/Comments"
import { createBg, createColor } from "../theme"

const PostDetails = () => {
	const dispatch = useDispatch()
	const { post, posts, isLoading } = useSelector(state => state.posts)
	const history = useHistory()
	const { id } = useParams()

	useEffect(() => {
		dispatch(getPost(id))
	}, [id])

	useEffect(() => {
		if (post) dispatch(getPostsBySearch({ search: "none", tags: post?.tags.join(",") }))
	}, [post])

	const openPost = _id => history.push(`/posts/${_id}`)

	const recommendedPosts = posts?.filter(({ _id }) => _id !== post?._id)

	if (!post) return null

	return (
		<>
			{isLoading ? (
				<Stack p="8">
					<Skeleton borderRadius="lg" h="500px" />
				</Stack>
			) : (
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
								<Text fontSize="md" whiteSpace="pre-wrap">
									{post?.message}
								</Text>
							</Stack>

							{post?.selectedFile && (
								<Image
									alt={post?.title}
									borderRadius="lg"
									boxSize="650px"
									h="100%"
									loading="lazy"
									objectFit="contain"
									src={
										post?.selectedFile ||
										"https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
									}
								/>
							)}
						</Stack>

						<Stack direction="row" spacing="2">
							<Stack spacing="4">
								{post?.tags && (
									<Stack direction="row" spacing="2">
										{post?.tags.map(tag => (
											<Badge key={getRandomId()} bg="primary.400" color="white">
												<Link to={`/tags/${tag}`}>{` #${tag} `}</Link>
											</Badge>
										))}
									</Stack>
								)}
								<Stack
									direction={{ sm: "column", md: "column", lg: "row", xl: "row" }}
									spacing="2"
								>
									<Text fontSize="lg">Created by:</Text>
									<Text fontSize="lg" fontWeight="bold">
										<Link to={`/creators/${post.name}`}>{` ${post.name}`}</Link>
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

						<Divider colorScheme="primary" />

						<Text fontSize="lg" fontWeight="bold" id="comments">
							Comments
						</Text>
						<Comments post={post} />
					</Stack>

					{!!recommendedPosts?.length && (
						<>
							<Divider colorScheme="primary" />

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
												bg={createBg("primary", 100, 900)}
												borderRadius="lg"
												className="recommended-post"
												color={createColor("primary", 600, 100)}
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
														boxSize="300px"
														loading="lazy"
														objectFit="cover"
														src={selectedFile}
													/>
												)}
											</Stack>
										)
									)}
								</Stack>
							</Stack>
						</>
					)}
				</Stack>
			)}
		</>
	)
}

export default PostDetails
