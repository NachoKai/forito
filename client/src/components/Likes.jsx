import { Stack, Text } from "@chakra-ui/react"
import { FaRegThumbsUp, FaThumbsUp } from "react-icons/fa"

const Likes = ({ likes, isUserLike }) => {
	const likesQuantity = likes?.length

	if (likesQuantity > 0) {
		return isUserLike ? (
			<Stack direction="row" spacing="2">
				<FaThumbsUp fontSize="small" />
				<Text>
					{likesQuantity > 2
						? `You and ${likesQuantity - 1} others`
						: `${likesQuantity} Like${likesQuantity > 1 ? "s" : ""}`}
				</Text>
			</Stack>
		) : (
			<Stack direction="row" spacing="2">
				<FaRegThumbsUp fontSize="small" />
				<Text>
					{likesQuantity} {likesQuantity === 1 ? "Like" : "Likes"}
				</Text>
			</Stack>
		)
	}

	return (
		<Stack direction="row" spacing="2">
			<FaRegThumbsUp fontSize="small" />
			<Text>Like</Text>
		</Stack>
	)
}

export default Likes
