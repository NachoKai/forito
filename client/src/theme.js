import { extendTheme, theme } from "@chakra-ui/react"
import { createBreakpoints } from "@chakra-ui/theme-tools"

const colors = {
	primary: theme.colors["purple"],
}

const fonts = {
	body: "system-ui, sans-serif",
	heading: "Georgia, serif",
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
