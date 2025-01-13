import React, { useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { Input } from './ui/input'
import { Label } from './ui/label'
import CTAButton from './CTAButton'
import MapThemeCard from './MapThemeCard'

// Mock data for map themes
const mapThemes = [
  {
    id: 1,
    name: "Modern Office",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Eg8sTq7v96CeubAA7no3D6NqssF26A.png",
    description: "A contemporary office space with meeting rooms and breakout areas"
  },
  {
    id: 2,
    name: "Cozy Cafe",
    image: "/placeholder.svg?height=200&width=300",
    description: "A warm cafe environment perfect for casual meetings"
  },
  {
    id: 3,
    name: "Game Room",
    image: "/placeholder.svg?height=200&width=300",
    description: "Fun space with arcade machines and gaming areas"
  },
  {
    id: 4,
    name: "Conference Hall",
    image: "/placeholder.svg?height=200&width=300",
    description: "Large space ideal for presentations and events"
  },
  {
    id: 5,
    name: "Outdoor Park",
    image: "/placeholder.svg?height=200&width=300",
    description: "Natural environment with gardens and seating areas"
  },
  {
    id: 6,
    name: "Creative Studio",
    image: "/placeholder.svg?height=200&width=300",
    description: "Artistic space for brainstorming and creativity"
  }
]

interface CreateSpaceDialogProps {
  isOpen: boolean
  onClose: () => void
}

export default function CreateSpaceDialog({ isOpen, onClose }: CreateSpaceDialogProps) {
  const [spaceName, setSpaceName] = useState('')
  const [selectedTheme, setSelectedTheme] = useState<number | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle space creation here
    console.log('Creating space:', { spaceName, selectedTheme })
    onClose()
  }

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-indigo-950/95 border border-purple-500/20 text-white max-w-4xl w-[90vw] max-h-[90vh] overflow-y-auto rounded-lg p-6">
          <Dialog.Title className="text-2xl font-bold text-center mb-6">Create New Space</Dialog.Title>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="spaceName" className="text-white">
                Space Name
              </Label>
              <Input
                id="spaceName"
                value={spaceName}
                onChange={(e) => setSpaceName(e.target.value)}
                className="bg-white/10 border-purple-500/20 text-white placeholder-gray-400 focus:ring-purple-500"
                placeholder="Enter space name"
                required
              />
            </div>

            <div className="space-y-4">
              <Label className="text-white">
                Select a Theme
              </Label>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {mapThemes.map((theme) => (
                  <MapThemeCard
                    key={theme.id}
                    name={theme.name}
                    image={theme.image}
                    description={theme.description}
                    isSelected={selectedTheme === theme.id}
                    onSelect={() => setSelectedTheme(theme.id)}
                  />
                ))}
              </div>
            </div>

            <div className="flex justify-end space-x-4 pt-4">
              <Dialog.Close asChild>
                <CTAButton
                  type="button"
                  variant="secondary"
                >
                  Cancel
                </CTAButton>
              </Dialog.Close>
              <CTAButton
                type="submit"
                variant="primary"
                disabled={!spaceName || !selectedTheme}
              >
                Create Space
              </CTAButton>
            </div>
          </form>

          <Dialog.Close asChild>
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
              aria-label="Close"
            >
              ✕
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

