import { Theme } from '@chakra-ui/react'

export const getColorTheme = (theme: Theme) => {
	const selectedTheme: string | null = localStorage.getItem('forito-theme')

	if (selectedTheme) {
		switch (selectedTheme) {
			case 'red.500':
				return theme.colors.red
			case 'orange.400':
				return theme.colors.orange
			case 'yellow.300':
				return theme.colors.yellow
			case 'green.500':
				return theme.colors.green
			case 'teal.300':
				return theme.colors.teal
			case 'blue.500':
				return theme.colors.blue
			case 'cyan.400':
				return theme.colors.cyan
			case 'purple.500':
				return theme.colors.purple
			case 'pink.400':
				return theme.colors.pink
			case 'gray.500':
				return theme.colors.gray
			default:
				return theme.colors.blue
		}
	} else {
		return theme.colors.blue
	}
}
