'use client'

import { useMusic } from '@/contexts/MusicContext'
import { XMarkIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'

interface QueueModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function QueueModal({ isOpen, onClose }: QueueModalProps) {
  const { state, dispatch } = useMusic()
  const { queue, currentSongIndex } = state

  if (!isOpen) return null

  const handleSongSelect = (index: number) => {
    dispatch({ type: 'SET_CURRENT_SONG_INDEX', payload: index })
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-900 rounded-lg w-96 max-h-96 overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h2 className="text-white text-lg font-semibold">Queue</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>
        
        <div className="overflow-y-auto max-h-80">
          {queue.map((song, index) => (
            <div
              key={`${song.id}-${index}`}
              className={`flex items-center p-3 hover:bg-gray-800 cursor-pointer ${
                index === currentSongIndex ? 'bg-gray-800' : ''
              }`}
              onClick={() => handleSongSelect(index)}
            >
              <div className="relative w-10 h-10 rounded overflow-hidden mr-3">
                <Image
                  src={song.coverImage}
                  alt={song.title}
                  fill
                  className="object-cover"
                  sizes="40px"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-sm truncate ${
                  index === currentSongIndex ? 'text-green-500' : 'text-white'
                }`}>
                  {song.title}
                </p>
                <p className="text-xs text-gray-400 truncate">
                  {song.artist}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}