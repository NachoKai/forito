import create from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

const INITIAL_STATE = false

const store = (set, get) => ({
	...INITIAL_STATE,
	showLoading: () => set(true, false, 'show-loading'),
	hideLoading: () => set(false, false, 'hide-loading'),
	loading: () => get(),
})

export const useLoadingStore = create(
	devtools(immer(persist(store, { name: 'forito-loading' })))
)
