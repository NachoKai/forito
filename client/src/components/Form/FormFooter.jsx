import { Button, DrawerFooter, Stack } from '@chakra-ui/react'
import PropTypes from 'prop-types'

import { CreateGradColor } from '../../theme.ts'
import getThemeColor from '../../utils/getThemeColor.ts'

function FormFooter({ handleClear, handleSubmit, isSubmitDisabled }) {
	return (
		<DrawerFooter w='100%'>
			<Stack spacing='4' w='100%'>
				<Button
					bgGradient={CreateGradColor('primary', 400, 800, 100, 400)}
					boxShadow={() => getThemeColor()}
					data-cy='form-submit-button'
					disabled={isSubmitDisabled}
					onClick={handleSubmit}
				>
					Submit
				</Button>
				<Button data-cy='form-clear-button' variant='outline' onClick={handleClear}>
					Clear
				</Button>
			</Stack>
		</DrawerFooter>
	)
}

export default FormFooter

FormFooter.propTypes = {
	handleClear: PropTypes.func,
	handleSubmit: PropTypes.func,
	isSubmitDisabled: PropTypes.bool,
}
