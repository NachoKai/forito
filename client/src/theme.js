import { extendTheme, theme, useColorModeValue } from "@chakra-ui/react"
import { createBreakpoints } from "@chakra-ui/theme-tools"

const colors = {
	primary: theme.colors.purple,
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
	angle = "to-l"
) => {
	return useColorModeValue(
		`linear(${angle}, ${scheme}.${firstValue},${scheme}.${secondValue})`,
		`linear(${angle}, ${scheme}.${thirdValue},${scheme}.${fourthValue})`
	)
}
