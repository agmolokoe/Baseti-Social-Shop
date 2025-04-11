
import React from "react"
import { Routes, Route } from "react-router-dom"

// Import dashboard pages
import Dashboard from "./dashboard/Index"
import ProductsPage from "./products/Index"
import OrdersPage from "./orders/Index"
import CustomersPage from "./customers/Index"
import WebStorePage from "./webstore/Index"
import SupportPage from "./support/Index"
import ReportsPage from "./reports/Index"
import SettingsPage from "./settings/Index"
import ViewStorePage from "./dashboard/ViewStorePage"
import MarketingPage from "./marketing/Index"
import SocialPage from "./social/Index"
import GenkitPage from "./genkit/Index"

export default function Index() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/orders" element={<OrdersPage />} />
      <Route path="/customers" element={<CustomersPage />} />
      <Route path="/webstore" element={<WebStorePage />} />
      <Route path="/webstore/view" element={<ViewStorePage />} />
      <Route path="/reports" element={<ReportsPage />} />
      <Route path="/marketing" element={<MarketingPage />} />
      <Route path="/social" element={<SocialPage />} />
      <Route path="/genkit" element={<GenkitPage />} />
      <Route path="/settings/*" element={<SettingsPage />} />
      <Route path="/support" element={<SupportPage />} />
    </Routes>
  )
}
