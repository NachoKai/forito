import { DrawerHeader, Text } from '@chakra-ui/react'

import { CreateGradColor } from '../../theme'

interface FormHeaderProps {
	currentId: string | null
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
