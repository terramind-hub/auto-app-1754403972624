'use client'

import { useState, useEffect } from 'react'
import { useMusic } from '@/contexts/MusicContext'
import { 
  PlayIcon, 
  PauseIcon, 
  ForwardIcon, 
  BackwardIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
  ArrowsRightLeftIcon,
  ArrowPathIcon,
  HeartIcon,
  QueueListIcon
} from '@heroicons/react/24/outline'
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid'
import Image from 'next/image'
import { formatTime } from '@/utils/formatTime'
import VolumeControl from './VolumeControl'
import ProgressBar from './ProgressBar'
import QueueModal from './QueueModal'

export default function MusicPlayer() {
  const { state, dispatch } = useMusic()
  const [showQueue, setShowQueue] = useState(false)
  const [previousVolume, setPreviousVolume] = useState(0.7)
  
  const {
    currentSong,
    isPlaying,
    volume,
    currentTime,
    duration,
    isShuffled,
    repeatMode,
    likedSongs
  } = state

  const isLiked = currentSong ? likedSongs.includes(currentSong.id) : false
  const isMuted = volume === 0

  const handlePlayPause = () => {
    dispatch({ type: 'TOGGLE_PLAY' })
  }

  const handleNext = () => {
    dispatch({ type: 'NEXT_SONG' })
  }

  const handlePrevious = () => {
    dispatch({ type: 'PREVIOUS_SONG' })
  }

  const handleShuffle = () => {
    dispatch({ type: 'TOGGLE_SHUFFLE' })
  }

  const handleRepeat = () => {
    dispatch({ type: 'TOGGLE_REPEAT' })
  }

  const handleLike = () => {
    if (currentSong) {
      dispatch({ type: 'TOGGLE_LIKE', payload: currentSong.id })
    }
  }

  const handleVolumeChange = (newVolume: number) => {
    dispatch({ type: 'SET_VOLUME', payload: newVolume })
  }

  const handleMute = () => {
    if (isMuted) {
      dispatch({ type: 'SET_VOLUME', payload: previousVolume })
    } else {
      setPreviousVolume(volume)
      dispatch({ type: 'SET_VOLUME', payload: 0 })
    }
  }

  const handleSeek = (time: number) => {
    dispatch({ type: 'SEEK', payload: time })
  }

  if (!currentSong) {
    return null
  }

  return (
    <>
      <div className="bg-gray-900 border-t border-gray-800 px-4 py-3 flex items-center justify-between">
        {/* Song Info */}
        <div className="flex items-center space-x-4 min-w-0 w-1/4">
          <div className="relative w-14 h-14 rounded-md overflow-hidden flex-shrink-0">
            <Image
              src={currentSong.coverImage}
              alt={currentSong.title}
              fill
              className="object-cover"
              sizes="56px"
            />
          </div>
          <div className="min-w-0">
            <h4 className="text-white text-sm font-medium truncate">
              {currentSong.title}
            </h4>
            <p className="text-gray-400 text-xs truncate">
              {currentSong.artist}
            </p>
          </div>
          <button
            onClick={handleLike}
            className={`flex-shrink-0 w-6 h-6 ${isLiked ? 'text-green-500' : 'text-gray-400 hover:text-white'} transition-colors duration-200`}
          >
            {isLiked ? (
              <HeartIconSolid className="w-full h-full" />
            ) : (
              <HeartIcon className="w-full h-full" />
            )}
          </button>
        </div>

        {/* Player Controls */}
        <div className="flex flex-col items-center space-y-2 w-2/4 max-w-md">
          <div className="flex items-center space-x-4">
            <button
              onClick={handleShuffle}
              className={`player-control ${isShuffled ? 'active' : ''}`}
              title="Shuffle"
            >
              <ArrowsRightLeftIcon className="w-4 h-4" />
            </button>
            
            <button
              onClick={handlePrevious}
              className="player-control"
              title="Previous"
            >
              <BackwardIcon className="w-5 h-5" />
            </button>
            
            <button
              onClick={handlePlayPause}
              className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:scale-105 transition-transform duration-200"
              title={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? (
                <PauseIcon className="w-5 h-5 text-black" />
              ) : (
                <PlayIcon className="w-5 h-5 text-black ml-0.5" />
              )}
            </button>
            
            <button
              onClick={handleNext}
              className="player-control"
              title="Next"
            >
              <ForwardIcon className="w-5 h-5" />
            </button>
            
            <button
              onClick={handleRepeat}
              className={`player-control ${repeatMode !== 'off' ? 'active' : ''}`}
              title={`Repeat ${repeatMode}`}
            >
              <ArrowPathIcon className="w-4 h-4" />
              {repeatMode === 'one' && (
                <span className="absolute text-xs font-bold">1</span>
              )}
            </button>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full flex items-center space-x-2">
            <span className="text-xs text-gray-400 w-10 text-right">
              {formatTime(currentTime)}
            </span>
            <ProgressBar
              currentTime={currentTime}
              duration={duration}
              onSeek={handleSeek}
            />
            <span className="text-xs text-gray-400 w-10">
              {formatTime(duration)}
            </span>
          </div>
        </div>

        {/* Volume and Queue */}
        <div className="flex items-center space-x-4 w-1/4 justify-end">
          <button
            onClick={() => setShowQueue(true)}
            className="player-control"
            title="Queue"
          >
            <QueueListIcon className="w-5 h-5" />
          </button>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={handleMute}
              className="player-control"
              title={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? (
                <SpeakerXMarkIcon className="w-5 h-5" />
              ) : (
                <SpeakerWaveIcon className="w-5 h-5" />
              )}
            </button>
            
            <VolumeControl
              volume={volume}
              onVolumeChange={handleVolumeChange}
            />
          </div>
        </div>
      </div>

      {/* Queue Modal */}
      {showQueue && (
        <QueueModal
          isOpen={showQueue}
          onClose={() => setShowQueue(false)}
        />
      )}
    </>
  )
}