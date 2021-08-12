import { FaRegThumbsUp, FaThumbsUp } from "react-icons/fa"

const Likes = ({ likes, isUserLike }) => {
	const likesQuantity = likes?.length

	if (likesQuantity > 0) {
		return isUserLike ? (
			<>
				<FaThumbsUp fontSize="small" />
				&nbsp;
				{likesQuantity > 2
					? `You and ${likesQuantity - 1} others`
					: `${likesQuantity} like${likesQuantity > 1 ? "s" : ""}`}
			</>
		) : (
			<>
				<FaRegThumbsUp fontSize="small" />
				&nbsp;{likesQuantity} {likesQuantity === 1 ? "Like" : "Likes"}
			</>
		)
	}

	return (
		<>
			<FaRegThumbsUp fontSize="small" />
			&nbsp;Like
		</>
	)
}

export default Likes
