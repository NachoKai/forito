import { useCallback } from 'react'
import { Tag, TagCloseButton, TagLabel } from '@chakra-ui/react'
import PropTypes from 'prop-types'

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

ChakraTagInputTag.propTypes = {
	children: PropTypes.node,
	onRemove: PropTypes.func,
	tagLabelProps: PropTypes.object,
	tagCloseButtonProps: PropTypes.object,
}