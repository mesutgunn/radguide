'use client'

import Link from 'next/link'

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <div className="flex flex-wrap gap-2 px-4">
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          {item.href ? (
            <Link 
              href={item.href}
              className="text-white/60 hover:text-white transition-colors text-sm font-medium leading-normal"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-white text-sm font-medium leading-normal">
              {item.label}
            </span>
          )}
          {index < items.length - 1 && (
            <span className="text-white/60 text-sm font-medium leading-normal">/</span>
          )}
        </div>
      ))}
    </div>
  )
}
