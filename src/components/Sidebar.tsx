'use client'

import { useState } from 'react'
import { usePlaylist } from '@/contexts/PlaylistContext'
import { useMusic } from '@/contexts/MusicContext'
import { 
  HomeIcon, 
  MagnifyingGlassIcon, 
  BuildingLibraryIcon,
  PlusIcon,
  HeartIcon,
  ClockIcon
} from '@heroicons/react/24/outline'
import { 
  HomeIcon as HomeIconSolid, 
  MagnifyingGlassIcon as MagnifyingGlassIconSolid, 
  BuildingLibraryIcon as BuildingLibraryIconSolid,
  HeartIcon as HeartIconSolid
} from '@heroicons/react/24/solid'
import CreatePlaylistModal from './CreatePlaylistModal'

interface SidebarProps {
  currentView: string
  onNavigate: (view: string, id?: string) => void
}

export default function Sidebar({ currentView, onNavigate }: SidebarProps) {
  const { getAllPlaylists } = usePlaylist()
  const { state: musicState } = useMusic()
  const [showCreateModal, setShowCreateModal] = useState(false)
  
  const allPlaylists = getAllPlaylists()
  const likedSongsCount = musicState.likedSongs.length
  const recentlyPlayedCount = musicState.recentlyPlayed.length

  const mainNavItems = [
    {
      id: 'home',
      label: 'Home',
      icon: currentView === 'home' ? HomeIconSolid : HomeIcon,
      onClick: () => onNavigate('home'),
    },
    {
      id: 'search',
      label: 'Search',
      icon: currentView === 'search' ? MagnifyingGlassIconSolid : MagnifyingGlassIcon,
      onClick: () => onNavigate('search'),
    },
  ]

  const libraryItems = [
    {
      id: 'liked',
      label: 'Liked Songs',
      icon: currentView === 'liked' ? HeartIconSolid : HeartIcon,
      count: likedSongsCount,
      onClick: () => onNavigate('liked'),
    },
    {
      id: 'recent',
      label: 'Recently Played',
      icon: ClockIcon,
      count: recentlyPlayedCount,
      onClick: () => onNavigate('recent'),
    },
  ]

  return (
    <>
      <div className="w-64 bg-black h-full flex flex-col">
        {/* Logo */}
        <div className="p-6">
          <h1 className="text-white text-2xl font-bold">Spotify</h1>
        </div>

        {/* Main Navigation */}
        <nav className="px-6 space-y-2">
          {mainNavItems.map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.id}
                onClick={item.onClick}
                className={`w-full flex items-center space-x-4 py-2 px-2 rounded-md transition-colors duration-200 ${
                  currentView === item.id
                    ? 'bg-gray-800 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Icon className="w-6 h-6" />
                <span className="font-semibold">{item.label}</span>
              </button>
            )
          })}
        </nav>

        {/* Your Library */}
        <div className="mt-8 px-6">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => onNavigate('library')}
              className={`flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-200 ${
                currentView === 'library' ? 'text-white' : ''
              }`}
            >
              <BuildingLibraryIcon className="w-6 h-6" />
              <span className="font-semibold">Your Library</span>
            </button>
            <button
              onClick={() => setShowCreateModal(true)}
              className="text-gray-400 hover:text-white transition-colors duration-200"
              title="Create Playlist"
            >
              <PlusIcon className="w-5 h-5" />
            </button>
          </div>

          {/* Library Items */}
          <div className="space-y-2">
            {libraryItems.map((item) => {
              const Icon = item.icon
              return (
                <button
                  key={item.id}
                  onClick={item.onClick}
                  className={`w-full flex items-center justify-between py-2 px-2 rounded-md transition-colors duration-200 ${
                    currentView === item.id
                      ? 'bg-gray-800 text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className="w-5 h-5" />
                    <span className="text-sm">{item.label}</span>
                  </div>
                  {item.count > 0 && (
                    <span className="text-xs bg-gray-700 px-2 py-1 rounded-full">
                      {item.count}
                    </span>
                  )}
                </button>
              )
            })}
          </div>
        </div>

        {/* Playlists */}
        <div className="flex-1 px-6 mt-6 overflow-y-auto">
          <div className="space-y-2">
            {allPlaylists.map((playlist) => (
              <button
                key={playlist.id}
                onClick={() => onNavigate('playlist', playlist.id)}
                className={`w-full text-left py-2 px-2 rounded-md transition-colors duration-200 ${
                  currentView === 'playlist' ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                <div className="text-sm truncate">{playlist.name}</div>
                <div className="text-xs text-gray-500 truncate">
                  {playlist.isUserCreated ? 'Created by you' : `By ${playlist.creator?.name}`}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Install App */}
        <div className="p-6 border-t border-gray-800">
          <button className="text-gray-400 hover:text-white text-sm font-semibold transition-colors duration-200">
            Install App
          </button>
        </div>
      </div>

      {/* Create Playlist Modal */}
      {showCreateModal && (
        <CreatePlaylistModal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
        />
      )}
    </>
  )
}