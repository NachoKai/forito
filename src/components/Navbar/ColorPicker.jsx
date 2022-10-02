import {
	Button,
	Center,
	Popover,
	PopoverArrow,
	PopoverBody,
	PopoverCloseButton,
	PopoverContent,
	PopoverHeader,
	PopoverTrigger,
	SimpleGrid,
} from '@chakra-ui/react'
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

	return (
		<Popover variant='picker'>
			<PopoverTrigger>
				<Button
					aria-label={color}
					background={color}
					borderRadius={3}
					className='button'
					height='22px'
					minWidth='unset'
					padding={0}
					width='22px'
				/>
			</PopoverTrigger>
			<PopoverContent className='button' width='170px'>
				<PopoverArrow bg={color} />
				<PopoverCloseButton color='white' />
				<PopoverHeader
					backgroundColor={color}
					borderTopLeftRadius={5}
					borderTopRightRadius={5}
					color='white'
					height='100px'
				>
					<Center height='100%'>{color}</Center>
				</PopoverHeader>
				<PopoverBody height='70px'>
					<SimpleGrid columns={5} spacing={2}>
						{colors?.map(color => (
							<Button
								key={color}
								_hover={{ background: color }}
								aria-label={color}
								background={color}
								borderRadius={3}
								className='button'
								height='22px'
								minWidth='unset'
								padding={0}
								width='22px'
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
