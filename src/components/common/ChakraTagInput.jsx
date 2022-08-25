import { forwardRef, useCallback } from 'react'
import { Input, Wrap, WrapItem } from '@chakra-ui/react'
import PropTypes from 'prop-types'

import ChakraTagInputTag from './Tag'
import maybeCall from '../../utils/maybeCall'

const ChakraTagInput = forwardRef(function ChakraTagInput(
	{
		tags = [],
		onTagsChange,
		onTagAdd,
		onTagRemove,
		addKeys = ['Enter'],
		wrapProps,
		wrapItemProps,
		tagProps,
		tagLabelProps,
		tagCloseButtonProps,
		onKeyDown,
	},
	ref
) {
	const addTag = useCallback(
		(event, tag) => {
			onTagAdd?.(event, tag)
			if (event.isDefaultPrevented()) return

			onTagsChange?.(event, tags.concat([tag]))
		},
		[tags, onTagsChange, onTagAdd]
	)

	const removeTag = useCallback(
		(event, index) => {
			onTagRemove?.(event, index)
			if (event.isDefaultPrevented()) return

			onTagsChange?.(event, [...tags.slice(0, index), ...tags.slice(index + 1)])
		},
		[tags, onTagsChange, onTagRemove]
	)

	const handleRemoveTag = useCallback(
		index => event => {
			removeTag(event, index)
		},
		[removeTag]
	)

	const handleKeyDown = useCallback(
		event => {
			onKeyDown?.(event)

			if (event.isDefaultPrevented()) return
			if (event.isPropagationStopped()) return

			const { currentTarget, key } = event
			const { selectionStart, selectionEnd } = currentTarget

			if (addKeys.includes(key) && currentTarget.value) {
				addTag(event, currentTarget.value)
				if (!event.isDefaultPrevented()) {
					currentTarget.value = ''
				}
				event.preventDefault()
			} else if (
				key === 'Backspace' &&
				tags.length > 0 &&
				selectionStart === 0 &&
				selectionEnd === 0
			) {
				removeTag(event, tags.length - 1)
			}
		},
		[addKeys, tags.length, addTag, removeTag, onKeyDown]
	)

	return (
		<Wrap align='center' {...wrapProps}>
			{tags.map((tag, index) => (
				<WrapItem {...maybeCall(wrapItemProps, false, index)} key={index}>
					<ChakraTagInputTag
						size='sm'
						tagCloseButtonProps={maybeCall(tagCloseButtonProps, tag, index)}
						tagLabelProps={maybeCall(tagLabelProps, tag, index)}
						onRemove={handleRemoveTag(index)}
						{...maybeCall(tagProps, tag, index)}
					>
						{tag}
					</ChakraTagInputTag>
				</WrapItem>
			))}

			<WrapItem flexGrow={1} {...maybeCall(wrapItemProps, true, tags.length)}>
				<Input ref={ref} onKeyDown={handleKeyDown} />
			</WrapItem>
		</Wrap>
	)
})

export default ChakraTagInput

ChakraTagInput.propTypes = {
	tags: PropTypes.arrayOf(PropTypes.string),
	onTagsChange: PropTypes.func,
	onTagAdd: PropTypes.func,
	onTagRemove: PropTypes.func,
	addKeys: PropTypes.arrayOf(PropTypes.string),
	wrapProps: PropTypes.object,
	wrapItemProps: PropTypes.object,
	tagProps: PropTypes.object,
	tagLabelProps: PropTypes.object,
	tagCloseButtonProps: PropTypes.object,
	onKeyDown: PropTypes.func,
}
