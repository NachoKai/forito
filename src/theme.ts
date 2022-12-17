import {
	extendTheme,
	theme,
	useColorModeValue,
	withDefaultColorScheme,
} from '@chakra-ui/react'
import '@fontsource/roboto'
import '@fontsource/roboto-slab'

export const getColorTheme = () => {
	const selectedTheme: string | null = localStorage.getItem('forito-theme')

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
}

const colors = {
	primary: getColorTheme(),
}

const fonts = {
	body: 'Roboto, sans-serif',
	heading: 'Roboto Slab, serif',
	mono: 'Menlo, monospace',
}

const breakpoints = {
	sm: '320px',
	md: '500px',
	lg: '960px',
	xl: '1200px',
}

const config = {
	initialColorMode: 'light',
	useSystemColorMode: false,
}

const shadows = {
	blue: '0 10px 15px -3px #60a5faB3, 0 4px 6px -4px #60a5faB3',
	red: '0 10px 15px -3px #f87171B3, 0 4px 6px -4px #f87171B3',
}

const semanticTokens = {
	colors: {
		primary_100_600: {
			default: 'primary.100',
			_dark: 'primary.600',
		},
		primary_100_900: {
			default: 'primary.100',
			_dark: 'primary.900',
		},
		primary_900_100: {
			default: 'primary.900',
			_dark: 'primary.100',
		},
		bnw_900_100: {
			default: 'black',
			_dark: 'white',
		},
		bnw_100_900: {
			default: 'black',
			_dark: 'white',
		},
		primary_600_300: {
			default: 'primary.600',
			_dark: 'primary.300',
		},
		primary_500_200: {
			default: 'primary.500',
			_dark: 'primary.200',
		},
		primary_600_100: {
			default: 'primary.600',
			_dark: 'primary.100',
		},
		primary_800_100: {
			default: 'primary.800',
			_dark: 'primary.100',
		},
		gray_700_200: {
			default: 'gray.700',
			_dark: 'gray.200',
		},
		gray_200_700: {
			default: 'gray.200',
			_dark: 'gray.700',
		},
		primary_300_900_50_400: {
			default: 'linear(to-l, primary.300, primary.900)',
			_dark: 'linear(to-l, primary.50, primary.400)',
		},
		highlight: {
			default: 'yellow.100',
			_dark: 'yellow.600',
		},
	},
}

const spacing = {
	space: {
		px: '1px',
		0.5: '0.125rem',
		1: '0.25rem',
		1.5: '0.375rem',
		2: '0.5rem',
		2.5: '0.625rem',
		3: '0.75rem',
		3.5: '0.875rem',
		4: '1rem',
		5: '1.25rem',
		6: '1.5rem',
		7: '1.75rem',
		8: '2rem',
		9: '2.25rem',
		10: '2.5rem',
		12: '3rem',
		14: '3.5rem',
		16: '4rem',
		20: '5rem',
		24: '6rem',
		28: '7rem',
		32: '8rem',
		36: '9rem',
		40: '10rem',
		44: '11rem',
		48: '12rem',
		52: '13rem',
		56: '14rem',
		60: '15rem',
		64: '16rem',
		72: '18rem',
		80: '20rem',
		96: '24rem',
	},
}

export const themeConfig = extendTheme(
	{
		colors,
		fonts,
		breakpoints,
		config,
		shadows,
		semanticTokens,
		spacing,
	},
	withDefaultColorScheme({
		colorScheme: 'primary',
	})
)

export const CreateGradColor = (
	scheme: string,
	firstValue: number,
	secondValue: number,
	thirdValue: number,
	fourthValue: number,
	angle = 'to-l'
) =>
	useColorModeValue(
		`linear(${angle}, ${scheme}.${firstValue},${scheme}.${secondValue})`,
		`linear(${angle}, ${scheme}.${thirdValue},${scheme}.${fourthValue})`
	)
