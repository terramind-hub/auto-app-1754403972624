'use client'

import { useState } from 'react'
import { PlayIcon, PauseIcon, EllipsisHorizontalIcon, HeartIcon } from '@heroicons/react/24/outline'
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid'
import SongItem from '../SongItem'
import { useMusic } from '@/contexts/MusicContext'
import { albums, songs } from '@/data/mockData'
import { formatTime } from '@/utils/formatTime'

interface AlbumViewProps {
  albumId: string
  onNavigate: (view: string, id?: string) => void
}

export default function AlbumView({ albumId, onNavigate }: AlbumViewProps) {
  const { currentSong, isPlaying, playPlaylist, togglePlayPause } = useMusic()
  const [isLiked, setIsLiked] = useState(false)

  const album = albums.find(a => a.id === albumId)
  const albumSongs = songs.filter(song => song.albumId === albumId)

  if (!album) {
    return (
      <div className="p-6 text-center">
        <h1 className="text-2xl font-bold text-white mb-4">Album not found</h1>
        <button
          onClick={() => onNavigate('home')}
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-full transition-colors"
        >
          Back to Home
        </button>
      </div>
    )
  }

  const totalDuration = albumSongs.reduce((total, song) => total + song.duration, 0)
  const isCurrentAlbum = currentSong && albumSongs.some(song => song.id === currentSong.id)

  const handlePlayAlbum = () => {
    if (albumSongs.length > 0) {
      if (isCurrentAlbum && isPlaying) {
        togglePlayPause()
      } else {
        playPlaylist(albumSongs)
      }
    }
  }

  return (
    <div className="min-h-full">
      {/* Header */}
      <div className="bg-gradient-to-b from-blue-800 to-gray-900 p-6 pb-8">
        <div className="flex items-end gap-6">
          <img
            src={album.cover}
            alt={album.title}
            className="w-48 h-48 rounded-lg shadow-2xl"
          />
          <div className="flex-1">
            <p className="text-sm font-medium text-white/70 uppercase tracking-wide mb-2">
              Album
            </p>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              {album.title}
            </h1>
            <div className="flex items-center gap-2 text-white/70 mb-4">
              <button
                onClick={() => onNavigate('artist', album.artistId)}
                className="hover:text-white hover:underline transition-colors"
              >
                {album.artist}
              </button>
              <span>•</span>
              <span>{album.year}</span>
              <span>•</span>
              <span>{albumSongs.length} songs</span>
              <span>•</span>
              <span>{formatTime(totalDuration)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-gradient-to-b from-gray-900/60 to-gray-900 p-6">
        <div className="flex items-center gap-6">
          <button
            onClick={handlePlayAlbum}
            disabled={albumSongs.length === 0}
            className="w-14 h-14 bg-green-500 hover:bg-green-400 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-full flex items-center justify-center transition-colors group"
          >
            {isCurrentAlbum && isPlaying ? (
              <PauseIcon className="w-6 h-6 text-black" />
            ) : (
              <PlayIcon className="w-6 h-6 text-black ml-1" />
            )}
          </button>
          
          <button
            onClick={() => setIsLiked(!isLiked)}
            className="w-8 h-8 text-gray-400 hover:text-white transition-colors"
          >
            {isLiked ? (
              <HeartIconSolid className="w-8 h-8 text-green-500" />
            ) : (
              <HeartIcon className="w-8 h-8" />
            )}
          </button>
          
          <button className="w-8 h-8 text-gray-400 hover:text-white transition-colors">
            <EllipsisHorizontalIcon className="w-8 h-8" />
          </button>
        </div>
      </div>

      {/* Songs List */}
      <div className="px-6 pb-6">
        {albumSongs.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-xl font-bold text-white mb-2">No songs found</h2>
            <p className="text-gray-400">This album appears to be empty</p>
          </div>
        ) : (
          <div className="space-y-1">
            {/* Header */}
            <div className="grid grid-cols-12 gap-4 px-4 py-2 text-sm text-gray-400 border-b border-gray-800">
              <div className="col-span-1">#</div>
              <div className="col-span-9">Title</div>
              <div className="col-span-2 text-right">Duration</div>
            </div>
            
            {/* Songs */}
            {albumSongs.map((song, index) => (
              <div key={song.id} className="group">
                <SongItem 
                  song={song} 
                  index={index + 1}
                  showAlbum={false}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}