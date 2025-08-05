'use client'

import { useState, useEffect } from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import SongItem from '../SongItem'
import { Song, Album, Artist } from '@/types'
import { songs, albums, artists } from '@/data/mockData'

interface SearchViewProps {
  searchQuery: string
  onSearchChange: (query: string) => void
  onNavigate: (view: string, id?: string) => void
}

export default function SearchView({ searchQuery, onSearchChange, onNavigate }: SearchViewProps) {
  const [searchResults, setSearchResults] = useState<{
    songs: Song[]
    albums: Album[]
    artists: Artist[]
  }>({ songs: [], albums: [], artists: [] })

  useEffect(() => {
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      
      const filteredSongs = songs.filter(song => 
        song.title.toLowerCase().includes(query) ||
        song.artist.toLowerCase().includes(query) ||
        song.album.toLowerCase().includes(query)
      )
      
      const filteredAlbums = albums.filter(album =>
        album.title.toLowerCase().includes(query) ||
        album.artist.toLowerCase().includes(query)
      )
      
      const filteredArtists = artists.filter(artist =>
        artist.name.toLowerCase().includes(query)
      )
      
      setSearchResults({
        songs: filteredSongs,
        albums: filteredAlbums,
        artists: filteredArtists
      })
    } else {
      setSearchResults({ songs: [], albums: [], artists: [] })
    }
  }, [searchQuery])

  return (
    <div className="p-6">
      {/* Search Input */}
      <div className="relative mb-8">
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="What do you want to listen to?"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full bg-gray-800 text-white pl-10 pr-4 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      {!searchQuery.trim() ? (
        <div className="text-center text-gray-400 mt-20">
          <MagnifyingGlassIcon className="w-16 h-16 mx-auto mb-4 opacity-50" />
          <h2 className="text-2xl font-bold mb-2">Search for music</h2>
          <p>Find your favorite songs, albums, and artists</p>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Songs Results */}
          {searchResults.songs.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Songs</h2>
              <div className="space-y-2">
                {searchResults.songs.slice(0, 5).map((song) => (
                  <SongItem key={song.id} song={song} />
                ))}
              </div>
            </div>
          )}

          {/* Albums Results */}
          {searchResults.albums.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Albums</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {searchResults.albums.slice(0, 10).map((album) => (
                  <div
                    key={album.id}
                    className="bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer"
                    onClick={() => onNavigate('album', album.id)}
                  >
                    <img
                      src={album.cover}
                      alt={album.title}
                      className="w-full aspect-square object-cover rounded-md mb-3"
                    />
                    <h3 className="text-white font-semibold truncate">{album.title}</h3>
                    <p className="text-gray-400 text-sm truncate">{album.artist}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Artists Results */}
          {searchResults.artists.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Artists</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {searchResults.artists.slice(0, 10).map((artist) => (
                  <div
                    key={artist.id}
                    className="bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer"
                    onClick={() => onNavigate('artist', artist.id)}
                  >
                    <img
                      src={artist.image}
                      alt={artist.name}
                      className="w-full aspect-square object-cover rounded-full mb-3"
                    />
                    <h3 className="text-white font-semibold truncate text-center">{artist.name}</h3>
                    <p className="text-gray-400 text-sm text-center">Artist</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* No Results */}
          {searchResults.songs.length === 0 && 
           searchResults.albums.length === 0 && 
           searchResults.artists.length === 0 && (
            <div className="text-center text-gray-400 mt-20">
              <h2 className="text-xl font-bold mb-2">No results found</h2>
              <p>Try searching for something else</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}