"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { BeamsBackground } from "@/components/ui/beams-background";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Bell, 
  Search, 
  Settings, 
  LogOut, 
  User, 
  HelpCircle, 
  Shield,
  MessageSquare,
  LayoutDashboard,
  BarChart,
  Users,
  ServerCog,
  FolderKanban,
  Menu,
  X,
  RocketIcon,
  Home,
  ChevronRight,
  Workflow,
  UserSquare,
  Building,
  UserPlus,
  Check,
  FileBarChart2,
  MessageCircleQuestion,
  BookOpen,
  BookMarked,
  UsersRound,
  LifeBuoy,
  MoreHorizontal,
  Activity,
  Sun,
  Moon,
  FileText,
  Sparkles
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChatWidget } from "@/components/dashboard/chat-widget";
import { ScrollArea } from "@/components/ui/scroll-area";
import React, { PropsWithChildren } from "react";
import { ExpandableTabs } from "@/components/ui/expandable-tabs";
import { UserNav } from "@/components/auth/UserNav";
import { SidebarNewsComponent } from "@/components/ui/sidebar-news-demo";
import { useClerk, useUser } from "@clerk/nextjs";
import { 
  RiCheckboxCircleLine, 
  RiErrorWarningLine, 
  RiAlertLine, 
  RiWifiLine, 
  RiShieldCheckLine,
  RiShieldCrossLine,
  RiShutDownLine,
  RiTimeLine
} from '@remixicon/react';

type DashboardLayoutProps = {
  children: React.ReactNode;
};

// Glass effect component for the translucent header - improved with subtle gradient
const Glass: React.FC<PropsWithChildren<{ className?: string }>> = ({ className = "", children }) => (
  <div className={`relative overflow-hidden w-full h-full ${className}`}>
    <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden border-b border-border/40">
      <div className="absolute inset-0 backdrop-blur-md bg-gradient-to-r from-background/90 to-background/80" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/5 to-background/20" />
    </div>
    <svg className="hidden">
      <defs>
        <filter id="fractal-noise-glass">
          <feTurbulence type="fractalNoise" baseFrequency="0.12 0.12" numOctaves="1" result="warp" />
          <feDisplacementMap xChannelSelector="R" yChannelSelector="G" scale="30" in="SourceGraphic" in2="warp" />
        </filter>
      </defs>
    </svg>
    <div className="relative z-20">{children}</div>
  </div>
);

