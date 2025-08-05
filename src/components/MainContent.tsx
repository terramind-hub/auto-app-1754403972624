'use client'

import { useState } from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import HomeView from './views/HomeView'
import SearchView from './views/SearchView'
import LibraryView from './views/LibraryView'
import PlaylistView from './views/PlaylistView'
import AlbumView from './views/AlbumView'
import ArtistView from './views/ArtistView'

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
  onNavigate
}: MainContentProps) {
  const renderContent = () => {
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
          <PlaylistView 
            playlistId={selectedPlaylist}
            onNavigate={onNavigate}
          />
        ) : (
          <LibraryView onNavigate={onNavigate} />
        )
      case 'album':
        return selectedAlbum ? (
          <AlbumView 
            albumId={selectedAlbum}
            onNavigate={onNavigate}
          />
        ) : (
          <HomeView onNavigate={onNavigate} />
        )
      case 'artist':
        return selectedArtist ? (
          <ArtistView 
            artistId={selectedArtist}
            onNavigate={onNavigate}
          />
        ) : (
          <HomeView onNavigate={onNavigate} />
        )
      default:
        return <HomeView onNavigate={onNavigate} />
    }
  }

  return (
    <main className="flex-1 bg-gradient-to-b from-gray-900 to-black overflow-y-auto">
      {renderContent()}
    </main>
  )
}