'use client'

import { PlayIcon } from '@heroicons/react/24/solid'
import { Artist } from '@/types'

interface ArtistCardProps {
  artist: Artist
  onClick: () => void
}

export default function ArtistCard({ artist, onClick }: ArtistCardProps) {
  return (
    <div 
      className="bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer group"
      onClick={onClick}
    >
      <div className="relative mb-4">
        <img 
          src={artist.image} 
          alt={artist.name}
          className="w-full aspect-square object-cover rounded-full"
        />
        <button className="absolute bottom-2 right-2 bg-green-500 rounded-full p-3 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:scale-105">
          <PlayIcon className="h-6 w-6 text-black" />
        </button>
      </div>
      <h3 className="font-semibold text-white mb-1 truncate">{artist.name}</h3>
      <p className="text-sm text-gray-400">Artist</p>
    </div>
  )
}