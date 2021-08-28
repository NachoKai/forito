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

export const createBg = (firstValue, secondValue) => {
	return useColorModeValue(`primary.${firstValue}`, `primary.${secondValue}`)
}

export const createColor = (firstValue, secondValue) => {
	return useColorModeValue(`primary.${firstValue}`, `primary.${secondValue}`)
}
