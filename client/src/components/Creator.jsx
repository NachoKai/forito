import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { Divider, Flex, Skeleton, Stack, Text } from "@chakra-ui/react"
import { FaSearch } from "react-icons/fa"

import { getPostsByCreator } from "../redux/posts"
import Post from "./Post"

const Creator = () => {
	const dispatch = useDispatch()
	const { name } = useParams()
	const { posts, isLoading } = useSelector(state => state.posts)

	useEffect(() => {
		dispatch(getPostsByCreator(name))
	}, [])

	if (!posts?.length && !isLoading) {
		return (
			<Flex align="center" direction="column" marginY="64px">
				<Text color="primary.400" fontSize="6xl" marginBottom="16px">
					<FaSearch />
				</Text>
				<Text color="primary.400" fontSize="4xl">
					No posts created by {name} were found
				</Text>
			</Flex>
		)
	}

	return (
		<Stack borderRadius="lg" p="32px" spacing="8">
			<Stack spacing="2">
				<Text fontSize="2xl">{name}</Text>
				<Text fontSize="md">
					{posts?.length
						? posts.length !== 1
							? `${posts.length} Posts`
							: `${posts.length} Post`
						: ""}
				</Text>
			</Stack>

			<Divider colorScheme="primary" />

			{isLoading ? (
				<Skeleton borderRadius="lg" h="500px" />
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
