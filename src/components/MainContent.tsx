'use client'

import { useState } from 'react'
import HomeView from './views/HomeView'
import SearchView from './views/SearchView'
import LibraryView from './views/LibraryView'
import PlaylistView from './views/PlaylistView'
import AlbumView from './views/AlbumView'
import ArtistView from './views/ArtistView'
import LikedSongsView from './views/LikedSongsView'
import RecentlyPlayedView from './views/RecentlyPlayedView'
import Header from './Header'

interface MainContentProps {
  currentView: string
  searchQuery: string
  onSearchChange: (query: string) => void
  selectedPlaylist: string | null
  selectedAlbum: string | null
  selectedArtist: string | null
  onNavigate: (view: string, id?: string) => void
}

export default function MainContent({
  currentView,
  searchQuery,
  onSearchChange,
  selectedPlaylist,
  selectedAlbum,
  selectedArtist,
  onNavigate,
}: MainContentProps) {
  const [showUserMenu, setShowUserMenu] = useState(false)

  const renderView = () => {
    switch (currentView) {
      case 'home':
        return <HomeView onNavigate={onNavigate} />
      case 'search':
        return (
          <SearchView 
            searchQuery={searchQuery} 
            onSearchChange={onSearchChange}
            onNavigate={onNavigate}
          />
        )
      case 'library':
        return <LibraryView onNavigate={onNavigate} />
      case 'playlist':
        return selectedPlaylist ? (
          <PlaylistView playlistId={selectedPlaylist} onNavigate={onNavigate} />
        ) : (
          <div className="p-8 text-center text-gray-400">Playlist not found</div>
        )
      case 'album':
        return selectedAlbum ? (
          <AlbumView albumId={selectedAlbum} onNavigate={onNavigate} />
        ) : (
          <div className="p-8 text-center text-gray-400">Album not found</div>
        )
      case 'artist':
        return selectedArtist ? (
          <ArtistView artistId={selectedArtist} onNavigate={onNavigate} />
        ) : (
          <div className="p-8 text-center text-gray-400">Artist not found</div>
        )
      case 'liked':
        return <LikedSongsView />
      case 'recent':
        return <RecentlyPlayedView />
      default:
        return <HomeView onNavigate={onNavigate} />
    }
  }

  return (
    <div className="flex-1 flex flex-col bg-gradient-to-b from-gray-900 to-black overflow-hidden">
      <Header 
        currentView={currentView}
        searchQuery={searchQuery}
        onSearchChange={onSearchChange}
        showUserMenu={showUserMenu}
        onToggleUserMenu={() => setShowUserMenu(!showUserMenu)}
      />
      
      <main className="flex-1 overflow-y-auto px-4 md:px-8 pb-4">
        <div className="max-w-7xl mx-auto">
          {renderView()}
        </div>
      </main>
    </div>
  )
}