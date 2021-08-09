import { FaRegThumbsUp, FaThumbsUp } from "react-icons/fa"
import { getUser } from "../../utils/getUser"

const Likes = ({ likes }) => {
	const user = getUser()
	const likesQuantity = likes?.length

	if (likesQuantity > 0) {
		return likes.find(like => like === (user?.result?.googleId || user?.result?._id)) ? (
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
