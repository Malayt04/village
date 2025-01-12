import { MoreVertical } from 'lucide-react'
import React from 'react'

interface SpaceCardProps {
  name: string
  thumbnail: string
  lastVisited: string
  participants: number
}

export default function SpaceCard({ name, thumbnail, lastVisited, participants }: SpaceCardProps) {
  return (
    <div className="group relative bg-indigo-900/50 rounded-lg overflow-hidden hover:ring-2 hover:ring-purple-500 transition-all">
      <div className="relative aspect-video">
        <img
          src={thumbnail}
          alt={name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 left-2 bg-black/50 rounded px-2 py-1 text-xs text-white">
          {participants} online
        </div>
      </div>
      
      <div className="p-3 flex items-center justify-between">
        <div>
          <h3 className="font-medium text-white">{name}</h3>
          <p className="text-sm text-gray-400">{lastVisited}</p>
        </div>
        
        <button className="p-1 rounded-full hover:bg-white/10">
          <MoreVertical className="h-5 w-5 text-gray-400" />
        </button>
      </div>
    </div>
  )
}

