import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Badge, Divider, Heading, Image, Skeleton, Stack, Text } from "@chakra-ui/react"
import { formatDistance } from "date-fns"
import { Link, useHistory, useParams } from "react-router-dom"

import { getPost, getPostsBySearch } from "../redux/posts"
import { getRandomId } from "../utils/getRandomId"
import Comments from "../components/Comments"
import { CreateBg, CreateColor } from "../theme"

const PostDetails = () => {
	const dispatch = useDispatch()
	const { post, posts, isLoading } = useSelector(state => state.posts)
	const history = useHistory()
	const { id } = useParams()
	const openPost = _id => history.push(`/posts/${_id}`)
	const recommendedPosts = posts.filter(({ _id }) => _id !== post?._id)

	useEffect(() => {
		dispatch(getPost(id))
	}, [dispatch, id])

	useEffect(() => {
		if (post) {
			dispatch(getPostsBySearch({ search: "none", tags: post?.tags.join(",") }))
		}
	}, [dispatch, post])

	return (
		<>
			{isLoading ? (
				<Stack minHeight="100vh" p="8">
					<Skeleton borderRadius="lg" h="600px" />
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
									src={post?.selectedFile}
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
										<Link to={`/creators/${post?.name}`}>{` ${post?.name}`}</Link>
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
										({ title, name, message, selectedFile, _id }) => (
											<Stack
												key={_id}
												bg={CreateBg("primary", 100, 900)}
												borderRadius="lg"
												className="recommended-post"
												color={CreateColor("primary", 600, 100)}
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
												<Stack spacing="4">
													<Text noOfLines={[2, 4, 6]}>{message}</Text>
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
