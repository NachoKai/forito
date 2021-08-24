import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { Divider, Flex, Skeleton, Stack, Text } from "@chakra-ui/react"

import { getPostsBySearch } from "../redux/posts"
import Post from "./Post"

const Tags = () => {
	const { name } = useParams()
	const dispatch = useDispatch()
	const { posts, isLoading } = useSelector(state => state.posts)

	useEffect(() => {
		dispatch(getPostsBySearch({ tags: name }))
	}, [])

	if (!posts.length && !isLoading) {
		return (
			<Flex align="center" direction="column" marginY="64px">
				<Text color="primary.400" fontSize="6xl">
					No posts found for &quot;#{name}&quot;
				</Text>
			</Flex>
		)
	}

	return (
		<Stack borderRadius="lg" p="32px" spacing="8">
			<Stack spacing="2">
				<Text fontSize="2xl">#{name?.toUpperCase()}</Text>
				<Text fontSize="md">
					{posts.length ? posts.length : "..."} {posts.length !== 1 ? "Posts" : "Post"}
				</Text>
			</Stack>
			<Divider />
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

export default Tags
