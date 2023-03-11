import { Spinner, Stack, useColorMode } from '@chakra-ui/react'
import styled from '@emotion/styled'

import { getThemeColor } from '../../utils/getThemeColor.ts'

export const Loading = () => {
	const { colorMode } = useColorMode()

	return (
		<Container bg={colorMode === 'light' ? 'rgb(255 255 255 / 40%)' : 'rgb(0 0 0 / 40%)'}>
			<SpinnerContainer>
				<Spinner
					color={() => `${getThemeColor()}.500`}
					emptyColor='gray.200'
					size='xl'
					speed='0.65s'
					thickness='8px'
				/>
			</SpinnerContainer>
		</Container>
	)
}

const Container = styled(Stack)`
	position: fixed;
	top: 0;
	left: 0;
	z-index: 9998;
	width: 100vw;
	height: 100vh;
	backdrop-filter: blur(15px);
	overflow: hidden;
	overscroll-behavior: none;
	pointer-events: none;
`

const SpinnerContainer = styled.div`
	z-index: 9999;
	position: absolute;
	top: 50%;
	left: 50%;
	overscroll-behavior: none;
	pointer-events: none;
`
