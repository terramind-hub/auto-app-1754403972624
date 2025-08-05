'use client'

import { useState } from 'react'
import { usePlaylist } from '@/contexts/PlaylistContext'
import { XMarkIcon } from '@heroicons/react/24/outline'

interface CreatePlaylistModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function CreatePlaylistModal({ isOpen, onClose }: CreatePlaylistModalProps) {
  const [playlistName, setPlaylistName] = useState('')
  const [description, setDescription] = useState('')
  const { createPlaylist } = usePlaylist()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (playlistName.trim()) {
      createPlaylist({
        name: playlistName.trim(),
        description: description.trim() || undefined
      })
      setPlaylistName('')
      setDescription('')
      onClose()
    }
  }

  const handleClose = () => {
    setPlaylistName('')
    setDescription('')
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-white text-xl font-bold">Create Playlist</h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="playlistName" className="block text-sm font-medium text-gray-300 mb-2">
              Playlist Name
            </label>
            <input
              type="text"
              id="playlistName"
              value={playlistName}
              onChange={(e) => setPlaylistName(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Enter playlist name"
              autoFocus
            />
          </div>
          
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">
              Description (optional)
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
              placeholder="Add a description"
            />
          </div>
          
          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 px-4 py-2 text-gray-300 border border-gray-600 rounded-md hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!playlistName.trim()}
              className="flex-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}