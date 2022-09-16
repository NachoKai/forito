import { Skeleton, SkeletonText, Stack } from '@chakra-ui/react'
import PropTypes from 'prop-types'

export const Loading = ({ height = '500px' }) => (
	<Stack
		bg='primary_100_900'
		borderRadius='24px'
		boxShadow='lg'
		direction={{
			sm: 'column-reverse',
			md: 'column-reverse',
			lg: 'column-reverse',
			xl: 'row',
		}}
		h='100%'
		p={{ sm: '6', md: '8', lg: '8', xl: '8' }}
		spacing='16px'
		w='100%'
	>
		<SkeletonText
			endColor='gray.200'
			mt='4'
			noOfLines={Math.floor(Math.random() * 7) + 3}
			spacing='4'
			startColor='gray.600'
			w='100%'
		/>
		<Skeleton
			borderRadius='24px'
			endColor='gray.200'
			h={height}
			startColor='gray.600'
			w='100%'
		/>
	</Stack>
)

Loading.propTypes = {
	height: PropTypes.string,
}
