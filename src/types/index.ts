export interface Song {
  id: string
  title: string
  artist: string
  album: string
  duration: number // in seconds
  coverImage: string
  audioUrl: string
  releaseDate: string
  genre: string
  isExplicit?: boolean
}

export interface Album {
  id: string
  title: string
  artist: string
  coverImage: string
  releaseDate: string
  genre: string
  songs: Song[]
  duration: number // total duration in seconds
  description?: string
}

export interface Artist {
  id: string
  name: string
  image: string
  bio?: string
  followers: number
  verified: boolean
  topSongs: Song[]
  albums: Album[]
  monthlyListeners: number
}

export interface Playlist {
  id: string
  name: string
  description: string
  coverImage: string
  songs: Song[]
  duration: number // total duration in seconds
  isUserCreated?: boolean
  createdAt?: string
  updatedAt?: string
  isPublic?: boolean
  followers?: number
  creator?: {
    id: string
    name: string
    image?: string
  }
}

export interface User {
  id: string
  name: string
  email: string
  image?: string
  playlists: string[] // playlist IDs
  likedSongs: string[] // song IDs
  followedArtists: string[] // artist IDs
  recentlyPlayed: Song[]
}

export interface SearchResult {
  songs: Song[]
  albums: Album[]
  artists: Artist[]
  playlists: Playlist[]
}

export type ViewType = 'home' | 'search' | 'library' | 'playlist' | 'album' | 'artist' | 'liked' | 'recent'

export type RepeatMode = 'off' | 'all' | 'one'

export interface QueueItem {
  song: Song
  addedAt: string
  addedBy?: string
}