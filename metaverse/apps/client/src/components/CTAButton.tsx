import React from 'react'
import { Link } from 'react-router-dom'
import { cn } from '../lib/utils'

interface NavButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  to: string
  variant?: 'default' | 'ghost'
  isActive?: boolean
}

export default function NavButton({ 
  className, 
  variant = 'ghost', 
  isActive,
  children,
  to,
  ...props 
}: NavButtonProps) {
  const baseStyles = "px-3 py-2 rounded-md text-sm font-medium"
  const styles = cn(
    baseStyles,
    "hover:text-purple-300 hover:bg-purple-800/50",
    isActive && "bg-purple-800/50",
    variant === 'default' && "bg-purple-600 hover:bg-purple-700 text-white",
    className
  )

  return(
    <Link to={to} className={styles}>
      {children}
    </Link>
  )
}

