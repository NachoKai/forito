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

export default extendTheme({
	colors,
	fonts,
	breakpoints,
	config,
	shadows,
})

export const CreateBg = (scheme, firstValue, secondValue) => {
	return useColorModeValue(`${scheme}.${firstValue}`, `${scheme}.${secondValue}`)
}

export const CreateColor = (scheme, firstValue, secondValue) => {
	return useColorModeValue(`${scheme}.${firstValue}`, `${scheme}.${secondValue}`)
}

export const CreateGradColor = (
	scheme,
	firstValue,
	secondValue,
	thirdValue,
	fourthValue,
	angle = 'to-l'
) => {
	return useColorModeValue(
		`linear(${angle}, ${scheme}.${firstValue},${scheme}.${secondValue})`,
		`linear(${angle}, ${scheme}.${thirdValue},${scheme}.${fourthValue})`
	)
}
