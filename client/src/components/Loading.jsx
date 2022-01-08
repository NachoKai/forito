import { Skeleton, SkeletonText, Stack } from '@chakra-ui/react'
import { CreateBg } from '../theme'

const Loading = ({ height = '250px', invert }) => (
	<Stack
		bg={CreateBg('primary', 50, 800)}
		borderRadius='lg'
		boxShadow='lg'
		direction={
			invert
				? {
						sm: 'column',
						md: 'column',
						lg: 'column',
						xl: 'row',
				  }
				: {
						sm: 'column-reverse',
						md: 'column-reverse',
						lg: 'column-reverse',
						xl: 'row',
				  }
		}
		h='100%'
		p={{
			sm: '6',
			md: '8',
			lg: '8',
			xl: '8',
		}}
		spacing='16px'
		w='100%'
	>
		<SkeletonText
			endColor='gray.200'
			mt='4'
			noOfLines={Math.floor(Math.random() * 7) + 2}
			spacing='4'
			startColor='gray.600'
			w='100%'
		/>
		<Skeleton
			borderRadius='lg'
			endColor='gray.200'
			h={height}
			startColor='gray.600'
			w='100%'
		/>
	</Stack>
)

export default Loading
