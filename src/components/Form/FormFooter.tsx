import { Button, DrawerFooter, Stack } from '@chakra-ui/react'

import { CreateGradColor } from '../../theme'

interface FormFooterProps {
	handleClear: () => void
	handleSubmit: () => void
	isSubmitDisabled: boolean
}

export const FormFooter = ({
	handleClear,
	handleSubmit,
	isSubmitDisabled,
}: FormFooterProps) => {
	return (
		<DrawerFooter w='100%'>
			<Stack spacing='4' w='100%'>
				<Button
					bgGradient={CreateGradColor('primary', 400, 800, 100, 400)}
					className={isSubmitDisabled ? '' : 'button'}
					data-cy='form-submit-button'
					isDisabled={isSubmitDisabled}
					onClick={handleSubmit}
				>
					Submit
				</Button>
				<Button
					className={isSubmitDisabled ? '' : 'button'}
					data-cy='form-clear-button'
					isDisabled={isSubmitDisabled}
					variant='outline'
					onClick={handleClear}
				>
					Clear
				</Button>
			</Stack>
		</DrawerFooter>
	)
}
