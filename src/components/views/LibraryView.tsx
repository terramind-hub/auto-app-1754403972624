'use client'

import { useState } from 'react'
import { PlusIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { usePlaylists } from '@/contexts/PlaylistContext'
import { Playlist } from '@/types'

interface LibraryViewProps {
  onNavigate: (view: string, id?: string) => void
}

export default function LibraryView({ onNavigate }: LibraryViewProps) {
  const { playlists, createPlaylist } = usePlaylists()
  const [searchQuery, setSearchQuery] = useState('')
  const [filter, setFilter] = useState<'all' | 'playlists' | 'artists' | 'albums'>('all')

  const filteredPlaylists = playlists.filter(playlist =>
    playlist.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleCreatePlaylist = () => {
    const newPlaylist: Omit<Playlist, 'id'> = {
      name: `My Playlist #${playlists.length + 1}`,
      description: '',
      cover: '/api/placeholder/300/300',
      songs: [],
      createdAt: new Date().toISOString(),
      isPublic: false
    }
    createPlaylist(newPlaylist)
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-white">Your Library</h1>
        <button
          onClick={handleCreatePlaylist}
          className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-full transition-colors"
        >
          <PlusIcon className="w-5 h-5" />
          Create Playlist
        </button>
      </div>

      {/* Search and Filter */}
      <div className="mb-6 space-y-4">
        <div className="relative">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search in Your Library"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-gray-800 text-white pl-10 pr-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        
        <div className="flex gap-2">
          {(['all', 'playlists', 'artists', 'albums'] as const).map((filterType) => (
            <button
              key={filterType}
              onClick={() => setFilter(filterType)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                filter === filterType
                  ? 'bg-white text-black'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="space-y-2">
        {filteredPlaylists.length === 0 ? (
          <div className="text-center text-gray-400 py-12">
            <h2 className="text-xl font-bold mb-2">No playlists found</h2>
            <p className="mb-4">Create your first playlist to get started</p>
            <button
              onClick={handleCreatePlaylist}
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-full transition-colors"
            >
              Create Playlist
            </button>
          </div>
        ) : (
          filteredPlaylists.map((playlist) => (
            <div
              key={playlist.id}
              className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer group"
              onClick={() => onNavigate('playlist', playlist.id)}
            >
              <img
                src={playlist.cover}
                alt={playlist.name}
                className="w-12 h-12 rounded-md object-cover"
              />
              <div className="flex-1 min-w-0">
                <h3 className="text-white font-medium truncate">{playlist.name}</h3>
                <p className="text-gray-400 text-sm truncate">
                  Playlist • {playlist.songs.length} songs
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}