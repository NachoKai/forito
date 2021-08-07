import { useEffect } from "react"
import { useSelector } from "react-redux"
import { Flex, Grid, CircularProgress } from "@chakra-ui/react"

import { getAllPosts } from "../../redux/posts"
import Post from "../Post/Post"

const Posts = ({ setCurrentId }) => {
	const posts = useSelector(getAllPosts)
	const havePosts = posts.length > 0

	useEffect(() => {
		console.log(posts)
	}, [posts])

	return (
		<Flex flexGrow align="center" justify="center" w="100%">
			{!havePosts ? (
				<CircularProgress isIndeterminate color="primary.200" />
			) : (
				<Grid direction="column" gap={8} w="100%">
					{posts.map(post => (
						<Post key={post._id} post={post} setCurrentId={setCurrentId} />
					))}
				</Grid>
			)}
		</Flex>
	)
}

export default Posts
