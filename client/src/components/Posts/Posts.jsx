import { useEffect } from "react"
import { useSelector } from "react-redux"
import { Flex, CircularProgress } from "@chakra-ui/react"

import { getAllPosts } from "../../redux/posts"
import Post from "../Post/Post"

const Posts = ({ setCurrentId }) => {
	const posts = useSelector(getAllPosts)
	const havePosts = posts.length > 0

	useEffect(() => {}, [])

	return (
		<Flex justify="center" align="center" flexGrow>
			{!havePosts ? (
				<CircularProgress isIndeterminate color="primary.200" />
			) : (
				<Flex direction="column">
					{posts.map(post => (
						<Post key={post._id} post={post} setCurrentId={setCurrentId} />
					))}
				</Flex>
			)}
		</Flex>
	)
}

export default Posts
