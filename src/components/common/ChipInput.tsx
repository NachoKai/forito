import { ChangeEvent, KeyboardEvent, MouseEvent } from 'react'
import { ChakraTagInput } from './ChakraTagInput'

export interface ChipInputProps {
	tags: string[]
	setTags: (tags: string[]) => void
}

export const ChipInput = ({ tags: _tags, setTags }: ChipInputProps) => {
	const handleTagsChange = (
		_event:
			| ChangeEvent<HTMLInputElement>
			| MouseEvent<HTMLElement>
			| KeyboardEvent<HTMLInputElement>,
		newTags: string[]
	) => {
		setTags([...new Set(newTags)])
	}

	return (
		<ChakraTagInput
			tags={_tags}
			wrapProps={{ w: '100%' }}
			onTagsChange={handleTagsChange}
		/>
	)
}
