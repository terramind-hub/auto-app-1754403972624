'use client'

import { useState } from 'react'
import { useMusic } from '@/contexts/MusicContext'
import { Song } from '@/types'
import { 
  PlayIcon, 
  PauseIcon, 
  HeartIcon,
  EllipsisHorizontalIcon
} from '@heroicons/react/24/outline'
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid'
import Image from 'next/image'
import { formatTime } from '@/utils/formatTime'
import SongMenu from './SongMenu'

interface SongItemProps {
  song: Song
  index?: number
  showIndex?: boolean
  showAlbum?: boolean
  showArtist?: boolean
  showDateAdded?: boolean
  playlist?: Song[]
  onNavigate?: (view: string, id?: string) => void
}

export default function SongItem({
  song,
  index,
  showIndex = true,
  showAlbum = true,
  showArtist = true,
  showDateAdded = false,
  playlist = [],
  onNavigate,
}: SongItemProps) {
  const { state, dispatch } = useMusic()
  const [showMenu, setShowMenu] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  
  const { currentSong, isPlaying, likedSongs } = state
  const isCurrentSong = currentSong?.id === song.id
  const isLiked = likedSongs.includes(song.id)
  const shouldShowPlayButton = isHovered || isCurrentSong

  const handlePlay = () => {
    if (isCurrentSong) {
      dispatch({ type: 'TOGGLE_PLAY' })
    } else {
      const queue = playlist.length > 0 ? playlist : [song]
      dispatch({ type: 'PLAY_SONG', payload: { song, queue } })
    }
  }

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation()
    dispatch({ type: 'TOGGLE_LIKE', payload: song.id })
  }

  const handleMenuClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    setShowMenu(true)
  }

  const handleArtistClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (onNavigate) {
      // In a real app, you'd find the artist ID
      onNavigate('artist', 'artist-1')
    }
  }

  const handleAlbumClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (onNavigate) {
      // In a real app, you'd find the album ID
      onNavigate('album', 'album-1')
    }
  }

  return (
    <>
      <div
        className={`group grid grid-cols-[16px_1fr_1fr_1fr_60px] md:grid-cols-[16px_1fr_1fr_1fr_1fr_60px] gap-4 items-center px-4 py-2 rounded-md hover:bg-white hover:bg-opacity-10 transition-colors duration-200 cursor-pointer ${
          isCurrentSong ? 'bg-white bg-opacity-5' : ''
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handlePlay}
      >
        {/* Index/Play Button */}
        <div className="flex items-center justify-center">
          {shouldShowPlayButton ? (
            <button
              onClick={handlePlay}
              className="w-4 h-4 flex items-center justify-center"
            >
              {isCurrentSong && isPlaying ? (
                <PauseIcon className="w-4 h-4 text-white" />
              ) : (
                <PlayIcon className="w-4 h-4 text-white" />
              )}
            </button>
          ) : (
            <span className={`text-sm ${isCurrentSong ? 'text-green-500' : 'text-gray-400'}`}>
              {showIndex && typeof index === 'number' ? index + 1 : ''}
            </span>
          )}
        </div>

        {/* Song Info */}
        <div className="flex items-center space-x-3 min-w-0">
          <div className="relative w-10 h-10 rounded-md overflow-hidden flex-shrink-0">
            <Image
              src={song.coverImage}
              alt={song.title}
              fill
              className="object-cover"
              sizes="40px"
            />
          </div>
          <div className="min-w-0">
            <h4 className={`text-sm font-medium truncate ${
              isCurrentSong ? 'text-green-500' : 'text-white'
            }`}>
              {song.title}
              {song.isExplicit && (
                <span className="ml-2 text-xs bg-gray-600 px-1 rounded text-gray-300">
                  E
                </span>
              )}
            </h4>
            {showArtist && (
              <button
                onClick={handleArtistClick}
                className="text-xs text-gray-400 hover:text-white hover:underline truncate block text-left"
              >
                {song.artist}
              </button>
            )}
          </div>
        </div>

        {/* Album */}
        {showAlbum && (
          <div className="hidden md:block">
            <button
              onClick={handleAlbumClick}
              className="text-sm text-gray-400 hover:text-white hover:underline truncate block text-left"
            >
              {song.album}
            </button>
          </div>
        )}

        {/* Date Added */}
        {showDateAdded && (
          <div className="hidden lg:block">
            <span className="text-sm text-gray-400">
              {new Date(song.releaseDate).toLocaleDateString()}
            </span>
          </div>
        )}

        {/* Duration */}
        <div className="flex items-center justify-end space-x-2">
          <button
            onClick={handleLike}
            className={`w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ${
              isLiked ? 'text-green-500 opacity-100' : 'text-gray-400 hover:text-white'
            }`}
          >
            {isLiked ? (
              <HeartIconSolid className="w-full h-full" />
            ) : (
              <HeartIcon className="w-full h-full" />
            )}
          </button>
          
          <span className="text-sm text-gray-400 w-12 text-right">
            {formatTime(song.duration)}
          </span>
          
          <button
            onClick={handleMenuClick}
            className="w-4 h-4 text-gray-400 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          >
            <EllipsisHorizontalIcon className="w-full h-full" />
          </button>
        </div>
      </div>

      {/* Song Menu */}
      {showMenu && (
        <SongMenu
          song={song}
          isOpen={showMenu}
          onClose={() => setShowMenu(false)}
        />
      )}
    </>
  )
}