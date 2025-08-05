'use client'

import { useState } from 'react'

interface ProgressBarProps {
  currentTime: number
  duration: number
  onSeek: (time: number) => void
}

export default function ProgressBar({ currentTime, duration, onSeek }: ProgressBarProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [dragTime, setDragTime] = useState(0)

  const progress = duration > 0 ? (isDragging ? dragTime : currentTime) / duration : 0

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true)
    handleMouseMove(e)
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging && e.type !== 'mousedown') return
    
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const percentage = Math.max(0, Math.min(1, x / rect.width))
    const time = percentage * duration
    
    if (isDragging) {
      setDragTime(time)
    }
  }

  const handleMouseUp = () => {
    if (isDragging) {
      onSeek(dragTime)
      setIsDragging(false)
    }
  }

  return (
    <div
      className="flex-1 h-1 bg-gray-600 rounded-full cursor-pointer relative group"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div
        className="h-full bg-white rounded-full transition-all duration-150 group-hover:bg-green-500"
        style={{ width: `${progress * 100}%` }}
      >
        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-150" />
      </div>
    </div>
  )
}