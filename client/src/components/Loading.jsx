import { Skeleton, SkeletonText, Stack } from "@chakra-ui/react"
import { CreateBg } from "../theme"

const Loading = ({ height = "250px" }) => {
	return (
		<Stack
			bg={CreateBg("primary", 50, 800)}
			borderRadius="lg"
			boxShadow="lg"
			direction="row"
			h="100%"
			p="8"
			spacing="16px"
			w="100%"
		>
			<SkeletonText
				endColor="gray.200"
				mt="4"
				noOfLines={6}
				spacing="4"
				startColor="gray.600"
				w="100%"
			/>
			<Skeleton
				borderRadius="lg"
				endColor="gray.200"
				h={height}
				startColor="gray.600"
				w="100%"
			/>
		</Stack>
	)
}

export default Loading
