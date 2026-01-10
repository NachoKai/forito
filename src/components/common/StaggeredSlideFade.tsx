import { Children, ReactNode, isValidElement } from 'react'
import { SlideFade, Stack, StackProps } from '@chakra-ui/react'

interface StaggeredSlideFadeProps extends StackProps {
	children: ReactNode
}

export const StaggeredSlideFade = ({ children, ...props }: StaggeredSlideFadeProps) => {
	return (
		<Stack {...props}>
			{Children.map(children, (child, index) => {
				if (!isValidElement(child)) return null

				return (
					<SlideFade
						key={index}
						in
						style={{ transform: 'translateZ(0)' }}
						transition={{ enter: { duration: 0.6, delay: 0.2 * index } }}
					>
						{child}
					</SlideFade>
				)
			})}
		</Stack>
	)
}
