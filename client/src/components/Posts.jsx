import { useSelector } from "react-redux"
import { Flex, Skeleton, Stack, Text } from "@chakra-ui/react"
import { FaPencilAlt } from "react-icons/fa"

import Post from "./Post"

const Posts = ({ setCurrentId, handleScroll }) => {
	const { posts, isLoading } = useSelector(state => state.posts)
	const havePosts = posts?.length > 0

	return (
		<Flex flexGrow minHeight="100vh" w="100%">
			{isLoading ? (
				<Stack minHeight="100vh" spacing="8" w="100%">
					<Skeleton borderRadius="lg" h="250px" />
					<Skeleton borderRadius="lg" h="250px" />
					<Skeleton borderRadius="lg" h="250px" />
					<Skeleton borderRadius="lg" h="250px" />
					<Skeleton borderRadius="lg" h="250px" />
				</Stack>
			) : (
				<Stack direction="column" spacing="8" w="100%">
					{!havePosts ? (
						<Flex align="center" direction="column" marginY="64px">
							<Text color="primary.400" fontSize="6xl">
								<FaPencilAlt />
							</Text>
							<Text color="primary.400" fontSize="6xl">
								No posts found
							</Text>
						</Flex>
					) : (
						posts?.map(post => (
							<Post
								key={post?._id}
								handleScroll={handleScroll}
								post={post}
								setCurrentId={setCurrentId}
							/>
						))
					)}
				</Stack>
			)}
		</Flex>
	)
}

export default Posts
