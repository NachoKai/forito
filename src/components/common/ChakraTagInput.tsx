import {
	Input,
	TagCloseButtonProps,
	TagLabelProps,
	TagProps,
	Wrap,
	WrapItem,
	WrapItemProps,
	WrapProps,
} from '@chakra-ui/react'
import { ChangeEvent, KeyboardEvent, MouseEvent, forwardRef } from 'react'

import { maybeCall } from '../../utils/maybeCall'
import { ChakraTagInputTag } from './Tag'

export interface ChakraTagInputProps {
	tags?: string[]
	onTagsChange?: (
		_event:
			| ChangeEvent<HTMLInputElement>
			| KeyboardEvent<HTMLInputElement>
			| MouseEvent<HTMLElement>,
		_tags: string[]
	) => void
	onTagAdd?: (
		_event: ChangeEvent<HTMLInputElement> | KeyboardEvent<HTMLInputElement>,
		_tag: string
	) => void
	onTagRemove?: (
		_event: MouseEvent<HTMLElement> | KeyboardEvent<HTMLInputElement>,
		_index: number
	) => void
	addKeys?: string[]
	wrapProps?: WrapProps
	wrapItemProps?: WrapItemProps
	tagProps?: TagProps
	tagLabelProps?: TagLabelProps
	tagCloseButtonProps?: TagCloseButtonProps
	onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void
}

export const ChakraTagInput = forwardRef<HTMLInputElement, ChakraTagInputProps>(
	function ChakraTagInput(
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
		const addTag = (
			event: ChangeEvent<HTMLInputElement> | KeyboardEvent<HTMLInputElement>,
			tag: string
		) => {
			onTagAdd?.(event, tag)
			if (event.isDefaultPrevented()) return

			onTagsChange?.(event, tags.concat([tag]))
		}

		const removeTag = (
			event: MouseEvent<HTMLElement> | KeyboardEvent<HTMLInputElement>,
			index: number
		) => {
			onTagRemove?.(event, index)
			if (event.isDefaultPrevented()) return

			onTagsChange?.(event, [...tags.slice(0, index), ...tags.slice(index + 1)])
		}

		const handleRemoveTag = (index: number) => (event: MouseEvent<HTMLElement>) => {
			removeTag(event, index)
		}

		const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
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
					_placeholder={{ color: 'gray' }}
					autoComplete='off'
					bg='white'
					color='black'
					maxLength={105}
					placeholder='Search Posts Tags'
					onKeyDown={handleKeyDown}
				/>
			</Wrap>
		)
	}
)
