import { Link } from 'react-router-dom'
import { Gamepad2, Calendar, Layout, HelpCircle, Globe, Plus } from 'lucide-react'
import CTAButton from './CTAButton'
import React from 'react'

interface DashboardNavProps {
  userName: string
  userAvatar: string
  onCreateSpace: () => void
}
export default function DashboardNav({ userName, userAvatar, onCreateSpace }: DashboardNavProps) {
  return (
    <nav className="bg-indigo-950 text-white">
      <div className="max-w-7xl mx-auto">
        {/* Main Navigation */}
        <div className="flex items-center justify-between px-4 py-2">
          <div className="flex items-center space-x-6">
            <Link to="/dashboard" className="flex items-center space-x-2">
              <Gamepad2 className="h-8 w-8 text-purple-400" />
              <span className="text-xl font-bold">MetaVerse</span>
            </Link>
            
            <div className="flex items-center space-x-4">
              <Link to="/events" className="flex items-center space-x-2 text-gray-300 hover:text-white">
                <Calendar className="h-5 w-5" />
                <span>Events</span>
              </Link>
              <Link to="/my-spaces" className="flex items-center space-x-2 text-gray-300 hover:text-white">
                <Layout className="h-5 w-5" />
                <span>My Spaces</span>
              </Link>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-4">
              <img
                src={userAvatar}
                alt={userName}
                className="h-8 w-8 rounded-full border-2 border-purple-400"
              />
              <span>{userName}</span>
            </div>
            
            <button className="text-gray-300 hover:text-white">
              <HelpCircle className="h-5 w-5" />
            </button>
            
            <button className="text-gray-300 hover:text-white">
              <Globe className="h-5 w-5" />
            </button>

            <CTAButton 
              variant="primary" 
              className="flex items-center space-x-2"
              onClick={onCreateSpace}
            >
              <Plus className="h-4 w-4" />
              <span>Create Space</span>
            </CTAButton>
          </div>
        </div>

        {/* Sub Navigation */}
        <div className="flex items-center justify-between px-4 py-2 border-t border-indigo-900">
          <div className="flex space-x-4">
            <button className="px-4 py-1 rounded-full bg-purple-700 text-white">
              Last Visited
            </button>
            <button className="px-4 py-1 rounded-full text-gray-300 hover:text-white">
              Created Spaces
            </button>
          </div>
          
          <div className="relative">
            <input
              type="search"
              placeholder="Search"
              className="w-64 px-4 py-1 rounded-full bg-indigo-900/50 border border-indigo-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>
      </div>
    </nav>
  )
}

