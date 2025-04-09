import type { Product } from "./product"

export type State = {
    products: Product[] | null
    fetchProducts: () => Promise<void>
}