'use client'

import { useState } from 'react'
import { Song } from '@/types'
import { usePlaylist } from '@/contexts/PlaylistContext'
import {
  HeartIcon,
  PlusIcon,
  QueueListIcon,
  ShareIcon,
  EllipsisHorizontalIcon
} from '@heroicons/react/24/outline'
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid'
import CreatePlaylistModal from './CreatePlaylistModal'

interface SongMenuProps {
  song: Song
  isOpen: boolean
  onClose: () => void
}

export default function SongMenu({ song, isOpen, onClose }: SongMenuProps) {
  const { playlists, addToPlaylist } = usePlaylist()
  const [showCreatePlaylist, setShowCreatePlaylist] = useState(false)
  const [showAddToPlaylist, setShowAddToPlaylist] = useState(false)

  if (!isOpen) return null

  const handleAddToPlaylist = (playlistId: string) => {
    addToPlaylist(playlistId, song)
    onClose()
  }

  const handleCreateAndAdd = () => {
    setShowCreatePlaylist(true)
    setShowAddToPlaylist(false)
  }

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 z-40" 
        onClick={onClose}
      />
      
      {/* Menu */}
      <div className="fixed z-50 bg-gray-800 rounded-md shadow-lg py-2 min-w-[200px] border border-gray-700">
        {/* Add to Liked Songs */}
        <button
          className="w-full px-4 py-2 text-left text-sm text-white hover:bg-gray-700 flex items-center space-x-3"
          onClick={onClose}
        >
          <HeartIcon className="w-4 h-4" />
          <span>Add to Liked Songs</span>
        </button>

        {/* Add to Playlist */}
        <button
          className="w-full px-4 py-2 text-left text-sm text-white hover:bg-gray-700 flex items-center space-x-3"
          onClick={() => setShowAddToPlaylist(!showAddToPlaylist)}
        >
          <PlusIcon className="w-4 h-4" />
          <span>Add to playlist</span>
        </button>

        {/* Playlist submenu */}
        {showAddToPlaylist && (
          <div className="ml-4 border-l border-gray-600 pl-2">
            <button
              className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-gray-700 flex items-center space-x-3"
              onClick={handleCreateAndAdd}
            >
              <PlusIcon className="w-4 h-4" />
              <span>Create playlist</span>
            </button>
            {playlists.map((playlist) => (
              <button
                key={playlist.id}
                className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-gray-700 truncate"
                onClick={() => handleAddToPlaylist(playlist.id)}
              >
                {playlist.name}
              </button>
            ))}
          </div>
        )}

        {/* Add to Queue */}
        <button
          className="w-full px-4 py-2 text-left text-sm text-white hover:bg-gray-700 flex items-center space-x-3"
          onClick={onClose}
        >
          <QueueListIcon className="w-4 h-4" />
          <span>Add to queue</span>
        </button>

        <hr className="my-2 border-gray-600" />

        {/* Share */}
        <button
          className="w-full px-4 py-2 text-left text-sm text-white hover:bg-gray-700 flex items-center space-x-3"
          onClick={onClose}
        >
          <ShareIcon className="w-4 h-4" />
          <span>Share</span>
        </button>
      </div>

      {/* Create Playlist Modal */}
      {showCreatePlaylist && (
        <CreatePlaylistModal
          isOpen={showCreatePlaylist}
          onClose={() => {
            setShowCreatePlaylist(false)
            onClose()
          }}
          songToAdd={song}
        />
      )}
    </>
  )
}