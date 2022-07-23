import { useCallback } from 'react'
import { Tag, TagCloseButton, TagLabel } from '@chakra-ui/react'

export default function ChakraTagInputTag({
	children,
	onRemove,

	tagLabelProps,
	tagCloseButtonProps,

	...props
}) {
	const onTagCloseButtonClick = tagCloseButtonProps?.onClick
	const handleClickTagCloseButton = useCallback(
		event => {
			onTagCloseButtonClick?.(event)
			if (event.isDefaultPrevented()) return

			onRemove?.(event)
		},
		[onRemove, onTagCloseButtonClick]
	)

	return (
		<Tag {...props}>
			<TagLabel {...tagLabelProps}>{children}</TagLabel>
			<TagCloseButton {...tagCloseButtonProps} onClick={handleClickTagCloseButton} />
		</Tag>
	)
}
