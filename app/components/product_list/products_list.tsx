import { Link } from "react-router-dom"
import { useEffect } from "react"
import { useThemeLanguage } from "~/contexts/themeLanguageContext"
import type { Product } from "~/models/product"
import { useProductStore } from "~/store/productStore"
import styles from './product_list.module.css'
import { ShoppingCart } from 'lucide-react'


type ProductProps = {
  product: Product
  language: string
}

type PriceProps = {
  price: number
}

export function Price({ price }: PriceProps) {
  const { language } = useThemeLanguage()

  const symbol = language === 'es' ? '€' : '$'

  return <div className="price">{price.toFixed(2) + ' ' + symbol}</div>
}

export function Product({ product, language }: ProductProps) {
  return (
    <div className={styles.product_card}>
      <div className={styles.title}>
        <Link to={`/product/${product.id}`} className={styles.link}>
          <h2>{language === 'es' ? product.name_es : product.name_en}</h2>
          <p>{language === 'es' ? product.short_description_es : product.short_description_en}</p>
        </Link>

      </div>
      <Link to={`/product/${product.id}`}>
        <img src={product.images} alt={language === 'es' ? product.name_es : product.name_en} />
      </Link>

      <div className={styles.buttons}>
        <div className={styles.price_row}>
          <Price price={product.price} />
          <i>{language === 'es' ? 'Por caja' : 'Per box'}</i>
        </div>

        <div className={styles.actions}>
          <button className={styles.button}> {language === 'es' ? 'Añadir' : 'Add'} <ShoppingCart size={16} style={{ marginRight: '6px' }} /></button>
        </div>
      </div>
    </div>
  )
}


export function Products_list() {
  const { products, fetchProducts } = useProductStore()
  const { language } = useThemeLanguage()

  useEffect(() => {
    if (!products) fetchProducts()
  }, [products, fetchProducts])

  if (!products) return <div>Cargando productos...</div>

  return (
    <div className={styles.container}>
      <h1>{language === 'es' ? 'Productos' : 'Products'}</h1>
      <div className={styles.products_list}>
        {products.map((p) => (
          <Product key={p.id} product={p} language={language} />
        ))}
      </div>
    </div>
  )
}