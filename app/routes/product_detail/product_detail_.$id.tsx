import { useEffect } from "react"
import { useParams } from "react-router-dom"
import type { Product } from "~/models/product"
import { useProductStore } from "~/store/productStore"
import ReactMarkdown from 'react-markdown';

export default function ProductDetail() {
  const { id } = useParams()
  const { products, fetchProducts } = useProductStore()

  useEffect(() => {
    if (!products) {
      fetchProducts()
    }
  }, [products, fetchProducts])

  if (!products) {
    return <div style={{ padding: "2rem" }}>Cargando producto...</div>
  }

  const product = products.find((p: Product) => p.id === id)

  if (!product) {
    return <div style={{ padding: "2rem" }}>Producto no encontrado.</div>
  }

  return (
    <div style={{ padding: "5rem", display: "flex", justifyContent: "center" }}>
      <div style={{
        display: "flex",
        flexDirection: "row",
        gap: "3rem",
        maxWidth: "1100px",
        width: "100%"
      }}>
        {/* Left column */}
        <div style={{
          flex: "1",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          position: "sticky",
          top: "5rem", 
          alignSelf: "flex-start"
        }}>
          <h1 style={{ fontSize: "1.8rem", marginBottom: "0.5rem" }}>{product.name_es}</h1>
          <p style={{ marginBottom: "1rem", color: "#555" }}>{product.short_description_es}</p>
          <img
            src={product.images}
            alt={product.name_es}
            style={{
              maxWidth: "100%",
              borderRadius: "0.5rem",
              marginBottom: "1rem",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
            }}
          />
          <p style={{
            fontWeight: "bold",
            fontSize: "1.2rem",
            marginTop: "0.5rem"
          }}>{product.price.toFixed(2)} €</p>
        </div>
  
        {/* Right column */}
        <div
          className="markdown"
          style={{
            flex: "2",
            fontSize: "0.95rem",
            lineHeight: "1.6",
            color: "#222",

            maxHeight: "calc(100vh - 6rem)",
            paddingRight: "1rem"
          }}>
          <ReactMarkdown
            components={{
              h2: ({ node, ...props }) => <h2 style={{ fontSize: "1.3rem", marginTop: "1.5rem", marginBottom: "0.5rem" }} {...props} />,
              li: ({ node, ...props }) => <li style={{ marginBottom: "0.4rem" }} {...props} />,
              strong: ({ node, ...props }) => <strong style={{ fontWeight: "600" }} {...props} />,
              p: ({ node, ...props }) => <p style={{ marginBottom: "1rem" }} {...props} />
            }}
          >
            {product.description_es}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  )
  
  

}
