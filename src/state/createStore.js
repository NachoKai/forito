import produce from 'immer'
import { create as createStore } from 'zustand'
import { devtools } from 'zustand/middleware'

const selectiveImmer = mutator =>
	typeof mutator === 'function' ? produce(mutator) : mutator

const immerMiddleware = next => (set, get, api) =>
	next((mutator, replace, name) => set(selectiveImmer(mutator), replace, name), get, api)

const namingMiddleware = next => (set, get, api) =>
	next(
		(mutator, replace, name) => {
			if (typeof replace === 'string') {
				name = replace
				replace = false
			}
			set(mutator, replace, name || 'anonymous')
		},
		get,
		api
	)

export const create = storeName => fn => {
	const store = createStore(
		devtools(immerMiddleware(namingMiddleware(fn)), { name: storeName })
	)
	const accessibleStores = window['forito'] || {}

	accessibleStores[storeName] = store
	window['forito'] = accessibleStores

	return store
}
