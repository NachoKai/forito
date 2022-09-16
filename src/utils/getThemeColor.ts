export const getThemeColor = (): string => {
	const selectedTheme: string | null = localStorage.getItem('forito-theme')

	switch (selectedTheme) {
		case 'blue.500':
			return 'blue'
		case 'green.500':
			return 'green'
		case 'purple.500':
			return 'purple'
		case 'red.500':
			return 'red'
		case 'teal.300':
			return 'teal'
		case 'yellow.300':
			return 'yellow'
		case 'orange.400':
			return 'orange'
		case 'cyan.400':
			return 'cyan'
		case 'pink.400':
			return 'pink'
		case 'gray.500':
			return 'gray'
		default:
			return 'blue'
	}
}
