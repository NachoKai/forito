import { Spinner, useColorMode } from '@chakra-ui/react'
import React from 'react'

import { getThemeColor } from '../../utils/getThemeColor.ts'

export const Loading = () => {
	const { colorMode } = useColorMode()

	return (
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
	)
}
