'use client'

import { HomeIcon, MagnifyingGlassIcon, QueueListIcon } from '@heroicons/react/24/outline'

interface MobileNavProps {
  currentView: string
  onNavigate: (view: string) => void
}

export default function MobileNav({ currentView, onNavigate }: MobileNavProps) {
  const navItems = [
    { id: 'home', label: 'Home', icon: HomeIcon },
    { id: 'search', label: 'Search', icon: MagnifyingGlassIcon },
    { id: 'library', label: 'Your Library', icon: QueueListIcon },
  ]

  return (
    <div className="bg-black border-t border-gray-800 px-4 py-2">
      <div className="flex justify-around">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = currentView === item.id
          
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center space-y-1 px-3 py-2 rounded-lg transition-colors ${
                isActive
                  ? 'text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Icon className="w-6 h-6" />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}