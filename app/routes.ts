import { type RouteConfig, index, route } from "@react-router/dev/routes"

export default [
    index("routes/home/home.tsx"),
    route("product/:id", "routes/product_detail/product_detail_.$id.tsx")
  ] satisfies RouteConfig