import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  // Main page
  index("routes/home.tsx"),

  // About page
  route("about", "routes/about.tsx"),

  // Public products
  route("products", "routes/products.tsx"),
  route("products/:id", "routes/product.tsx"),

  // Login page
  route("login", "routes/login.tsx"),

  // Layout Admin
  route("admin", "routes/admin/layout.tsx", [
    index("routes/admin/dashboard.tsx"),
    route("products", "routes/admin/products.tsx"),
  ]),

  // Layout User
  route("user", "routes/user/layout.tsx", [
    index("routes/user/profile.tsx"),
    route("orders", "routes/user/orders.tsx"),
  ]),
] satisfies RouteConfig;
