import { memo } from 'react'
import { HStack, Text } from '@chakra-ui/react'
import { FaRegThumbsUp, FaThumbsUp } from 'react-icons/fa'

interface LikesProps {
	likes?: string[]
	isLiked: boolean
	likeLoading: boolean
}

export const Likes = memo(({ likes, isLiked, likeLoading }: LikesProps) => {
	const likesQuantity = likeLoading
		? isLiked
			? likes?.length + 1
			: likes?.length - 1
		: likes?.length

	if (likesQuantity && likesQuantity > 0) {
		return isLiked ? (
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
})

Likes.displayName = 'Likes'
