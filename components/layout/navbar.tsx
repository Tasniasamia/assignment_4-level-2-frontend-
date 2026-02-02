'use client'

import { use, useState } from 'react'
import Link from 'next/link'
import { Menu, X, ShoppingCart } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { getUser } from '@/actions/user.action'
import { userType } from '@/types'

// interface NavigationProps {
//   onCartClick?: () => void
// }

export function Navigation({user}:{user:userType}) {
  console.log("user",user);
  const{push}=useRouter();
  const [isOpen, setIsOpen] = useState(false);

//   const { itemCount } = useCart()

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Restaurants', href: '/restaurants' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ]

  return (
    <nav className="bg-background border-b border-border sticky top-0 z-50 shadow-sm">
      <div className="container">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="shrink-0 flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold">F</span>
            </div>
            <span className="text-xl font-bold text-foreground hidden sm:inline">FoodHub</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-foreground hover:text-primary transition-colors duration-200 font-medium text-sm"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Cart and Menu */}
          <div className='flex gap-8 items-center'>
          <div className="flex items-center gap-3">
            {/* Cart Button */}
            <button
            //   onClick={onCartClick}
              className="relative p-2 rounded-lg hover:bg-muted transition-colors"
            //   aria-label="Open cart"
            >
              <ShoppingCart className="w-6 h-6 text-foreground" />
              {/* {itemCount > 0 && ( */}
                <span className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {/* {itemCount} */}{1}
                </span>
              {/* )} */}
            </button>

            {/* Mobile Menu Button */}
      
          </div>
             {user?.name ? (
                <div className="w-10 h-10 bg-gray-400  rounded-full flex items-center justify-center">
                <span className="text-primary-foreground text-2xl font-bold">{user.name.split("")[0]}</span>
              </div>
             ):(  <button
              onClick={()=>{push('/login')}}
              className="w-fit  px-4 py-2 rounded-lg  cursor-pointer bg-primary text-primary-foreground hover:bg-primary/90 h-12 text-base font-semibold"
            >
              Get Started
            </button>)}
            <button
              onClick={toggleMenu}
              className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="w-6 h-6 text-foreground" />
              ) : (
                <Menu className="w-6 h-6 text-foreground" />
              )}
            </button>
            </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden border-t border-border">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block px-3 py-2 rounded-lg text-foreground hover:bg-muted transition-colors duration-200 font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
               {/* {user?.name ? (
                <div className="w-10 h-10 bg-gray-400  rounded-full flex items-center justify-center">
                <span className="text-primary-foreground text-2xl font-bold">{user.name.split("")[0]}</span>
              </div>
             ):(  <button
              onClick={()=>{push('/login')}}
              className="w-fit  px-4 py-2 rounded-lg  cursor-pointer bg-primary text-primary-foreground hover:bg-primary/90 h-12 text-base font-semibold"
            >
              Get Started
            </button>)} */}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
