import { extendTheme, theme, useColorModeValue } from "@chakra-ui/react"
import { createBreakpoints } from "@chakra-ui/theme-tools"

const colors = {
	primary: theme.colors["purple"],
}

const fonts = {
	body: "system-ui, sans-serif",
	heading: "system-ui, sans-serif",
	mono: "Menlo, monospace",
}

const breakpoints = createBreakpoints({
	sm: "320px",
	md: "768px",
	lg: "960px",
	xl: "1200px",
})

const config = {
	initialColorMode: "light",
	useSystemColorMode: false,
}

export default extendTheme({
	colors,
	fonts,
	breakpoints,
	config,
})

export const createBg = (scheme, firstValue, secondValue) => {
	return useColorModeValue(`${scheme}.${firstValue}`, `${scheme}.${secondValue}`)
}

export const createColor = (scheme, firstValue, secondValue) => {
	return useColorModeValue(`${scheme}.${firstValue}`, `${scheme}.${secondValue}`)
}

export const createGradColor = (
	scheme,
	firstValue,
	secondValue,
	thirdValue,
	fourthValue
) => {
	return useColorModeValue(
		`linear(to-l, ${scheme}.${firstValue},${scheme}.${secondValue})`,
		`linear(to-l, ${scheme}.${thirdValue},${scheme}.${fourthValue})`
	)
}
