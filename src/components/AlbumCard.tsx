'use client'

import { PlayIcon } from '@heroicons/react/24/solid'
import { Album } from '@/types'

interface AlbumCardProps {
  album: Album
  onClick: () => void
}

export default function AlbumCard({ album, onClick }: AlbumCardProps) {
  return (
    <div 
      className="bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer group"
      onClick={onClick}
    >
      <div className="relative mb-4">
        <img 
          src={album.coverImage} 
          alt={album.title}
          className="w-full aspect-square object-cover rounded-md"
        />
        <button className="absolute bottom-2 right-2 bg-green-500 rounded-full p-3 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:scale-105">
          <PlayIcon className="h-6 w-6 text-black" />
        </button>
      </div>
      <h3 className="font-semibold text-white mb-1 truncate">{album.title}</h3>
      <p className="text-sm text-gray-400 truncate">{album.artist}</p>
    </div>
  )
}