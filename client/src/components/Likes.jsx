import { Stack, Text } from '@chakra-ui/react'
import { FaRegThumbsUp, FaThumbsUp } from 'react-icons/fa'
import PropTypes from 'prop-types'

const Likes = ({ likes, isUserLike }) => {
	const likesQuantity = likes?.length

	if (likesQuantity > 0) {
		return isUserLike ? (
			<Stack align='center' direction='row' spacing='2'>
				<FaThumbsUp fontSize='small' h='13px' w='13px' />
				<Text>
					{likesQuantity > 2
						? `You and ${likesQuantity - 1} others`
						: `${likesQuantity} Like${likesQuantity > 1 ? 's' : ''}`}
				</Text>
			</Stack>
		) : (
			<Stack align='center' direction='row' spacing='2'>
				<FaRegThumbsUp fontSize='small' h='13px' w='13px' />
				<Text>
					{likesQuantity} {likesQuantity === 1 ? 'Like' : 'Likes'}
				</Text>
			</Stack>
		)
	}

	return (
		<Stack align='center' direction='row' spacing='2'>
			<FaRegThumbsUp fontSize='small' h='13px' w='13px' />
			<Text>Like</Text>
		</Stack>
	)
}

export default Likes

Likes.propTypes = {
	likes: PropTypes.array,
	isUserLike: PropTypes.string,
}
