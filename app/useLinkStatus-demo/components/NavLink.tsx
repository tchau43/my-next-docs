'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import LoadingIndicator from './LoadingIndicator'

interface NavLinkProps {
  href: string
  children: React.ReactNode
}

export default function NavLink({ href, children }: NavLinkProps) {
  const pathname = usePathname()
  const isActive = pathname === href
  
  return (
    <Link 
      href={href} 
      prefetch={false}
      className={`
        px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-2
        ${isActive 
          ? 'bg-blue-600 text-white shadow-lg' 
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }
      `}
    >
      {children}
      <LoadingIndicator />
    </Link>
  )
}
