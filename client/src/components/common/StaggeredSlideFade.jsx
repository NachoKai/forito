import { SlideFade, Stack } from '@chakra-ui/react'
import { Children, isValidElement } from 'react'

const StaggeredSlideFade = ({ children, ...props }) => {
	return (
		<Stack {...props}>
			{Children.map(children, (child, index) => {
				if (!isValidElement(child)) return null

				return (
					<SlideFade
						key={index}
						in
						transition={{ enter: { duration: 0.6, delay: 0.1 * index } }}
					>
						{child}
					</SlideFade>
				)
			})}
		</Stack>
	)
}

export default StaggeredSlideFade
