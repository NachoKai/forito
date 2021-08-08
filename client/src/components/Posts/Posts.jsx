import { useSelector } from "react-redux"
import { Flex, Stack, Text } from "@chakra-ui/react"
import { FaPencilAlt } from "react-icons/fa"

import { getAllPosts } from "../../redux/posts"
import Post from "../Post/Post"

const Posts = ({ setCurrentId }) => {
	const posts = useSelector(getAllPosts)
	const havePosts = posts.length > 0

	return (
		<Flex flexGrow align="center" justify="center" w="100%">
			{!havePosts ? (
				<Flex align="center" direction="column" justify="center">
					<Text color="primary.400" fontSize="6xl">
						<FaPencilAlt />
					</Text>
					<Text color="primary.400" fontSize="6xl">
						No posts yet
					</Text>
				</Flex>
			) : (
				<Stack direction="column" spacing={8} w="100%">
					{posts.map(post => (
						<Post key={post._id} post={post} setCurrentId={setCurrentId} />
					))}
				</Stack>
			)}
		</Flex>
	)
}

export default Posts
