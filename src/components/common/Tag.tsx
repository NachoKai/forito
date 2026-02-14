import {
	Tag,
	TagCloseButton,
	TagCloseButtonProps,
	TagLabel,
	TagLabelProps,
	TagProps,
} from '@chakra-ui/react'
import { MouseEvent, useCallback } from 'react'

export interface ChakraTagInputTagProps extends TagProps {
	onRemove?: (_event: MouseEvent<HTMLButtonElement>) => void
	tagLabelProps?: TagLabelProps
	tagCloseButtonProps?: TagCloseButtonProps
}

export const ChakraTagInputTag = ({
	children,
	onRemove,
	tagLabelProps,
	tagCloseButtonProps,
	...props
}: ChakraTagInputTagProps) => {
	const onTagCloseButtonClick = tagCloseButtonProps?.onClick

	const handleClickTagCloseButton = useCallback(
		(_event: MouseEvent<HTMLButtonElement>) => {
			onTagCloseButtonClick?.(_event)
			if (_event.isDefaultPrevented()) return

			onRemove?.(_event)
		},
		[onRemove, onTagCloseButtonClick]
	)

	return (
		<Tag {...props}>
			<TagLabel {...tagLabelProps}>{children}</TagLabel>
			<TagCloseButton
				aria-label='Close tag'
				{...tagCloseButtonProps}
				onClick={handleClickTagCloseButton}
			/>
		</Tag>
	)
}
