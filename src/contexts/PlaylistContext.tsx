'use client'

import React, { createContext, useContext, useReducer } from 'react'
import { Playlist, Song } from '@/types'
import { mockPlaylists } from '@/data/mockData'

interface PlaylistState {
  playlists: Playlist[]
  userPlaylists: Playlist[]
}

type PlaylistAction =
  | { type: 'CREATE_PLAYLIST'; payload: { name: string; description?: string } }
  | { type: 'DELETE_PLAYLIST'; payload: string }
  | { type: 'UPDATE_PLAYLIST'; payload: { id: string; updates: Partial<Playlist> } }
  | { type: 'ADD_SONG_TO_PLAYLIST'; payload: { playlistId: string; song: Song } }
  | { type: 'REMOVE_SONG_FROM_PLAYLIST'; payload: { playlistId: string; songId: string } }
  | { type: 'REORDER_PLAYLIST_SONGS'; payload: { playlistId: string; fromIndex: number; toIndex: number } }

const initialState: PlaylistState = {
  playlists: mockPlaylists,
  userPlaylists: [],
}

function playlistReducer(state: PlaylistState, action: PlaylistAction): PlaylistState {
  switch (action.type) {
    case 'CREATE_PLAYLIST':
      const newPlaylist: Playlist = {
        id: `user-playlist-${Date.now()}`,
        name: action.payload.name,
        description: action.payload.description || '',
        coverImage: '/images/playlist-default.jpg',
        songs: [],
        duration: 0,
        isUserCreated: true,
        createdAt: new Date().toISOString(),
      }
      
      return {
        ...state,
        userPlaylists: [...state.userPlaylists, newPlaylist],
      }
    
    case 'DELETE_PLAYLIST':
      return {
        ...state,
        userPlaylists: state.userPlaylists.filter(playlist => playlist.id !== action.payload),
      }
    
    case 'UPDATE_PLAYLIST':
      return {
        ...state,
        userPlaylists: state.userPlaylists.map(playlist =>
          playlist.id === action.payload.id
            ? { ...playlist, ...action.payload.updates }
            : playlist
        ),
      }
    
    case 'ADD_SONG_TO_PLAYLIST':
      return {
        ...state,
        userPlaylists: state.userPlaylists.map(playlist => {
          if (playlist.id === action.payload.playlistId) {
            const songExists = playlist.songs.some(song => song.id === action.payload.song.id)
            if (songExists) return playlist
            
            const updatedSongs = [...playlist.songs, action.payload.song]
            const totalDuration = updatedSongs.reduce((sum, song) => sum + song.duration, 0)
            
            return {
              ...playlist,
              songs: updatedSongs,
              duration: totalDuration,
            }
          }
          return playlist
        }),
      }
    
    case 'REMOVE_SONG_FROM_PLAYLIST':
      return {
        ...state,
        userPlaylists: state.userPlaylists.map(playlist => {
          if (playlist.id === action.payload.playlistId) {
            const updatedSongs = playlist.songs.filter(song => song.id !== action.payload.songId)
            const totalDuration = updatedSongs.reduce((sum, song) => sum + song.duration, 0)
            
            return {
              ...playlist,
              songs: updatedSongs,
              duration: totalDuration,
            }
          }
          return playlist
        }),
      }
    
    case 'REORDER_PLAYLIST_SONGS':
      return {
        ...state,
        userPlaylists: state.userPlaylists.map(playlist => {
          if (playlist.id === action.payload.playlistId) {
            const newSongs = [...playlist.songs]
            const [movedSong] = newSongs.splice(action.payload.fromIndex, 1)
            newSongs.splice(action.payload.toIndex, 0, movedSong)
            
            return {
              ...playlist,
              songs: newSongs,
            }
          }
          return playlist
        }),
      }
    
    default:
      return state
  }
}

interface PlaylistContextType {
  state: PlaylistState
  dispatch: React.Dispatch<PlaylistAction>
  getAllPlaylists: () => Playlist[]
  getPlaylistById: (id: string) => Playlist | undefined
}

const PlaylistContext = createContext<PlaylistContextType | undefined>(undefined)

export function PlaylistProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(playlistReducer, initialState)

  const getAllPlaylists = () => {
    return [...state.playlists, ...state.userPlaylists]
  }

  const getPlaylistById = (id: string) => {
    return getAllPlaylists().find(playlist => playlist.id === id)
  }

  return (
    <PlaylistContext.Provider value={{ state, dispatch, getAllPlaylists, getPlaylistById }}>
      {children}
    </PlaylistContext.Provider>
  )
}

export function usePlaylist() {
  const context = useContext(PlaylistContext)
  if (context === undefined) {
    throw new Error('usePlaylist must be used within a PlaylistProvider')
  }
  return context
}