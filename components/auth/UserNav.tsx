"use client";

import Link from "next/link";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  User,
  LogOut, 
  Shield,
  HelpCircle,
  Loader2,
  Settings,
  UserCog,
  Bell,
  CreditCard,
} from "lucide-react";
import { useClerk, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function UserNav() {
  const { signOut } = useClerk();
  const { user, isLoaded, isSignedIn } = useUser();
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleSignOut = async () => {
    try {
      setIsLoggingOut(true);
      await signOut();
      router.push("/authentication/login");
    } catch (error) {
      console.error("Error signing out:", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  // Show loading state while user data is loading
  if (!isLoaded) {
    return (
      <div className="flex items-center gap-1.5 p-1.5">
        <Avatar className="h-8 w-8 shrink-0 bg-neutral-800 border border-neutral-700/40">
          <AvatarFallback className="text-xs font-medium">
            <Loader2 className="h-4 w-4 animate-spin" />
          </AvatarFallback>
        </Avatar>
      </div>
    );
  }

  // Handle not signed in state
  if (!isSignedIn) {
    return (
      <div className="flex items-center gap-2">
        <Link href="/authentication/login" className="text-xs text-blue-400 hover:text-blue-300">
          Sign In
        </Link>
      </div>
    );
  }

  // Extract first and last initials for the avatar fallback
  const initials = user.firstName && user.lastName 
    ? `${user.firstName[0]}${user.lastName[0]}` 
    : user.firstName?.[0] || "U";

  // Derive role and role color based on email domain
  const email = user.primaryEmailAddress?.emailAddress || "";
  const roleBadge = email.includes("admin") 
    ? { role: "Admin", color: "bg-red-900/30 text-red-400 border-red-500/30" } 
    : email.includes("manager") 
      ? { role: "Manager", color: "bg-amber-900/30 text-amber-400 border-amber-500/30" }
      : { role: "User", color: "bg-blue-900/30 text-blue-400 border-blue-500/30" };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center gap-2 cursor-pointer hover:bg-neutral-800/40 p-1.5 rounded-md transition-ios">
          <Avatar className="h-8 w-8 shrink-0 bg-gradient-to-br from-blue-600 to-purple-700 border border-neutral-700/40 shadow-ios">
            {user.imageUrl ? (
              <AvatarImage src={user.imageUrl} alt={user.fullName || "User"} />
            ) : (
              <AvatarFallback className="text-xs font-medium">{initials}</AvatarFallback>
            )}
          </Avatar>
          <div className="flex-1 overflow-hidden hidden sm:block">
            <div className="text-xs font-medium text-white truncate max-w-[120px]">{user.fullName || user.username}</div>
            <div className="text-[9px] text-neutral-400 flex items-center">
              <Badge variant="outline" className={`text-[8px] h-3.5 ${roleBadge.color} px-1.5 truncate border rounded-sm py-0`}>
                {roleBadge.role}
              </Badge>
            </div>
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64 bg-black/95 backdrop-blur-md border-neutral-800/40 text-white p-0 rounded-lg shadow-[0_0_15px_rgba(0,0,0,0.5)]">
        <div className="p-4 border-b border-neutral-800/40">
          <div className="flex items-start gap-3">
            <Avatar className="h-12 w-12 shrink-0 bg-gradient-to-br from-blue-600 to-purple-700 border border-neutral-700/40 shadow-ios">
              {user.imageUrl ? (
                <AvatarImage src={user.imageUrl} alt={user.fullName || "User"} />
              ) : (
                <AvatarFallback className="text-sm font-medium">{initials}</AvatarFallback>
              )}
            </Avatar>
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium text-white">{user.fullName || user.username}</p>
              <p className="text-[10px] text-neutral-400 truncate">{user.primaryEmailAddress?.emailAddress}</p>
              <Badge variant="outline" className={`text-[9px] h-4 ${roleBadge.color} px-2 truncate inline-flex w-fit items-center border py-0 mt-1`}>
                {roleBadge.role} Account
              </Badge>
            </div>
          </div>
        </div>
        
        {/* Account menu items */}
        <div className="py-2 px-1">
          <div className="px-2 py-1">
            <p className="text-[10px] text-neutral-500 font-medium uppercase tracking-wider ml-2">Account</p>
          </div>
          
          <Link href="/administration/profile">
            <DropdownMenuItem className="flex gap-2 cursor-pointer focus:bg-blue-900/20 focus:text-blue-400 text-xs px-3 py-2 rounded-md my-0.5">
              <div className="h-6 w-6 rounded-md flex items-center justify-center bg-neutral-900/80">
                <User size={13} className="text-neutral-400" />
              </div>
              <div className="flex flex-col">
                <span>Profile Settings</span>
                <span className="text-[9px] text-neutral-500">Update your personal information</span>
              </div>
            </DropdownMenuItem>
          </Link>
          
          <Link href="/administration/security">
            <DropdownMenuItem className="flex gap-2 cursor-pointer focus:bg-blue-900/20 focus:text-blue-400 text-xs px-3 py-2 rounded-md my-0.5">
              <div className="h-6 w-6 rounded-md flex items-center justify-center bg-neutral-900/80">
                <Shield size={13} className="text-neutral-400" />
              </div>
              <div className="flex flex-col">
                <span>Security</span>
                <span className="text-[9px] text-neutral-500">Manage passwords and 2FA</span>
              </div>
            </DropdownMenuItem>
          </Link>
          
          <Link href="/administration/billing">
            <DropdownMenuItem className="flex gap-2 cursor-pointer focus:bg-blue-900/20 focus:text-blue-400 text-xs px-3 py-2 rounded-md my-0.5">
              <div className="h-6 w-6 rounded-md flex items-center justify-center bg-neutral-900/80">
                <CreditCard size={13} className="text-neutral-400" />
              </div>
              <div className="flex flex-col">
                <span>Billing</span>
                <span className="text-[9px] text-neutral-500">Manage subscription and payments</span>
              </div>
            </DropdownMenuItem>
          </Link>
          
          <Link href="/administration/settings">
            <DropdownMenuItem className="flex gap-2 cursor-pointer focus:bg-blue-900/20 focus:text-blue-400 text-xs px-3 py-2 rounded-md my-0.5">
              <div className="h-6 w-6 rounded-md flex items-center justify-center bg-neutral-900/80">
                <Settings size={13} className="text-neutral-400" />
              </div>
              <div className="flex flex-col">
                <span>Preferences</span>
                <span className="text-[9px] text-neutral-500">Configure app settings</span>
              </div>
            </DropdownMenuItem>
          </Link>
        </div>
        
        <DropdownMenuSeparator className="bg-neutral-800/30" />
        
        <div className="p-2">
          <DropdownMenuItem 
            className="flex gap-2 text-red-400 cursor-pointer focus:bg-red-900/20 focus:text-red-400 text-xs px-3 py-2 rounded-md w-full justify-center"
            onClick={handleSignOut}
            disabled={isLoggingOut}
          >
            {isLoggingOut ? (
              <>
                <Loader2 size={14} className="animate-spin" /> Signing out...
              </>
            ) : (
              <>
                <LogOut size={14} /> Log out
              </>
            )}
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
} 