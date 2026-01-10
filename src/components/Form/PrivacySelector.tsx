import { HStack, Radio, RadioGroup } from '@chakra-ui/react'

interface PrivacySelectorProps {
	handlePrivacy: (privacy: string) => void
	privacy: string
}

export const PrivacySelector = ({ handlePrivacy, privacy }: PrivacySelectorProps) => {
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