// Define new SidebarFooter component with time display
const SidebarFooter = () => {
  const appVersion = "v2.5.3"; // Example version
  
  return (
    <div className="py-2.5 px-4 bg-gradient-to-t from-black/70 to-black/30 border-t border-neutral-800/30">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-[9px] text-neutral-500 font-medium tracking-wide">{appVersion}</span>
          <div className="flex items-center gap-1.5 bg-neutral-900/80 py-0.5 px-1.5 rounded-full border border-neutral-800/40">
            <div className="w-1 h-1 rounded-full bg-emerald-500"></div>
            <span className="text-[8px] text-neutral-400 uppercase tracking-wide">Online</span>
          </div>
        </div>
        <span className="text-[9px] text-neutral-500">
          {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
        </span>
      </div>
    </div>
  );
};

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [supportOpen, setSupportOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const { user, isLoaded, isSignedIn } = useUser();
  const { signOut } = useClerk();
  const router = useRouter();
  const [currentTime, setCurrentTime] = useState(() => {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  });
  const pathname = usePathname();

  // Get current date in "Monday, May 3, 2025" format
  const currentDate = useMemo(() => {
    const now = new Date();
    return now.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }, []);

  // Live time update
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Close mobile sidebar on navigation or window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024) {
        setMobileSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close mobile sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const sidebar = document.getElementById("mobile-sidebar");
      if (sidebar && !sidebar.contains(event.target as Node) && isMobileSidebarOpen) {
        setMobileSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobileSidebarOpen]);

  const navItems = [
    {
      section: "Platform",
      items: [
        {
          name: "Launchpad",
          icon: <RocketIcon size={18} />,
          href: "/platform/launch-pad",
          active: pathname.includes("/platform/launch-pad")
        },
        {
          name: "Dashboard",
          icon: <LayoutDashboard size={18} />,
          href: "/platform/dashboard",
          active: pathname.includes("/platform/dashboard")
        },
        {
          name: "Overview",
          icon: <BarChart size={18} />,
          href: "/platform/overview",
          active: pathname.includes("/platform/overview")
        }
      ]
    },
    {
      section: "Company",
      items: [
        {
          name: "Teams",
          icon: <Users size={18} />,
          href: "/company/teams",
          active: pathname.includes("/company/teams")
        },
        {
          name: "Workflows",
          icon: <Workflow size={18} />,
          href: "/company/workflows",
          active: pathname.includes("/company/workflows")
        },
        {
          name: "Members",
          icon: <UserSquare size={18} />,
          href: "/company/members",
          active: pathname.includes("/company/members")
        }
      ]
    },
    {
      section: "Administration",
      items: [
        {
          name: "Security",
          icon: <Shield size={18} />,
          href: "/administration/security",
          active: pathname.includes("/administration/security")
        },
        {
          name: "User Management",
          icon: <Users size={18} />,
          href: "/administration/user-management",
          active: pathname.includes("/administration/user-management")
        }
      ]
    },
    {
      section: "Intelligence",
      items: [
        {
          name: "Data Center",
          icon: <ServerCog size={18} />,
          href: "/intelligence/data-center",
          active: pathname.includes("/intelligence/data-center")
        },
        {
          name: "Feedback & Training",
          icon: <MessageCircleQuestion size={18} />,
          href: "/intelligence/feedback-training",
          active: pathname.includes("/intelligence/feedback-training")
        }
      ]
    },
    {
      section: "Tools",
      items: [
        {
          name: "Xander Workspace",
          icon: <Sparkles size={18} />,
          href: "/tools/workspace",
          active: pathname.includes("/tools/workspace")
        },
        {
          name: "Talk to Xander",
          icon: <MessageSquare size={18} />,
          href: "/tools/talk",
          active: pathname.includes("/tools/talk")
        },
        {
          name: "Projects",
          icon: <FolderKanban size={18} />,
          href: "/tools/projects",
          active: pathname.includes("/tools/projects")
        }
      ]
    }
  ];

  const notifications = [
    { 
      id: 1, 
      title: "AI Team Report Ready", 
      message: "Monthly performance report for Customer Service Team is ready for review.", 
      time: "12 min ago", 
      unread: true 
    },
    { 
      id: 2, 
      title: "New Lead Generated", 
      message: "Sales Team has identified a new high-priority lead.", 
      time: "43 min ago", 
      unread: true 
    },
    { 
      id: 3, 
      title: "System Update", 
      message: "XanderAI platform has been updated to version 2.4.0", 
      time: "2 hours ago", 
      unread: false 
    },
    { 
      id: 4, 
      title: "Data Processing Complete", 
      message: "Your requested data analysis has finished processing.", 
      time: "Yesterday", 
      unread: false 
    }
  ];

  // Mock companies/workforces data for the company switcher
  const companies = [
    { id: 1, name: "Acme Corporation", isActive: true },
    { id: 2, name: "TechInnovate Inc", isActive: false },
    { id: 3, name: "Global Solutions Ltd", isActive: false },
    { id: 4, name: "Quantum Enterprises", isActive: false }
  ];

  const [activeCompany, setActiveCompany] = useState(companies[0]);

  // Extract current section and item for breadcrumbs
  const currentSection = useMemo(() => {
    const section = navItems.find(section => 
      section.items.some(item => item.href === pathname)
    );
    const item = section?.items.find(item => item.href === pathname);
    return { section, item };
  }, [pathname, navItems]);

  // Mobile sidebar overlay
  const MobileSidebarOverlay = () => (
    <div
      className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-200 ${
        isMobileSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      onClick={() => setMobileSidebarOpen(false)}
    />
  );

  // Add client company data with proper logo colors and validation states
  const clientCompanies = [
    { id: 1, name: "Acme Enterprise", logo: "/xai.svg", isActive: true, status: "Active", domain: "acme.com", subscription: "Enterprise", employees: 1250, plan: "Pro" },
    { id: 2, name: "TechInnovate Solutions", logo: null, isActive: false, status: "Active", domain: "techinnovate.io", subscription: "Business", employees: 420, plan: "Standard" },
    { id: 3, name: "GlobalVision Corp", logo: null, isActive: false, status: "Pending", domain: "globalvision.co", subscription: "Team", employees: 85, plan: "Basic" },
    { id: 4, name: "Quantum Industries", logo: null, isActive: false, status: "Trial", domain: "quantumind.com", subscription: "Trial", employees: 32, plan: "Free Trial" }
  ];

  const [activeClientCompany, setActiveClientCompany] = useState(clientCompanies[0]);

  // Sidebar content component to avoid duplication - upgraded with better logo presentation and spacing
  const SidebarContent = ({ mobile = false }: { mobile?: boolean }) => (
    <>
      {/* Logo with client branding - now using full SVG logo */}
      <div className="h-[62px] flex items-center justify-between border-b border-neutral-800/30 bg-gradient-to-r from-black/90 to-black/80">
        <div className="flex items-center h-full px-5">
          <div className="flex items-center gap-2">
            <div className="relative h-8 w-32">
              <Image
                src="/xanderai.svg"
                alt="XanderAI Logo"
                fill
                className="object-contain"
              />
            </div>
            <div className="inline-flex items-center px-1.5 py-0.5 rounded-sm bg-blue-950/30 border border-blue-400/20 shadow-[0_0_8px_rgba(59,130,246,0.15)]">
              <span className="text-[9px] font-semibold tracking-wider text-blue-300">BETA</span>
            </div>
          </div>
        </div>
        {mobile && (
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 mr-4 text-neutral-400 hover:text-white hover:bg-white/5"
            onClick={() => setMobileSidebarOpen(false)}
          >
            <X size={16} />
          </Button>
        )}
      </div>

      {/* Client Company Badge - Simplified */}
      <div className="px-4 py-2.5 border-b border-neutral-800/20">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 flex items-center justify-center bg-blue-950/30 border border-blue-800/20 rounded-md">
            <Building size={12} className="text-blue-400" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1">
              <span className="font-medium text-xs text-white truncate">{activeClientCompany.name}</span>
              <Badge variant="outline" className="h-4 text-[8px] px-1 border-blue-500/20 bg-blue-500/10 text-blue-300">
                {activeClientCompany.plan}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation - streamlined for clarity */}
      <ScrollArea className="flex-1 py-2 px-3">
        <motion.div 
          className="space-y-4"
          initial={false}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          {navItems.map((section, index) => (
            <motion.div 
              key={index} 
              className="space-y-1"
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-[9px] font-medium text-neutral-500 uppercase tracking-wider px-3 mb-1">
                {section.section}
              </h3>
              <ul className="space-y-0.5">
                {section.items.map((item, itemIndex) => (
                  <motion.li 
                    key={itemIndex}
                    initial={false}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Link 
                      href={item.href}
                      className={`flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-md transition-ios
                        ${item.active 
                          ? "text-blue-300 bg-blue-600/10 border border-blue-500/30 shadow-[0_0_10px_rgba(59,130,246,0.15)]" 
                          : "text-neutral-400 hover:text-white hover:bg-white/5 border border-transparent"
                        }
                      `}
                    >
                      <span className={`transition-colors duration-200 ${item.active ? 'text-blue-400' : 'text-neutral-500'} flex items-center`}>
                        {item.icon}
                      </span>
                      <span className="truncate">{item.name}</span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </ScrollArea>

      {/* News Component */}
      <div className="mt-auto">
        {/* News component disabled due to issues */}
        {false && <SidebarNewsComponent />}
        
        {/* Spacer - Makes sidebar feel more balanced */}
        <div className="h-4"></div>
      </div>

      {/* Quick Utility Menu */}
      <div className="py-2 px-4 bg-black/20">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[9px] uppercase tracking-wider text-neutral-500 font-medium">Quick Access</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Link 
              href="#" 
              className="w-7 h-7 rounded-md flex items-center justify-center text-neutral-500 hover:text-blue-400 bg-black/30 hover:bg-black/50 border border-neutral-800/40 transition-colors"
              title="Help & Documentation"
            >
              <HelpCircle className="h-3.5 w-3.5" />
            </Link>
            <Link 
              href="#" 
              className="w-7 h-7 rounded-md flex items-center justify-center text-neutral-500 hover:text-blue-400 bg-black/30 hover:bg-black/50 border border-neutral-800/40 transition-colors"
              title="Documentation"
            >
              <FileText className="h-3.5 w-3.5" />
            </Link>
            <Link 
              href="#" 
              className="w-7 h-7 rounded-md flex items-center justify-center text-neutral-500 hover:text-blue-400 bg-black/30 hover:bg-black/50 border border-neutral-800/40 transition-colors"
              title="Notifications"
            >
              <Bell className="h-3.5 w-3.5" />
            </Link>
            <Link 
              href="#" 
              className="w-7 h-7 rounded-md flex items-center justify-center text-neutral-500 hover:text-blue-400 bg-black/30 hover:bg-black/50 border border-neutral-800/40 transition-colors"
              title="Settings"
            >
              <Settings className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* New Footer Component */}
      <SidebarFooter />
    </>
  );

  // Replace hardcoded employee name with actual user data
  const employeeName = isSignedIn ? (user?.fullName || user?.username || "User") : "Guest User";
  const [companyStatus, setCompanyStatus] = useState("Open");
  const instanceId = "J3ZEDG"; // Fixed ID
  const clientCompanyName = "Acme Corporation"; // Mock client company name

  useEffect(() => {
    const updateStatus = () => {
      const now = new Date();
      const hour = now.getHours();
      setCompanyStatus(hour >= 9 && hour < 17 ? "Open" : "Closed");
    };
    updateStatus();
    const interval = setInterval(updateStatus, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push("/authentication/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  // Header Action Buttons - Enhanced with better spacing and information
  const HeaderActions = () => (
    <div className="flex items-center gap-3">
      {/* Remove the platform info badge with instance ID */}
      
      <TooltipProvider>
        {/* Remove theme toggle button */}

        {/* Notification Dropdown - Enhanced with better styling */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-9 w-9 text-neutral-400 hover:text-white hover:bg-neutral-800/50 rounded-md relative"
            >
              <Bell size={16} />
              <div className="absolute top-1.5 right-2 w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80 bg-black/95 backdrop-blur-md border-neutral-800/40 text-white p-0 rounded-lg shadow-[0_0_15px_rgba(0,0,0,0.5)]">
            <div className="flex items-center justify-between p-3 border-b border-neutral-800/40">
              <span className="font-medium text-sm">Notifications</span>
              <Badge className="h-5 bg-blue-500/20 text-blue-300 border-blue-500/30 text-[9px]">
                {notifications.filter(n => n.unread).length} new
              </Badge>
            </div>
            <ScrollArea className="h-[300px]">
              <div className="py-1">
                {notifications.map((notification) => (
                  <div 
                    key={notification.id}
                    className={`px-3 py-2 hover:bg-neutral-800/20 cursor-pointer border-l-2 ${notification.unread ? "border-blue-500" : "border-transparent"}`}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <span className={`text-xs font-medium ${notification.unread ? "text-white" : "text-neutral-300"}`}>
                        {notification.title}
                      </span>
                      <span className="text-[9px] text-neutral-500">{notification.time}</span>
                    </div>
                    <p className="text-[10px] text-neutral-400">{notification.message}</p>
                  </div>
                ))}
              </div>
            </ScrollArea>
            <div className="p-2 border-t border-neutral-800/40 flex justify-center">
              <Button variant="ghost" size="sm" className="w-full text-xs h-7 text-blue-400 hover:text-blue-300 hover:bg-blue-900/20">
                View all notifications
              </Button>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Help & Support Button */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              size="sm"
              className="h-9 w-9 text-neutral-400 hover:text-white hover:bg-neutral-800/50 rounded-md"
            >
              <HelpCircle size={16} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 bg-black/95 backdrop-blur-md border-neutral-800/40 text-white p-0 rounded-lg shadow-[0_0_15px_rgba(0,0,0,0.5)]">
            <div className="p-3 border-b border-neutral-800/40">
              <span className="font-medium text-sm">Help & Support</span>
            </div>
            <div className="py-1">
              <DropdownMenuItem className="px-3 py-2 hover:bg-neutral-800/20 cursor-pointer flex items-center gap-2 text-xs">
                <BookOpen size={14} className="text-neutral-400" />
                <span>Documentation</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="px-3 py-2 hover:bg-neutral-800/20 cursor-pointer flex items-center gap-2 text-xs">
                <BookMarked size={14} className="text-neutral-400" />
                <span>Tutorials</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="px-3 py-2 hover:bg-neutral-800/20 cursor-pointer flex items-center gap-2 text-xs">
                <UsersRound size={14} className="text-neutral-400" />
                <span>Community</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="px-3 py-2 hover:bg-neutral-800/20 cursor-pointer flex items-center gap-2 text-xs">
                <LifeBuoy size={14} className="text-neutral-400" />
                <span>Contact Support</span>
              </DropdownMenuItem>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </TooltipProvider>

      {/* Client Selector - New component to switch between clients */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-9 px-3 text-white hover:bg-neutral-800/50 rounded-md text-xs border border-neutral-800/30 hidden sm:flex"
          >
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-md bg-blue-950/50 border border-blue-500/20 flex items-center justify-center">
                <Building size={12} className="text-blue-400" />
              </div>
              <span className="truncate max-w-[100px]">{activeClientCompany.name}</span>
              <MoreHorizontal size={12} className="text-neutral-400" />
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-60 bg-black/95 backdrop-blur-md border-neutral-800/40 text-white p-0 rounded-lg shadow-[0_0_15px_rgba(0,0,0,0.5)]">
          <div className="p-3 border-b border-neutral-800/40">
            <span className="font-medium text-sm">Client Companies</span>
          </div>
          <ScrollArea className="max-h-[240px]">
            <div className="py-1">
              {clientCompanies.map((company) => (
                <DropdownMenuItem 
                  key={company.id} 
                  className={`px-3 py-2 flex justify-between items-center cursor-pointer rounded-md ${company.isActive ? "bg-blue-500/10 hover:bg-blue-500/15" : "hover:bg-neutral-800/20"}`}
                  onClick={() => setActiveClientCompany(company)}
                >
                  <div className="flex items-center gap-2">
                    <div className={`w-6 h-6 rounded-md flex items-center justify-center ${company.isActive ? "bg-blue-950/50 border border-blue-500/30" : "bg-neutral-900 border border-neutral-800/40"}`}>
                      <Building size={12} className={company.isActive ? "text-blue-400" : "text-neutral-500"} />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-medium">{company.name}</span>
                      <div className="flex items-center gap-1">
                        <span className="text-[9px] text-neutral-400">{company.domain}</span>
                        <span className="text-[9px] text-neutral-500">•</span>
                        <Badge variant="outline" className="h-3.5 text-[8px] px-1 border-blue-500/20 bg-blue-500/10 text-blue-300 py-0">
                          {company.subscription}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  {company.isActive && <Check size={12} className="text-blue-400" />}
                </DropdownMenuItem>
              ))}
            </div>
          </ScrollArea>
          <div className="p-2 border-t border-neutral-800/40">
            <Button variant="outline" size="sm" className="w-full text-xs h-7 text-blue-400 border-blue-500/30 hover:bg-blue-950/30">
              <Activity size={12} className="mr-1" /> Client Overview
            </Button>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* User Profile */}
      <UserNav />
    </div>
  );

  return (
    <BeamsBackground intensity="subtle" className="h-screen overflow-hidden">
      <TooltipProvider>
        <MobileSidebarOverlay />
        
        {/* Mobile sidebar - fixed position */}
        <div 
          id="mobile-sidebar"
          className={`fixed inset-y-0 left-0 w-60 bg-gradient-to-b from-black/95 to-black/90 backdrop-blur-md border-r border-neutral-800/40 z-50 lg:hidden transition-transform duration-300 shadow-[5px_0_25px_rgba(0,0,0,0.3)] ${
            isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } flex flex-col`}
        >
          <SidebarContent mobile />
        </div>

        <div className="flex h-screen overflow-hidden">
          {/* Desktop Sidebar - fixed width */}
          <motion.div 
            key="sidebar"
            className="w-60 bg-gradient-to-b from-black/90 to-black/80 backdrop-blur-md border-r border-neutral-800/40 z-20 hidden lg:flex flex-col shadow-[5px_0_15px_rgba(0,0,0,0.2)]"
            initial={false}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <SidebarContent />
          </motion.div>
          
          {/* Main Content */}
          <motion.div 
            key="main-content"
            className="flex-1 flex flex-col overflow-hidden"
            initial={false}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            {/* Header - Enhanced with Glass component */}
            <motion.header 
              key="header"
              className="sticky top-0 z-50"
              initial={false}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              <Glass>
                <header className="h-[68px] flex items-center border-b border-neutral-800/30 px-5">
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-4">
                      {/* Mobile menu button */}
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setMobileSidebarOpen(true)}
                        className="lg:hidden w-9 h-9 p-0 text-neutral-400 hover:text-white rounded-md border-neutral-700/30"
                      >
                        <Menu size={18} />
                      </Button>
                      
                      {/* Client and User info */}
                      <div className="flex items-center">
                        <div className="flex flex-col">
                          <div className="flex items-center gap-1.5">
                            <span className="font-medium text-sm tracking-tight text-white">{employeeName}</span>
                            {/* Remove instance ID badge */}
                          </div>
                          <span className="text-[10px] text-neutral-400">{activeClientCompany.name} • {activeClientCompany.subscription} Plan</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Center: Search bar with improved styling */}
                    <div className="flex-1 flex items-center justify-center max-w-xl mx-8">
                      <div className="relative w-full group">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-blue-400/70 group-hover:text-blue-300 transition-colors duration-200" />
                        <Input 
                          type="text"
                          placeholder="Search across platform..." 
                          className="pl-10 pr-16 h-10 bg-gradient-to-r from-black/70 to-black/50 border-[0.5px] border-neutral-700/40 focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 rounded-lg text-sm shadow-inner transition-all duration-200 hover:border-neutral-600/50 focus:bg-black/70"
                          onFocus={() => setSearchFocused(true)}
                          onBlur={() => setSearchFocused(false)}
                        />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center text-xs text-neutral-500 bg-neutral-900/80 px-2 py-0.5 rounded-md border-[0.5px] border-neutral-700/40 shadow-sm select-none pointer-events-none">
                          <kbd className="font-mono text-[10px] font-medium">⌘</kbd>
                          <span className="mx-0.5">/</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Right side actions */}
                    <HeaderActions />
                  </div>
                </header>
              </Glass>
            </motion.header>
            
            {/* Breadcrumb and main wrapper */}
            <div className="flex-1 flex flex-col overflow-hidden">
              {/* Breadcrumb - Enhanced with better styling */}
              {currentSection.item && (
                <motion.div 
                  key="breadcrumb"
                  className="py-3 px-5 border-b border-neutral-800/30 bg-gradient-to-r from-neutral-900/50 to-transparent flex items-center text-xs"
                  initial={false}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Link href="/" className="text-neutral-500 hover:text-blue-300 transition-colors flex items-center">
                    <Home size={12} className="mr-1" />
                    <span>Home</span>
                  </Link>
                  <ChevronRight size={10} className="mx-2 text-neutral-600" />
                  {currentSection.section && (
                    <>
                      <span className="text-neutral-500">{currentSection.section.section}</span>
                      <ChevronRight size={10} className="mx-2 text-neutral-600" />
                    </>
                  )}
                  <span className="text-neutral-300 font-medium">{currentSection.item.name}</span>
                  
                  {/* Add client badge to breadcrumb */}
                  <div className="ml-auto flex items-center">
                    <Badge variant="outline" className="flex items-center gap-1.5 h-6 border-neutral-800/40 bg-neutral-900/40 text-[10px]">
                      <Building size={10} className="text-blue-400" />
                      <span className="text-neutral-300">{activeClientCompany.name}</span>
                      <div className={`w-1.5 h-1.5 rounded-full ${activeClientCompany.status === "Active" ? "bg-green-500" : activeClientCompany.status === "Trial" ? "bg-amber-500" : "bg-blue-500"}`}></div>
                    </Badge>
                  </div>
                </motion.div>
              )}
              
              {/* Main content area */}
              <main className="flex-1 overflow-auto">
                {children}
              </main>
            </div>
          </motion.div>
        </div>
      </TooltipProvider>
    </BeamsBackground>
  );
} 