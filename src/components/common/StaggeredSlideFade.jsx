import { Children, isValidElement } from 'react'
import { SlideFade, Stack } from '@chakra-ui/react'
import PropTypes from 'prop-types'

export const StaggeredSlideFade = ({ children, ...props }) => {
	return (
		<Stack {...props}>
			{Children.map(children, (child, index) => {
				if (!isValidElement(child)) return null

				return (
					<SlideFade
						key={index}
						in
						transform='translateZ(0)'
						transition={{ enter: { duration: 0.6, delay: 0.2 * index } }}
					>
						{child}
					</SlideFade>
				)
			})}
		</Stack>
	)
}

StaggeredSlideFade.propTypes = {
	children: PropTypes.node,
}
