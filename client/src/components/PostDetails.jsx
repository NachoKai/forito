import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
	AspectRatio,
	Badge,
	Button,
	Divider,
	Flex,
	Heading,
	Image,
	Stack,
	Text,
} from "@chakra-ui/react"
import { formatDistance } from "date-fns"
import { Link, useNavigate, useParams } from "react-router-dom"
import { FaTwitter } from "react-icons/fa"

import { getPost, getPostsBySearch } from "../redux/posts"
import { getRandomId } from "../utils/getRandomId"
import Comments from "../components/Comments"
import { CreateBg, CreateColor } from "../theme"
import Loading from "./Loading"

const PostDetails = () => {
	const dispatch = useDispatch()
	const { post, posts, isLoading } = useSelector(state => state.posts)
	const navigate = useNavigate()
	const { id } = useParams()
	const openPost = _id => navigate(`/posts/${_id}`)
	const recommendedPosts = posts.filter(({ _id }) => _id !== post?._id)

	const isDev = process.env.NODE_ENV !== "production"
	const baseURL = isDev
		? "http://localhost:3000/posts"
		: "https://forito.vercel.app/posts"

	const shareOnTwitter = () => {
		const linkToGo = `${baseURL}/${id}`

		window.open(
			`https://twitter.com/intent/tweet?text=${linkToGo}`,
			"targetWindow",
			"toolbar=no,location=0,status=no,menubar=no,scrollbars=yes,resizable=yes,width=600,height=300"
		)

		return false
	}

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
					<Loading height="600px" />
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
									flexGrow="1"
									loading="lazy"
									maxH="90vh"
									maxW={{ sm: "100vw", md: "100vw", lg: "50vw", xl: "50vw" }}
									objectFit="contain"
									src={post?.selectedFile}
									w="100%"
								/>
							)}
						</Stack>

						<Stack direction="row" spacing="2">
							<Stack spacing="4" w="100%">
								{post?.tags && (
									<Stack direction="row" spacing="2">
										{post?.tags.map(tag => (
											<Badge key={getRandomId()} bg="primary.400" color="white">
												<Link to={`/tags/${tag}`}>{` #${tag} `}</Link>
											</Badge>
										))}
									</Stack>
								)}
								<Flex align="center" justify="space-between" w="100%">
									<Stack
										direction={{ sm: "column", md: "column", lg: "row", xl: "row" }}
										spacing="2"
									>
										<Text fontSize="lg">Created by:</Text>
										<Text fontSize="lg" fontWeight="bold">
											<Link to={`/creator/${post?.creator}`}>{` ${post?.name}`}</Link>
										</Text>
										<Text fontSize="lg">
											{formatDistance(
												new Date(),
												post?.createdAt ? new Date(post?.createdAt) : new Date()
											) + " ago"}
										</Text>
									</Stack>
									<Stack
										align="flex-start"
										direction="row"
										h="100%"
										justify="flex-end"
										spacing="8px"
									>
										<Button
											colorScheme="primary"
											rightIcon={<FaTwitter />}
											size="xs"
											onClick={() => shareOnTwitter()}
										>
											Share
										</Button>
									</Stack>
								</Flex>
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
												color={CreateColor("primary", 800, 100)}
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
												<Text>
													{name}{" "}
													{formatDistance(
														new Date(),
														post?.createdAt ? new Date(post?.createdAt) : new Date()
													) + " ago"}
												</Text>
												<Stack spacing="4">
													<Text noOfLines={[2, 4, 6]}>{message}</Text>
													{selectedFile && (
														<AspectRatio maxH="80vh" ratio={1} w="100%">
															<Image
																alt={post?.title}
																borderRadius="lg"
																flexGrow="1"
																loading="lazy"
																objectFit="cover"
																src={selectedFile}
																w="100%"
															/>
														</AspectRatio>
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
