
import React, { useState } from "react"
import { useLocation } from "react-router-dom"
import { Link } from "react-router-dom"
import { cn } from "@/lib/utils"
import {
  ArrowLeftRight,
  BarChart3,
  Building2,
  CircleDollarSign,
  Cog,
  CreditCard,
  HelpCircle,
  Home,
  LayoutDashboard,
  ListMusic,
  MessagesSquare,
  Package,
  ShieldCheck,
  Settings,
  ShoppingBag,
  ShoppingCart,
  Users,
  Share2,
  Bot,
} from "lucide-react"

interface NavItemProps {
  href: string
  text: string
  icon: React.ReactNode
  active?: boolean
  external?: boolean
  hideOnMobile?: boolean
  onClick?: React.MouseEventHandler<HTMLAnchorElement>
}

const NavItem = ({
  href,
  text,
  icon,
  active = false,
  external = false,
  hideOnMobile = false,
  onClick,
}: NavItemProps) => {
  return (
    <Link
      to={href}
      onClick={onClick}
      className={cn(
        "flex items-center text-sm px-3 py-2 rounded-lg hover:bg-white/[0.07]",
        active ? "text-white bg-white/[0.05]" : "text-white/60",
        hideOnMobile ? "hidden md:flex" : "flex",
      )}
    >
      <div className="flex items-center">
        <span className={cn("mr-3 h-5 w-5", active ? "text-white" : "text-white/60")}>{icon}</span>
        {text}
      </div>
    </Link>
  )
}

export interface DashboardNavProps {
  links?: { text: string; href: string; icon: React.ReactNode }[]
  isCollapsed?: boolean
  onToggle?: () => void
}

export function DashboardNav({ links, isCollapsed, onToggle }: DashboardNavProps) {
  const location = useLocation()
  const isActive = (href: string) => {
    if (href === '/dashboard') {
      return location.pathname === '/dashboard'
    }
    return location.pathname.startsWith(href)
  }

  return (
    <div data-collapsed={isCollapsed} className={cn("group border-r border-r-white/[0.06]")}>
      <div className="p-2 space-y-1">
        <NavItem 
          href="/dashboard"
          text="Dashboard" 
          icon={<LayoutDashboard size={18} />} 
          active={isActive('/dashboard')}
        />
        <NavItem 
          href="/dashboard/products" 
          text="Products" 
          icon={<Package size={18} />} 
          active={isActive('/dashboard/products')} 
        />
        <NavItem 
          href="/dashboard/orders" 
          text="Orders" 
          icon={<ShoppingCart size={18} />} 
          active={isActive('/dashboard/orders')} 
        />
        <NavItem 
          href="/dashboard/customers" 
          text="Customers" 
          icon={<Users size={18} />} 
          active={isActive('/dashboard/customers')} 
        />
        <NavItem 
          href="/dashboard/webstore" 
          text="Store" 
          icon={<ShoppingBag size={18} />} 
          active={isActive('/dashboard/webstore')} 
        />
        <NavItem 
          href="/dashboard/social" 
          text="Social" 
          icon={<Share2 size={18} />} 
          active={isActive('/dashboard/social')} 
        />
        <NavItem 
          href="/dashboard/genkit" 
          text="Genkit AI" 
          icon={<Bot size={18} />} 
          active={isActive('/dashboard/genkit')} 
        />
        <NavItem 
          href="/dashboard/reports" 
          text="Reports" 
          icon={<BarChart3 size={18} />} 
          active={isActive('/dashboard/reports')} 
          hideOnMobile
        />
        <NavItem 
          href="/dashboard/marketing" 
          text="Marketing" 
          icon={<CircleDollarSign size={18} />} 
          active={isActive('/dashboard/marketing')} 
          hideOnMobile
        />
        <NavItem 
          href="/dashboard/settings" 
          text="Settings" 
          icon={<Cog size={18} />} 
          active={isActive('/dashboard/settings')}
        />
        <NavItem 
          href="/dashboard/subscription" 
          text="Subscription" 
          icon={<CreditCard size={18} />} 
          active={isActive('/dashboard/subscription')}
        />
        <NavItem 
          href="/dashboard/support" 
          text="Support" 
          icon={<HelpCircle size={18} />} 
          active={isActive('/dashboard/support')} 
          hideOnMobile
        />
      </div>
    </div>
  )
}
