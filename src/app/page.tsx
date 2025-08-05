'use client'

import { useState } from 'react'
import Sidebar from '@/components/Sidebar'
import MainContent from '@/components/MainContent'
import MusicPlayer from '@/components/MusicPlayer'
import MobileNav from '@/components/MobileNav'

export default function Home() {
  const [currentView, setCurrentView] = useState('home')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedPlaylist, setSelectedPlaylist] = useState<string | null>(null)
  const [selectedAlbum, setSelectedAlbum] = useState<string | null>(null)
  const [selectedArtist, setSelectedArtist] = useState<string | null>(null)

  const handleNavigation = (view: string, id?: string) => {
    setCurrentView(view)
    setSelectedPlaylist(null)
    setSelectedAlbum(null)
    setSelectedArtist(null)
    
    if (view === 'playlist' && id) {
      setSelectedPlaylist(id)
    } else if (view === 'album' && id) {
      setSelectedAlbum(id)
    } else if (view === 'artist' && id) {
      setSelectedArtist(id)
    }
  }

  return (
    <div className="h-screen bg-black flex flex-col">
      <div className="flex flex-1 overflow-hidden">
        {/* Desktop Sidebar */}
        <div className="hidden md:block">
          <Sidebar 
            currentView={currentView}
            onNavigate={handleNavigation}
          />
        </div>
        
        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <MainContent 
            currentView={currentView}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedPlaylist={selectedPlaylist}
            selectedAlbum={selectedAlbum}
            selectedArtist={selectedArtist}
            onNavigate={handleNavigation}
          />
        </div>
      </div>
      
      {/* Music Player */}
      <MusicPlayer />
      
      {/* Mobile Navigation */}
      <div className="md:hidden">
        <MobileNav 
          currentView={currentView}
          onNavigate={handleNavigation}
        />
      </div>
    </div>
  )
}