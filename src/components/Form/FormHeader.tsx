import { DrawerHeader, Text } from '@chakra-ui/react'
import PropTypes from 'prop-types'

import { CreateGradColor } from '../../theme'

interface FormHeaderProps {
	currentId: string
}

export const FormHeader = ({ currentId }: FormHeaderProps) => {
	return (
		<DrawerHeader>
			<Text
				bgClip='text'
				bgGradient={CreateGradColor('primary', 700, 900, 50, 200)}
				fontSize='xl'
				fontWeight='bold'
			>
				{currentId ? 'Edit' : 'Create'} Post ✏️
			</Text>
		</DrawerHeader>
	)
}

FormHeader.propTypes = {
	currentId: PropTypes.string,
}
