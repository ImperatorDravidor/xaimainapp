"use client";

import { News, type NewsArticle } from "@/components/ui/sidebar-news";

const DEMO_ARTICLES: NewsArticle[] = [
  {
    href: "https://xanderai.com/blog/new-features",
    title: "New AI Features Released",
    summary: "Enhanced ML algorithms and improved interface",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=800",
  },
  {
    href: "https://xanderai.com/blog/team-analytics",
    title: "Team Analytics Dashboard",
    summary: "Real-time performance tracking and insights",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800",
  },
  {
    href: "https://xanderai.com/blog/security-update",
    title: "Security Updates",
    summary: "Enhanced security and SOC 2 compliance",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=800",
  },
];

export function SidebarNewsComponent() {
  return <News articles={DEMO_ARTICLES} />;
} 