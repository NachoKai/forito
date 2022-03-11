import { Children, isValidElement } from 'react'
import { SlideFade, Stack } from '@chakra-ui/react'
import PropTypes from 'prop-types'

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

StaggeredSlideFade.propTypes = {
	children: PropTypes.node.isRequired,
}
