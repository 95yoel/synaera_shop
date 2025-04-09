import {create} from 'zustand'
import { getProducts } from '~/api/api'
import type { State } from '~/models/state'

export const useProductStore = create<State>((set) => ({
    products: null,
    fetchProducts: async () => {
      const data = await getProducts()
      set({ products: data })
    },
  }))