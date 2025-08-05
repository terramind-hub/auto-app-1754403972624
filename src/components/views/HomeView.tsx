'use client'

import { featuredPlaylists, newReleases, topArtists } from '@/data/mockData'
import PlaylistCard from '../PlaylistCard'
import AlbumCard from '../AlbumCard'
import ArtistCard from '../ArtistCard'

interface HomeViewProps {
  onNavigate: (view: string, id?: string) => void
}

export default function HomeView({ onNavigate }: HomeViewProps) {
  const currentHour = new Date().getHours()
  const greeting = currentHour < 12 ? 'Good morning' : currentHour < 18 ? 'Good afternoon' : 'Good evening'

  return (
    <div className="space-y-8 py-6">
      {/* Greeting */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">
          {greeting}
        </h1>
        
        {/* Quick Access Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {featuredPlaylists.slice(0, 6).map((playlist) => (
            <button
              key={playlist.id}
              onClick={() => onNavigate('playlist', playlist.id)}
              className="bg-gray-800 hover:bg-gray-700 rounded-md p-4 flex items-center space-x-4 transition-colors duration-200 group"
            >
              <img
                src={playlist.coverImage}
                alt={playlist.name}
                className="w-16 h-16 rounded-md object-cover"
              />
              <span className="text-white font-semibold truncate">
                {playlist.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Featured Playlists */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Made for you</h2>
          <button 
            onClick={() => onNavigate('library')}
            className="text-gray-400 hover:text-white text-sm font-semibold transition-colors duration-200"
          >
            Show all
          </button>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {featuredPlaylists.map((playlist) => (
            <PlaylistCard
              key={playlist.id}
              playlist={playlist}
              onClick={() => onNavigate('playlist', playlist.id)}
            />
          ))}
        </div>
      </section>

      {/* New Releases */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">New releases</h2>
          <button 
            onClick={() => onNavigate('library')}
            className="text-gray-400 hover:text-white text-sm font-semibold transition-colors duration-200"
          >
            Show all
          </button>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {newReleases.map((album) => (
            <AlbumCard
              key={album.id}
              album={album}
              onClick={() => onNavigate('album', album.id)}
            />
          ))}
        </div>
      </section>

      {/* Top Artists */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Popular artists</h2>
          <button 
            onClick={() => onNavigate('library')}
            className="text-gray-400 hover:text-white text-sm font-semibold transition-colors duration-200"
          >
            Show all
          </button>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {topArtists.map((artist) => (
            <ArtistCard
              key={artist.id}
              artist={artist}
              onClick={() => onNavigate('artist', artist.id)}
            />
          ))}
        </div>
      </section>

      {/* Recently Played */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Jump back in</h2>
          <button 
            onClick={() => onNavigate('recent')}
            className="text-gray-400 hover:text-white text-sm font-semibold transition-colors duration-200"
          >
            Show all
          </button>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {featuredPlaylists.slice(0, 5).map((playlist) => (
            <PlaylistCard
              key={`recent-${playlist.id}`}
              playlist={playlist}
              onClick={() => onNavigate('playlist', playlist.id)}
            />
          ))}
        </div>
      </section>
    </div>
  )
}