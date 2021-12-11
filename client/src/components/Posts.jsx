import { useSelector } from "react-redux"
import { Flex, Heading, Skeleton, Stack, Text } from "@chakra-ui/react"
import { FaPencilAlt } from "react-icons/fa"

import Post from "./Post"
import { CreateGradColor } from "../theme"

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
						<Stack align="center" direction="column" marginY="64px" spacing="4">
							<Text color="primary.400" fontSize="6xl">
								<FaPencilAlt />
							</Text>
							<Heading
								as="h2"
								bgClip="text"
								bgGradient={CreateGradColor("primary", 300, 900, 50, 400)}
								fontSize="4xl"
								fontWeight="bold"
							>
								No posts found
							</Heading>
						</Stack>
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
