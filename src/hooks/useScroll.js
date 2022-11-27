import { useBoolean } from '@chakra-ui/react'

export const useScroll = () => {
	const [showScroll, setShowScroll] = useBoolean()

	const checkScrollTop = () => {
		if (!showScroll && window.scrollY > 400) {
			setShowScroll.on()
		} else if (showScroll && window.scrollY <= 400) {
			setShowScroll.off()
		}
	}

	const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

	return { checkScrollTop, scrollTop, showScroll }
}
