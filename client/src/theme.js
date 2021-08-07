import { extendTheme, theme } from "@chakra-ui/react"
import { createBreakpoints } from "@chakra-ui/theme-tools"

const breakpoints = createBreakpoints({
	sm: "320px",
	md: "768px",
	lg: "960px",
	xl: "1200px",
})

export default extendTheme({
	colors: {
		primary: theme.colors["purple"],
	},
	fonts: {
		body: "system-ui, sans-serif",
		heading: "Georgia, serif",
		mono: "Menlo, monospace",
	},
	breakpoints,
})
