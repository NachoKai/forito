import { Input, Wrap, WrapItem } from '@chakra-ui/react'
import PropTypes from 'prop-types'
import { forwardRef } from 'react'

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
	const addTag = (event, tag) => {
		onTagAdd?.(event, tag)
		if (event.isDefaultPrevented()) return

		onTagsChange?.(event, tags.concat([tag]))
	}

	const removeTag = (event, index) => {
		onTagRemove?.(event, index)
		if (event.isDefaultPrevented()) return

		onTagsChange?.(event, [...tags.slice(0, index), ...tags.slice(index + 1)])
	}

	const handleRemoveTag = index => event => {
		removeTag(event, index)
	}

	const handleKeyDown = event => {
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
	}

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
				background='#fff'
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
