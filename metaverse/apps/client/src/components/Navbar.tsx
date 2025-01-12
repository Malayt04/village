import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Gamepad2, Menu, X } from 'lucide-react'
import NavButton from './NavButton'
import React from 'react'


export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 w-full z-50 bg-indigo-950/80 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Gamepad2 className="h-8 w-8" />
              <span className="text-xl font-bold">Village</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <NavButton to="#features">Features</NavButton>
              <NavButton to="#about">About</NavButton>
              <NavButton to="#pricing">Pricing</NavButton>
              <NavButton to="/signin" variant="default">Sign In</NavButton>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md hover:text-purple-300 hover:bg-purple-800/50"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <NavButton to="#features" className="block w-full">Features</NavButton>
            <NavButton to="#about" className="block w-full">About</NavButton>
            <NavButton to="#pricing" className="block w-full">Pricing</NavButton>
            <NavButton to="/signin" variant="default" className="block w-full">Sign In</NavButton>
          </div>
        </div>
      )}
    </nav>
  )
}

