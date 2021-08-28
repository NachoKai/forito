import { useSelector } from "react-redux"
import { Flex, Skeleton, Stack, Text } from "@chakra-ui/react"
import { FaPencilAlt } from "react-icons/fa"

import Post from "./Post"
import Pagination from "./Pagination"

const Posts = ({ setCurrentId, handleClick, searchQuery }) => {
	const { posts, isLoading } = useSelector(state => state.posts)
	const havePosts = posts?.length > 0

	return (
		<Flex flexGrow w="100%">
			{isLoading ? (
				<Stack spacing={8} w="100%">
					<Skeleton borderRadius="lg" h="500px" />
				</Stack>
			) : (
				<Stack direction="column" spacing={8} w="100%">
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
								handleClick={handleClick}
								post={post}
								setCurrentId={setCurrentId}
							/>
						))
					)}
					{!searchQuery && <Pagination />}
				</Stack>
			)}
		</Flex>
	)
}

export default Posts
