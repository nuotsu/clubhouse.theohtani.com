import { create } from 'zustand'

export const useStorage = create<{
	date: string
	setDate: (date: string) => void
	today: string
}>((set) => ({
	date: new Date().toLocaleDateString('en-CA', {
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
	}),
	setDate: (date) => set({ date }),
	today: new Date().toISOString().split('T')[0],
}))
