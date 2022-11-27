import { HStack, Text } from '@chakra-ui/react'
import PropTypes from 'prop-types'
import { FaRegThumbsUp, FaThumbsUp } from 'react-icons/fa'

interface LikesProps {
	likes: string[]
	hasUserLike: boolean
}

export const Likes = ({ likes, hasUserLike }: LikesProps) => {
	const likesQuantity = likes?.length

	if (likesQuantity > 0) {
		return hasUserLike ? (
			<HStack align='center' spacing='2'>
				<FaThumbsUp fontSize='small' height='13px' width='13px' />
				<Text>
					{likesQuantity > 2
						? `You and ${likesQuantity - 1} others`
						: `${likesQuantity} Like${likesQuantity > 1 ? 's' : ''}`}
				</Text>
			</HStack>
		) : (
			<HStack align='center' spacing='2'>
				<FaRegThumbsUp fontSize='small' height='13px' width='13px' />
				<Text>
					{likesQuantity} {likesQuantity === 1 ? 'Like' : 'Likes'}
				</Text>
			</HStack>
		)
	}

	return (
		<HStack align='center' spacing='2'>
			<FaRegThumbsUp fontSize='small' height='13px' width='13px' />
			<Text>Like</Text>
		</HStack>
	)
}

Likes.propTypes = {
	likes: PropTypes.arrayOf(PropTypes.string),
	hasUserLike: PropTypes.bool,
}
