import { create } from 'zustand'

interface studyState {
  count: number
  total: number
  increase: () => void
  decrease: () => void
  setCount: (count: number) => void
  setTotal: (total: number) => void
}

export const useStudy1Store = create<studyState>()((set) => ({
  count: 0,
  total: 0,
  increase: () => {
    set((state) => ({ count: state.count + 1 }))
  },
  decrease: () => set((state) => ({ count: state.count - 1 })),
  setCount: (count) => set({ count }),
  setTotal: (total) => set({ total }),
}))

export const useStudy2Store = create<studyState>()((set) => ({
  count: 0,
  total: 0,
  increase: () => set((state) => ({
    count: state.count + 1
  })),
  decrease: () => set((state) => ({ count: state.count - 1 })),
  setCount: (count) => set({ count }),
  setTotal: (total) => set({ total }),
}))