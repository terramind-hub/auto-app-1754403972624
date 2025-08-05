'use client'

import { useState } from 'react'

interface VolumeControlProps {
  volume: number
  onVolumeChange: (volume: number) => void
}

export default function VolumeControl({ volume, onVolumeChange }: VolumeControlProps) {
  const [isDragging, setIsDragging] = useState(false)

  const handleMouseDown = () => {
    setIsDragging(true)
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value)
    onVolumeChange(newVolume)
  }

  return (
    <div className="flex items-center space-x-2 w-24">
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={volume}
        onChange={handleChange}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
      />
    </div>
  )
}