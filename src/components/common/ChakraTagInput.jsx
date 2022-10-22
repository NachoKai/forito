import { Input, Wrap, WrapItem } from '@chakra-ui/react'
import PropTypes from 'prop-types'
import { forwardRef, useCallback } from 'react'

import { maybeCall } from '../../utils/maybeCall'
import { ChakraTagInputTag } from './Tag'

export const ChakraTagInput = forwardRef(function ChakraTagInput(
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
		[onTagAdd, onTagsChange, tags]
	)

	const removeTag = useCallback(
		(event, index) => {
			onTagRemove?.(event, index)
			if (event.isDefaultPrevented()) return

			onTagsChange?.(event, [...tags.slice(0, index), ...tags.slice(index + 1)])
		},
		[onTagRemove, onTagsChange, tags]
	)

	const handleRemoveTag = useCallback(
		index => {
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
				if (currentTarget?.value?.trim()?.length) {
					addTag(event, currentTarget.value?.toLowerCase())
				}

				if (!event.isDefaultPrevented()) {
					currentTarget.value = ''
				}

				event.preventDefault()
			} else if (
				key === 'Backspace' &&
				tags?.length > 0 &&
				selectionStart === 0 &&
				selectionEnd === 0
			) {
				removeTag(event, tags?.length - 1)
			}
		},
		[addKeys, addTag, onKeyDown, removeTag, tags?.length]
	)

	return (
		<Wrap align='center' {...wrapProps}>
			{tags.map((tag, index) => (
				<WrapItem {...maybeCall(wrapItemProps, false, index)} key={index}>
					<ChakraTagInputTag
						bg='primary.600'
						borderRadius='4px'
						color='white'
						tagCloseButtonProps={maybeCall(tagCloseButtonProps, tag, index)}
						tagLabelProps={maybeCall(tagLabelProps, tag, index)}
						onRemove={handleRemoveTag(index)}
						{...maybeCall(tagProps, tag, index)}
					>
						{tag}
					</ChakraTagInputTag>
				</WrapItem>
			))}

			<Input
				ref={ref}
				_placeholder={{ color: 'gray' }}
				autoComplete='off'
				bg='white'
				color='black'
				maxLength='105'
				placeholder='Search Posts Tags'
				onKeyDown={handleKeyDown}
			/>
		</Wrap>
	)
})

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
