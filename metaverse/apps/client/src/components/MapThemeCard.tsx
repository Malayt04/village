import React from 'react';

interface MapThemeCardProps {
    name: string
    image: string
    description: string
    isSelected: boolean
    onSelect: () => void
  }
  
  export default function MapThemeCard({ 
    name, 
    image, 
    description, 
    isSelected, 
    onSelect 
  }: MapThemeCardProps) {
    return (
      <div
        onClick={onSelect}
        className={`
          cursor-pointer rounded-lg overflow-hidden border-2 transition-all
          ${isSelected 
            ? 'border-purple-500 ring-2 ring-purple-500/50' 
            : 'border-transparent hover:border-purple-500/50'}
        `}
      >
        <div className="aspect-video relative">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover"
          />
          {isSelected && (
            <div className="absolute inset-0 bg-purple-500/20 backdrop-blur-sm flex items-center justify-center">
              <div className="bg-purple-500 text-white px-4 py-2 rounded-full text-sm">
                Selected
              </div>
            </div>
          )}
        </div>
        <div className="p-4 bg-white/5 backdrop-blur-sm">
          <h3 className="font-medium text-white mb-1">{name}</h3>
          <p className="text-sm text-gray-300">{description}</p>
        </div>
      </div>
    )
  }
  
  