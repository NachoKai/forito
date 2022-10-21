import { HStack, Radio, RadioGroup } from '@chakra-ui/react'
import PropTypes from 'prop-types'

export const PrivacySelector = ({ handlePrivacy, privacy }) => {
	return (
		<RadioGroup
			defaultValue='public'
			name='privacy'
			value={privacy}
			onChange={privacy => handlePrivacy(privacy)}
		>
			<HStack>
				<Radio value='public'>Public</Radio>
				<Radio value='private'>Private</Radio>
			</HStack>
		</RadioGroup>
	)
}

PrivacySelector.propTypes = {
	handlePrivacy: PropTypes.func,
	privacy: PropTypes.string,
}
