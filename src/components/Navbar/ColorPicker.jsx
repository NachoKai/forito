import {
	Button,
	Center,
	Popover,
	PopoverBody,
	PopoverCloseButton,
	PopoverContent,
	PopoverHeader,
	PopoverTrigger,
	SimpleGrid,
} from '@chakra-ui/react'
import {} from 'lodash/fp'
import { useState } from 'react'

const colors = [
	'red.500',
	'orange.400',
	'yellow.300',
	'green.500',
	'teal.300',
	'blue.500',
	'cyan.400',
	'purple.500',
	'pink.400',
	'gray.500',
]

export const ColorPicker = () => {
	const [color, setColor] = useState(localStorage.getItem('forito-theme') || 'blue.500')
	const colorName = color?.split('.')[0]?.toUpperCase() || 'BLUE'

	return (
		<Popover variant='picker'>
			<PopoverTrigger>
				<Button
					aria-label={color}
					bg={color}
					border='1px solid #0d0d0d'
					borderRadius={3}
					className='button'
					h='22px'
					minW='unset'
					p='0'
					w='22px'
				/>
			</PopoverTrigger>
			<PopoverContent border='1px solid #0d0d0d !important' className='button' w='170px'>
				<PopoverCloseButton color='white' />
				<PopoverHeader
					backgroundColor={color}
					borderTopLeftRadius={5}
					borderTopRightRadius={5}
					color={colorName === 'YELLOW' ? 'black' : 'white'}
					h='100px'
				>
					<Center fontWeight={600} h='100%'>
						{colorName}
					</Center>
				</PopoverHeader>
				<PopoverBody h='70px'>
					<SimpleGrid columns={5} spacing={2}>
						{colors?.map(color => (
							<Button
								key={color}
								_hover={{ background: color }}
								aria-label={color}
								bg={color}
								border='1px solid #0d0d0d'
								borderRadius={3}
								className='button'
								h='22px'
								minW='unset'
								p='0'
								w='22px'
								onClick={() => {
									localStorage.setItem('forito-theme', color)
									setColor(color)
									location.reload()
								}}
							/>
						))}
					</SimpleGrid>
				</PopoverBody>
			</PopoverContent>
		</Popover>
	)
}
