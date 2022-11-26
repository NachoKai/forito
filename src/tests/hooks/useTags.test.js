import { act, renderHook } from '@testing-library/react'
import { useTags } from '../../hooks/useTags'

describe('useTags', () => {
	it('should use tags', () => {
		const { result } = renderHook(() => useTags())

		expect(result.current.searchTags).toEqual([])
	})

	it('should add tag', () => {
		const { result } = renderHook(() => useTags())

		act(() => result.current.handleAddTag('test'))
		expect(result.current.searchTags).toEqual(['test'])
	})

	it('should delete tag', () => {
		const { result } = renderHook(() => useTags())

		act(() => result.current.handleAddTag('test'))
		act(() => result.current.handleDeleteTag('test'))
		expect(result.current.searchTags).toEqual([])
	})

	it('should add multiple tags', () => {
		const { result } = renderHook(() => useTags())

		act(() => result.current.handleAddTag('test'))
		act(() => result.current.handleAddTag('test2'))
		expect(result.current.searchTags).toEqual(['test', 'test2'])
	})

	it('should delete multiple tags', () => {
		const { result } = renderHook(() => useTags())

		act(() => result.current.handleAddTag('test'))
		act(() => result.current.handleAddTag('test2'))
		act(() => result.current.handleDeleteTag('test'))
		act(() => result.current.handleDeleteTag('test2'))
		expect(result.current.searchTags).toEqual([])
	})
})
