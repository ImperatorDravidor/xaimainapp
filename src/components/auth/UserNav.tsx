'use client'

import { useEffect, useState } from 'react'
import { User, ChevronDown, LogOut, Settings, Shield, CreditCard, Users } from 'lucide-react'
import Link from 'next/link'
import { createClient } from '@/utils/supabase/client'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar } from '@/components/ui/avatar'
import { useRouter } from 'next/navigation'

export function UserNav() {
  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      setIsLoading(false)
    }

    fetchUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null)
    })

    return () => subscription.unsubscribe()
  }, [supabase])

  const handleSignOut = async () => {
    await fetch('/auth/signout', { method: 'POST' })
    router.push('/authentication/login')
  }

  if (isLoading) {
    return (
      <div className="flex items-center space-x-3 p-2 rounded-lg bg-black/20 backdrop-blur-sm border border-white/10">
        <div className="w-8 h-8 rounded-full bg-gray-600 animate-pulse" />
        <div className="hidden lg:flex flex-col">
          <div className="h-3 w-20 bg-gray-600 rounded animate-pulse" />
          <div className="h-2 w-16 bg-gray-600 rounded mt-1 animate-pulse" />
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <Link href="/authentication/login">
        <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
          Sign In
        </button>
      </Link>
    )
  }

  const userEmail = user.email || 'User'
  const userName = user.user_metadata?.full_name || user.email?.split('@')[0] || 'User'
  const userInitial = userName.charAt(0).toUpperCase()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center space-x-3 p-2 rounded-lg hover:bg-black/20 transition-all duration-200 backdrop-blur-sm border border-white/10">
          <Avatar className="w-8 h-8 bg-gradient-to-br from-blue-500 to-violet-600 text-white flex items-center justify-center">
            <span className="text-sm font-semibold">{userInitial}</span>
          </Avatar>
          <div className="hidden lg:flex flex-col items-start">
            <span className="text-sm font-medium text-white">{userName}</span>
            <span className="text-xs text-white/60">{userEmail}</span>
          </div>
          <ChevronDown className="w-4 h-4 text-white/60 hidden lg:block" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-black/90 backdrop-blur-xl border border-white/10 text-white" align="end">
        <DropdownMenuLabel className="text-white/60">My Account</DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-white/10" />
        
        <Link href="/administration/profile">
          <DropdownMenuItem className="focus:bg-white/10 focus:text-white cursor-pointer">
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </DropdownMenuItem>
        </Link>
        
        <Link href="/administration/settings">
          <DropdownMenuItem className="focus:bg-white/10 focus:text-white cursor-pointer">
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </DropdownMenuItem>
        </Link>
        
        <Link href="/administration/security">
          <DropdownMenuItem className="focus:bg-white/10 focus:text-white cursor-pointer">
            <Shield className="mr-2 h-4 w-4" />
            <span>Security</span>
          </DropdownMenuItem>
        </Link>
        
        <Link href="/administration/billing">
          <DropdownMenuItem className="focus:bg-white/10 focus:text-white cursor-pointer">
            <CreditCard className="mr-2 h-4 w-4" />
            <span>Billing</span>
          </DropdownMenuItem>
        </Link>
        
        <Link href="/administration/user-management">
          <DropdownMenuItem className="focus:bg-white/10 focus:text-white cursor-pointer">
            <Users className="mr-2 h-4 w-4" />
            <span>User Management</span>
          </DropdownMenuItem>
        </Link>
        
        <DropdownMenuSeparator className="bg-white/10" />
        
        <DropdownMenuItem 
          className="focus:bg-white/10 focus:text-white cursor-pointer text-red-400 hover:text-red-300"
          onClick={handleSignOut}
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Sign out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}