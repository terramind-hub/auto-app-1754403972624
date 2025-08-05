'use client'

import { useState } from 'react'
import { PlayIcon, PauseIcon, EllipsisHorizontalIcon, HeartIcon, PlusIcon } from '@heroicons/react/24/outline'
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid'
import SongItem from '../SongItem'
import { usePlaylists } from '@/contexts/PlaylistContext'
import { useMusic } from '@/contexts/MusicContext'
import { formatTime } from '@/utils/formatTime'

interface PlaylistViewProps {
  playlistId: string
  onNavigate: (view: string, id?: string) => void
}

export default function PlaylistView({ playlistId, onNavigate }: PlaylistViewProps) {
  const { playlists } = usePlaylists()
  const { currentSong, isPlaying, playPlaylist, togglePlayPause } = useMusic()
  const [isLiked, setIsLiked] = useState(false)

  const playlist = playlists.find(p => p.id === playlistId)

  if (!playlist) {
    return (
      <div className="p-6 text-center">
        <h1 className="text-2xl font-bold text-white mb-4">Playlist not found</h1>
        <button
          onClick={() => onNavigate('library')}
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-full transition-colors"
        >
          Back to Library
        </button>
      </div>
    )
  }

  const totalDuration = playlist.songs.reduce((total, song) => total + song.duration, 0)
  const isCurrentPlaylist = currentSong && playlist.songs.some(song => song.id === currentSong.id)

  const handlePlayPlaylist = () => {
    if (playlist.songs.length > 0) {
      if (isCurrentPlaylist && isPlaying) {
        togglePlayPause()
      } else {
        playPlaylist(playlist.songs)
      }
    }
  }

  return (
    <div className="min-h-full">
      {/* Header */}
      <div className="bg-gradient-to-b from-purple-800 to-gray-900 p-6 pb-8">
        <div className="flex items-end gap-6">
          <img
            src={playlist.cover}
            alt={playlist.name}
            className="w-48 h-48 rounded-lg shadow-2xl"
          />
          <div className="flex-1">
            <p className="text-sm font-medium text-white/70 uppercase tracking-wide mb-2">
              Playlist
            </p>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              {playlist.name}
            </h1>
            {playlist.description && (
              <p className="text-white/70 mb-4">{playlist.description}</p>
            )}
            <div className="flex items-center gap-2 text-sm text-white/70">
              <span>{playlist.songs.length} songs</span>
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
            onClick={handlePlayPlaylist}
            disabled={playlist.songs.length === 0}
            className="w-14 h-14 bg-green-500 hover:bg-green-400 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-full flex items-center justify-center transition-colors group"
          >
            {isCurrentPlaylist && isPlaying ? (
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
        {playlist.songs.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-xl font-bold text-white mb-2">This playlist is empty</h2>
            <p className="text-gray-400 mb-6">Add some songs to get started</p>
            <button
              onClick={() => onNavigate('search')}
              className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-full transition-colors mx-auto"
            >
              <PlusIcon className="w-5 h-5" />
              Find songs
            </button>
          </div>
        ) : (
          <div className="space-y-1">
            {/* Header */}
            <div className="grid grid-cols-12 gap-4 px-4 py-2 text-sm text-gray-400 border-b border-gray-800">
              <div className="col-span-1">#</div>
              <div className="col-span-6">Title</div>
              <div className="col-span-3">Album</div>
              <div className="col-span-2 text-right">Duration</div>
            </div>
            
            {/* Songs */}
            {playlist.songs.map((song, index) => (
              <div key={song.id} className="group">
                <SongItem 
                  song={song} 
                  index={index + 1}
                  showAlbum
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}