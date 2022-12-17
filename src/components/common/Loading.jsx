import { Spinner, useColorMode } from '@chakra-ui/react'
import styled from 'styled-components'

import { getThemeColor } from '../../utils/getThemeColor.ts'

export const Loading = () => {
	const { colorMode } = useColorMode()

	return (
		<Container>
			<div
				className={
					colorMode === 'light' ? 'loading-background-light' : 'loading-background-dark'
				}
			>
				<div className='loading-bar'>
					<Spinner
						className='loading-circle'
						color={() => `${getThemeColor()}.500`}
						emptyColor='gray.200'
						size='xl'
						speed='0.65s'
						thickness='8px'
					/>
				</div>
			</div>
		</Container>
	)
}

const Container = styled.div`
	pointer-events: none;
	position: fixed;
	top: 0;
	left: 0;
	z-index: 9998;
	width: 100vw;
	height: 100vh;
	pointer-events: none;
	backdrop-filter: blur(15px);

	.loading-background-light {
		pointer-events: none;
		background: rgb(255 255 255 / 40%);
	}

	.loading-background-dark {
		pointer-events: none;
		background: rgb(0 0 0 / 40%);
	}

	.loading-bar .loading-circle {
		z-index: 9999;
		position: absolute;
		top: 50%;
		left: 50%;
		pointer-events: none;
		cursor: progress;
	}
`
