import { AspectRatio, Heading, Image, Skeleton, Stack, Text } from '@chakra-ui/react'
import { formatDistance } from 'date-fns'
import { Link, useNavigate } from 'react-router-dom'

import { PostI } from '../types'

interface RecommendedPostProps {
	post: PostI
}

export const RecommendedPost = ({ post }: RecommendedPostProps) => {
	const { _id, title, name, message, selectedFile, createdAt } = post
	const navigate = useNavigate()

	const openPost = () => navigate(`/posts/${_id}`)

	return (
		<Stack
			as={Link}
			bg='primary_100_900'
			borderRadius='24px'
			className=' container recommended-post'
			color='primary_800_100'
			cursor='pointer'
			h='100%'
			m='2'
			maxW='320px'
			minW='320px'
			p={{ sm: '6', md: '8', lg: '8', xl: '8' }}
			spacing='2'
			to={`/posts/${_id}`}
			onClick={openPost}
		>
			<Heading as='h2' fontSize='lg' fontWeight='bold' noOfLines={[1, 1, 2, 2]}>
				{title}
			</Heading>
			<Text fontSize='sm'>
				{name}{' '}
				{formatDistance(new Date(), createdAt ? new Date(createdAt) : new Date()) +
					' ago'}
			</Text>
			<Stack spacing='4'>
				<Text fontSize='md' noOfLines={[1, 2, 4, 5]}>
					{message}
				</Text>
				{selectedFile?.url && (
					<AspectRatio maxH='70vh' ratio={4 / 3} w='100%'>
						<Image
							alt={title}
							borderRadius='24px'
							fallback={
								<Skeleton borderRadius='24px' flexGrow='1' objectFit='cover' w='100%' />
							}
							flexGrow='1'
							objectFit='cover'
							src={selectedFile.url}
							w='100%'
						/>
					</AspectRatio>
				)}
			</Stack>
		</Stack>
	)
}
