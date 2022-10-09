import { Stack, Text } from '@chakra-ui/react'
import PropTypes from 'prop-types'
import { FaRegThumbsUp, FaThumbsUp } from 'react-icons/fa'

export const Likes = ({ likes, hasUserLike }) => {
	const likesQuantity = likes?.length

	if (likesQuantity > 0) {
		return hasUserLike ? (
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

Likes.propTypes = {
	likes: PropTypes.arrayOf(PropTypes.string),
	hasUserLike: PropTypes.bool,
}
