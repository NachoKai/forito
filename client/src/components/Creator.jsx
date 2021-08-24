import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { Divider, Skeleton, Stack, Text } from "@chakra-ui/react"

import { getPostsByCreator } from "../redux/posts"
import Post from "./Post"

const Creator = () => {
	const { name } = useParams()
	const dispatch = useDispatch()
	const { posts, isLoading } = useSelector(state => state.posts)

	useEffect(() => {
		dispatch(getPostsByCreator(name))
	}, [])

	if (!posts.length && !isLoading) return "No posts"

	return (
		<Stack borderRadius="lg" p="32px" spacing="8">
			<Stack spacing="2">
				<Text fontSize="2xl">{name}</Text>
				<Text fontSize="md">{posts.length} Posts</Text>
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

export default Creator
