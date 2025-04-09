import type { Route } from "./+types/home"
import { Products_list } from "../components/product_list/products_list"
import Header from "~/components/header/Header"

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ]
}

export default function Home() {
  return (
    <>
    <Header></Header>
    <Products_list />
    </>
  )
}
