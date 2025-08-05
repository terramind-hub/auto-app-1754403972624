'use client'

import React, { createContext, useContext, useReducer, useRef, useEffect } from 'react'
import { Song } from '@/types'
import { mockSongs } from '@/data/mockData'

interface MusicState {
  currentSong: Song | null
  isPlaying: boolean
  queue: Song[]
  currentIndex: number
  volume: number
  currentTime: number
  duration: number
  isShuffled: boolean
  repeatMode: 'off' | 'all' | 'one'
  recentlyPlayed: Song[]
  likedSongs: string[]
}

type MusicAction =
  | { type: 'PLAY_SONG'; payload: { song: Song; queue?: Song[] } }
  | { type: 'TOGGLE_PLAY' }
  | { type: 'NEXT_SONG' }
  | { type: 'PREVIOUS_SONG' }
  | { type: 'SET_VOLUME'; payload: number }
  | { type: 'SET_CURRENT_TIME'; payload: number }
  | { type: 'SET_DURATION'; payload: number }
  | { type: 'TOGGLE_SHUFFLE' }
  | { type: 'TOGGLE_REPEAT' }
  | { type: 'SEEK'; payload: number }
  | { type: 'TOGGLE_LIKE'; payload: string }
  | { type: 'ADD_TO_QUEUE'; payload: Song }
  | { type: 'REMOVE_FROM_QUEUE'; payload: number }

const initialState: MusicState = {
  currentSong: null,
  isPlaying: false,
  queue: [],
  currentIndex: 0,
  volume: 0.7,
  currentTime: 0,
  duration: 0,
  isShuffled: false,
  repeatMode: 'off',
  recentlyPlayed: [],
  likedSongs: [],
}

function musicReducer(state: MusicState, action: MusicAction): MusicState {
  switch (action.type) {
    case 'PLAY_SONG':
      const newQueue = action.payload.queue || [action.payload.song]
      const newIndex = newQueue.findIndex(song => song.id === action.payload.song.id)
      
      // Add to recently played
      const updatedRecentlyPlayed = [
        action.payload.song,
        ...state.recentlyPlayed.filter(song => song.id !== action.payload.song.id)
      ].slice(0, 50)
      
      return {
        ...state,
        currentSong: action.payload.song,
        queue: newQueue,
        currentIndex: newIndex,
        isPlaying: true,
        recentlyPlayed: updatedRecentlyPlayed,
        currentTime: 0,
      }
    
    case 'TOGGLE_PLAY':
      return {
        ...state,
        isPlaying: !state.isPlaying,
      }
    
    case 'NEXT_SONG':
      if (state.queue.length === 0) return state
      
      let nextIndex = state.currentIndex + 1
      if (nextIndex >= state.queue.length) {
        if (state.repeatMode === 'all') {
          nextIndex = 0
        } else {
          return { ...state, isPlaying: false }
        }
      }
      
      return {
        ...state,
        currentSong: state.queue[nextIndex],
        currentIndex: nextIndex,
        currentTime: 0,
      }
    
    case 'PREVIOUS_SONG':
      if (state.queue.length === 0) return state
      
      let prevIndex = state.currentIndex - 1
      if (prevIndex < 0) {
        prevIndex = state.queue.length - 1
      }
      
      return {
        ...state,
        currentSong: state.queue[prevIndex],
        currentIndex: prevIndex,
        currentTime: 0,
      }
    
    case 'SET_VOLUME':
      return {
        ...state,
        volume: Math.max(0, Math.min(1, action.payload)),
      }
    
    case 'SET_CURRENT_TIME':
      return {
        ...state,
        currentTime: action.payload,
      }
    
    case 'SET_DURATION':
      return {
        ...state,
        duration: action.payload,
      }
    
    case 'TOGGLE_SHUFFLE':
      return {
        ...state,
        isShuffled: !state.isShuffled,
      }
    
    case 'TOGGLE_REPEAT':
      const modes: ('off' | 'all' | 'one')[] = ['off', 'all', 'one']
      const currentModeIndex = modes.indexOf(state.repeatMode)
      const nextMode = modes[(currentModeIndex + 1) % modes.length]
      
      return {
        ...state,
        repeatMode: nextMode,
      }
    
    case 'SEEK':
      return {
        ...state,
        currentTime: action.payload,
      }
    
    case 'TOGGLE_LIKE':
      const isLiked = state.likedSongs.includes(action.payload)
      return {
        ...state,
        likedSongs: isLiked
          ? state.likedSongs.filter(id => id !== action.payload)
          : [...state.likedSongs, action.payload],
      }
    
    case 'ADD_TO_QUEUE':
      return {
        ...state,
        queue: [...state.queue, action.payload],
      }
    
    case 'REMOVE_FROM_QUEUE':
      const newQueueAfterRemoval = state.queue.filter((_, index) => index !== action.payload)
      let newCurrentIndex = state.currentIndex
      
      if (action.payload < state.currentIndex) {
        newCurrentIndex = state.currentIndex - 1
      } else if (action.payload === state.currentIndex) {
        if (newQueueAfterRemoval.length === 0) {
          return {
            ...state,
            queue: [],
            currentSong: null,
            currentIndex: 0,
            isPlaying: false,
          }
        }
        newCurrentIndex = Math.min(state.currentIndex, newQueueAfterRemoval.length - 1)
      }
      
      return {
        ...state,
        queue: newQueueAfterRemoval,
        currentIndex: newCurrentIndex,
        currentSong: newQueueAfterRemoval[newCurrentIndex] || null,
      }
    
    default:
      return state
  }
}

interface MusicContextType {
  state: MusicState
  dispatch: React.Dispatch<MusicAction>
  audioRef: React.RefObject<HTMLAudioElement>
}

const MusicContext = createContext<MusicContextType | undefined>(undefined)

export function MusicProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(musicReducer, initialState)
  const audioRef = useRef<HTMLAudioElement>(null)

  // Handle audio events
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handleTimeUpdate = () => {
      dispatch({ type: 'SET_CURRENT_TIME', payload: audio.currentTime })
    }

    const handleLoadedMetadata = () => {
      dispatch({ type: 'SET_DURATION', payload: audio.duration })
    }

    const handleEnded = () => {
      if (state.repeatMode === 'one') {
        audio.currentTime = 0
        audio.play()
      } else {
        dispatch({ type: 'NEXT_SONG' })
      }
    }

    audio.addEventListener('timeupdate', handleTimeUpdate)
    audio.addEventListener('loadedmetadata', handleLoadedMetadata)
    audio.addEventListener('ended', handleEnded)

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate)
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata)
      audio.removeEventListener('ended', handleEnded)
    }
  }, [state.repeatMode])

  // Handle play/pause
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    if (state.isPlaying && state.currentSong) {
      audio.play().catch(console.error)
    } else {
      audio.pause()
    }
  }, [state.isPlaying, state.currentSong])

  // Handle volume changes
  useEffect(() => {
    const audio = audioRef.current
    if (audio) {
      audio.volume = state.volume
    }
  }, [state.volume])

  return (
    <MusicContext.Provider value={{ state, dispatch, audioRef }}>
      {children}
      <audio ref={audioRef} src={state.currentSong?.audioUrl} preload="metadata" />
    </MusicContext.Provider>
  )
}

export function useMusic() {
  const context = useContext(MusicContext)
  if (context === undefined) {
    throw new Error('useMusic must be used within a MusicProvider')
  }
  return context
}