import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { Divider, Flex, Heading, Stack, Text } from "@chakra-ui/react"
import { FaSearch } from "react-icons/fa"

import { getPostsByCreator } from "../redux/posts"
import Post from "./Post"
import { CreateGradColor } from "../theme"
import { getUser } from "../redux/auth"
import Loading from "./Loading"

const Creator = () => {
	const dispatch = useDispatch()
	const { id } = useParams()
	const { posts, isLoading } = useSelector(state => state.posts)
	const { user } = useSelector(state => state.auth)

	useEffect(() => {
		dispatch(getPostsByCreator(id))
	}, [dispatch, id])

	useEffect(() => {
		dispatch(getUser(id))
	}, [dispatch, id])

	if (!posts?.length && !isLoading) {
		return (
			<Flex align="center" direction="column" h="100%" marginY="64px" minHeight="100vh">
				<Text color="primary.400" fontSize="6xl" marginBottom="16px">
					<FaSearch />
				</Text>
				<Heading
					as="h2"
					bgClip="text"
					bgGradient={CreateGradColor("primary", 300, 900, 50, 400)}
					fontSize="4xl"
					fontWeight="bold"
				>
					{user?.name
						? `No posts created by ${user?.name} were found`
						: "No posts created were found"}
				</Heading>
			</Flex>
		)
	}

	return (
		<Stack borderRadius="lg" h="100%" minHeight="100vh" p="32px" spacing="8">
			<Stack spacing="2">
				<Text fontSize="2xl">{user?.name || ""}</Text>
				<Text fontSize="md">
					{!isLoading && posts?.length
						? posts.length !== 1
							? `${posts.length} Posts`
							: `${posts.length} Post`
						: ""}
				</Text>
			</Stack>

			<Divider colorScheme="primary" />

			{isLoading ? (
				<>
					<Loading />
					<Loading />
					<Loading />
					<Loading />
					<Loading />
				</>
			) : (
				<Stack spacing="3">
					{posts?.map(post => (
						<Stack key={post._id}>
							<Post post={post} />
						</Stack>
					))}
				</Stack>
			)}
		</Stack>
	)
}

export default Creator
