// import { useEffect } from "react"
// import { useParams } from "react-router-dom"
// import { useDispatch, useSelector } from "react-redux"
import { Divider, Flex, Heading, Skeleton, Stack, Text } from "@chakra-ui/react"
import { FaSearch } from "react-icons/fa"
import { CreateGradColor } from "../theme"

// import { getPostsByCreator } from "../redux/posts"
import Post from "./Post"

const SavedPosts = () => {
	const posts = []
	const isLoading = false

	if (!posts?.length && !isLoading) {
		return (
			<Flex align="center" direction="column" h="100%" marginY="64px" minHeight="100vh">
				<Text color="primary.400" fontSize="6xl" marginBottom="16px">
					<FaSearch />
				</Text>
				<Heading
					as="h2"
					bgClip="text"
					bgGradient={CreateGradColor("primary", 300, 900, 50, 400)}
					fontSize="4xl"
					fontWeight="bold"
				>
					No saved posts
				</Heading>
			</Flex>
		)
	}

	return (
		<Stack borderRadius="lg" h="100%" minHeight="100vh" p="32px" spacing="8">
			<Stack spacing="2">
				<Text fontSize="2xl">{name}</Text>
				<Text fontSize="md">
					{posts?.length
						? posts.length !== 1
							? `${posts.length} Posts saved`
							: `${posts.length} Post saved`
						: ""}
				</Text>
			</Stack>

			<Divider colorScheme="primary" />

			{isLoading ? (
				<>
					<Skeleton borderRadius="lg" h="250px" />
					<Skeleton borderRadius="lg" h="250px" />
					<Skeleton borderRadius="lg" h="250px" />
					<Skeleton borderRadius="lg" h="250px" />
					<Skeleton borderRadius="lg" h="250px" />
				</>
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

export default SavedPosts
