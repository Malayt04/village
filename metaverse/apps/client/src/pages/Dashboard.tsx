import React, { useState } from 'react'
import DashboardNav from '../components/DashboardNav'
import SpaceCard from '../components/SpaceCard'
import CreateSpaceDialog from '../components/CreateSpaceDialog'

// Mock data for spaces
const mockSpaces = [
  {
    id: 1,
    name: "Team Meeting Room",
    thumbnail: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Eg8sTq7v96CeubAA7no3D6NqssF26A.png",
    lastVisited: "2 hours ago",
    participants: 5
  },
  {
    id: 2,
    name: "Game Room",
    thumbnail: "/placeholder.svg?height=200&width=300",
    lastVisited: "1 day ago",
    participants: 12
  },
  {
    id: 3,
    name: "Virtual Office",
    thumbnail: "/placeholder.svg?height=200&width=300",
    lastVisited: "3 days ago",
    participants: 8
  }
]

export default function Dashboard() {
  const [spaces] = useState(mockSpaces)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-950 via-indigo-900 to-purple-900">
      <DashboardNav
        userName="John Doe"
        userAvatar="/placeholder.svg?height=32&width=32"
        onCreateSpace={() => setIsCreateDialogOpen(true)}
      />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {spaces.map(space => (
            <SpaceCard
              key={space.id}
              name={space.name}
              thumbnail={space.thumbnail}
              lastVisited={space.lastVisited}
              participants={space.participants}
            />
          ))}
        </div>
      </main>

      <CreateSpaceDialog
        isOpen={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
      />
    </div>
  )
}

