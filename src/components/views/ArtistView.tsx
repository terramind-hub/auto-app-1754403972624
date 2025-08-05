'use client'

import { useState } from 'react'
import { PlayIcon, PauseIcon, EllipsisHorizontalIcon, UserPlusIcon } from '@heroicons/react/24/outline'
import SongItem from '../SongItem'
import { useMusic } from '@/contexts/MusicContext'
import { artists, songs, albums } from '@/data/mockData'
import { formatTime } from '@/utils/formatTime'

interface ArtistViewProps {
  artistId: string
  onNavigate: (view: string, id?: string) => void
}

export default function ArtistView({ artistId, onNavigate }: ArtistViewProps) {
  const { currentSong, isPlaying, playPlaylist, togglePlayPause } = useMusic()
  const [isFollowing, setIsFollowing] = useState(false)

  const artist = artists.find(a => a.id === artistId)
  const artistSongs = songs.filter(song => song.artistId === artistId)
  const artistAlbums = albums.filter(album => album.artistId === artistId)
  const topSongs = artistSongs.slice(0, 5) // Show top 5 songs

  if (!artist) {
    return (
      <div className="p-6 text-center">
        <h1 className="text-2xl font-bold text-white mb-4">Artist not found</h1>
        <button
          onClick={() => onNavigate('home')}
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-full transition-colors"
        >
          Back to Home
        </button>
      </div>
    )
  }

  const isCurrentArtist = currentSong && artistSongs.some(song => song.id === currentSong.id)

  const handlePlayArtist = () => {
    if (artistSongs.length > 0) {
      if (isCurrentArtist && isPlaying) {
        togglePlayPause()
      } else {
        playPlaylist(artistSongs)
      }
    }
  }

  return (
    <div className="min-h-full">
      {/* Header */}
      <div className="bg-gradient-to-b from-red-800 to-gray-900 p-6 pb-8">
        <div className="flex items-end gap-6">
          <img
            src={artist.image}
            alt={artist.name}
            className="w-48 h-48 rounded-full shadow-2xl object-cover"
          />
          <div className="flex-1">
            <p className="text-sm font-medium text-white/70 uppercase tracking-wide mb-2">
              Artist
            </p>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              {artist.name}
            </h1>
            <div className="flex items-center gap-2 text-white/70">
              <span>{artist.monthlyListeners?.toLocaleString()} monthly listeners</span>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-gradient-to-b from-gray-900/60 to-gray-900 p-6">
        <div className="flex items-center gap-6">
          <button
            onClick={handlePlayArtist}
            disabled={artistSongs.length === 0}
            className="w-14 h-14 bg-green-500 hover:bg-green-400 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-full flex items-center justify-center transition-colors group"
          >
            {isCurrentArtist && isPlaying ? (
              <PauseIcon className="w-6 h-6 text-black" />
            ) : (
              <PlayIcon className="w-6 h-6 text-black ml-1" />
            )}
          </button>
          
          <button
            onClick={() => setIsFollowing(!isFollowing)}
            className={`px-6 py-2 rounded-full border transition-colors ${
              isFollowing
                ? 'border-gray-400 text-gray-400 hover:border-white hover:text-white'
                : 'border-white text-white hover:bg-white hover:text-black'
            }`}
          >
            {isFollowing ? 'Following' : 'Follow'}
          </button>
          
          <button className="w-8 h-8 text-gray-400 hover:text-white transition-colors">
            <EllipsisHorizontalIcon className="w-8 h-8" />
          </button>
        </div>
      </div>

      <div className="px-6 pb-6 space-y-8">
        {/* Popular Songs */}
        {topSongs.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Popular</h2>
            <div className="space-y-1">
              {topSongs.map((song, index) => (
                <div key={song.id} className="group">
                  <SongItem 
                    song={song} 
                    index={index + 1}
                    showAlbum
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Albums */}
        {artistAlbums.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-white">Albums</h2>
              {artistAlbums.length > 5 && (
                <button className="text-gray-400 hover:text-white text-sm font-medium">
                  Show all
                </button>
              )}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {artistAlbums.slice(0, 5).map((album) => (
                <div
                  key={album.id}
                  className="bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer group"
                  onClick={() => onNavigate('album', album.id)}
                >
                  <img
                    src={album.cover}
                    alt={album.title}
                    className="w-full aspect-square object-cover rounded-md mb-3"
                  />
                  <h3 className="text-white font-semibold truncate">{album.title}</h3>
                  <p className="text-gray-400 text-sm">{album.year} • Album</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* About */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">About</h2>
          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-start gap-6">
              <img
                src={artist.image}
                alt={artist.name}
                className="w-32 h-32 rounded-full object-cover"
              />
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-2">{artist.name}</h3>
                <p className="text-gray-300 mb-4">
                  {artist.bio || `${artist.name} is a talented artist with ${artist.monthlyListeners?.toLocaleString()} monthly listeners on Spotify.`}
                </p>
                <div className="text-sm text-gray-400">
                  <p>{artist.monthlyListeners?.toLocaleString()} monthly listeners</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}