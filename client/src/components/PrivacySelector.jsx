import { Radio, RadioGroup, Stack } from '@chakra-ui/react'
import PropTypes from 'prop-types'

const PrivacySelector = ({ handlePrivacy, privacy }) => {
	return (
		<RadioGroup
			defaultValue='public'
			name='privacy'
			value={privacy}
			onChange={privacy => handlePrivacy(privacy)}
		>
			<Stack direction='row'>
				<Radio value='public'>Public</Radio>
				<Radio value='private'>Private</Radio>
			</Stack>
		</RadioGroup>
	)
}

export default PrivacySelector

PrivacySelector.propTypes = {
	handlePrivacy: PropTypes.func,
	privacy: PropTypes.string,
}
