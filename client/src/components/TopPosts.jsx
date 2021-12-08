// import { useSelector } from "react-redux"
// import { Flex, Skeleton, Stack, Text } from "@chakra-ui/react"
// import { FaPencilAlt } from "react-icons/fa"

// import Post from "./Post"

// const TopPosts = () => {
// 	const { posts, isLoading } = useSelector(state => state.posts)
// 	const havePosts = posts?.length > 0

// 	const getTopPosts = max => {
// 		if (!havePosts) return

// 		const sortedPosts = posts?.sort((a, b) => b.likes.length - a.likes.length)
// 		const slicedArray = sortedPosts?.slice(0, max)

// 		return slicedArray
// 	}

// 	const topPosts = getTopPosts(5)

// 	return (
// 		<Flex flexGrow direction="column" minHeight="100vh" p="8" w="100%">
// 			<Text color="primary.400" fontSize="6xl">
// 				Top Posts
// 			</Text>

// 			{isLoading ? (
// 				<Stack minHeight="100vh" spacing="8" w="100%">
// 					<Skeleton borderRadius="lg" h="250px" />
// 					<Skeleton borderRadius="lg" h="250px" />
// 					<Skeleton borderRadius="lg" h="250px" />
// 					<Skeleton borderRadius="lg" h="250px" />
// 					<Skeleton borderRadius="lg" h="250px" />
// 				</Stack>
// 			) : (
// 				<Stack direction="column" spacing="8" w="100%">
// 					{!havePosts ? (
// 						<Flex align="center" direction="column" marginY="64px">
// 							<Text color="primary.400" fontSize="6xl">
// 								<FaPencilAlt />
// 							</Text>
// 							<Text color="primary.400" fontSize="6xl">
// 								No posts found
// 							</Text>
// 						</Flex>
// 					) : (
// 						topPosts?.map(post => <Post key={post?._id} post={post} />)
// 					)}
// 				</Stack>
// 			)}
// 		</Flex>
// 	)
// }

// export default TopPosts
