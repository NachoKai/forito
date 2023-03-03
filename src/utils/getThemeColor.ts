const COLORS = [
	'blue',
	'green',
	'purple',
	'red',
	'teal',
	'yellow',
	'orange',
	'cyan',
	'pink',
	'gray',
]

export const getThemeColor = (): string => {
	const selectedTheme: string | null = localStorage.getItem('forito-theme')

	if (!selectedTheme) return 'blue'
	const themeColor = selectedTheme.split('.')[0]

	return COLORS.includes(themeColor) ? themeColor : 'blue'
}
