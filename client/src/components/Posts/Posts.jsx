import { useSelector } from "react-redux"
import { Flex } from "@chakra-ui/react"

import { getAllPosts } from "../../redux/posts"
import Post from "./Post/Post"
import { useEffect } from "react"

const Posts = () => {
	const posts = useSelector(getAllPosts)

	useEffect(() => {
		console.log(posts)
	}, [posts])

	return (
		<Flex>
			<Post />
			<Post />
			<Post />
		</Flex>
	)
}

export default Posts
