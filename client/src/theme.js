import { extendTheme, theme, useColorModeValue } from '@chakra-ui/react'
import { createBreakpoints } from '@chakra-ui/theme-tools'
import '@fontsource/roboto'
import '@fontsource/roboto-slab'

const colors = {
	primary: theme.colors.blue,
}

const fonts = {
	body: 'Roboto, sans-serif',
	heading: 'Roboto Slab, serif',
	mono: 'Menlo, monospace',
}

const breakpoints = createBreakpoints({
	sm: '320px',
	md: '500px',
	lg: '960px',
	xl: '1200px',
})

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
			_light: 'primary.100',
			_dark: 'primary.600',
		},
		primary_100_900: {
			_light: 'primary.100',
			_dark: 'primary.900',
		},
		primary_50_800: {
			_light: 'primary.50',
			_dark: 'primary.800',
		},
		red_500_200: {
			_light: 'red.500',
			_dark: 'red.200',
		},
		primary_600_100: {
			_light: 'primary.600',
			_dark: 'primary.100',
		},
		primary_800_100: {
			_light: 'primary.800',
			_dark: 'primary.100',
		},
		gray_700_200: {
			_light: 'gray.700',
			_dark: 'gray.200',
		},
		gray_200_700: {
			_light: 'gray.200',
			_dark: 'gray.700',
		},
	},
}

export default extendTheme({
	colors,
	fonts,
	breakpoints,
	config,
	shadows,
	semanticTokens,
})

export const CreateGradColor = (
	scheme,
	firstValue,
	secondValue,
	thirdValue,
	fourthValue,
	angle = 'to-l'
) =>
	useColorModeValue(
		`linear(${angle}, ${scheme}.${firstValue},${scheme}.${secondValue})`,
		`linear(${angle}, ${scheme}.${thirdValue},${scheme}.${fourthValue})`
	)
