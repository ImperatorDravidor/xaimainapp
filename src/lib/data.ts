import { Team } from "@/components/dashboard/TeamCard";
import { create } from 'zustand';
import { persist, PersistOptions } from 'zustand/middleware';

export interface Template {
  id: string;
  name: string;
  description: string;
}

// Industry templates with better descriptions
export const INDUSTRY_TEMPLATES: Template[] = [
  { 
    id: 'digital-agency', 
    name: 'Digital Agency', 
    description: 'Marketing, SEO, and client management automation'
  },
  { 
    id: 'e-commerce', 
    name: 'E-Commerce', 
    description: 'Product listings, inventory, and customer support'
  },
  { 
    id: 'professional-services', 
    name: 'Professional Services', 
    description: 'Client onboarding, document processing, and project management'
  },
  { 
    id: 'healthcare', 
    name: 'Healthcare', 
    description: 'Patient scheduling, records management, and billing'
  },
  { 
    id: 'finance', 
    name: 'Finance', 
    description: 'Investment analysis, reporting, and compliance'
  },
  { 
    id: 'education', 
    name: 'Education', 
    description: 'Course management, grading, and student engagement'
  },
];

// Initial team for demonstration
export const INITIAL_TEAMS: Team[] = [
  {
    id: "team-1",
    name: "Digital Marketing Team",
    description: "Handles all digital marketing operations including SEO, social media, and ad campaigns.",
    template: "Digital Agency",
    status: "active",
    members: 5,
    metrics: {
      costSavings: "$45,000",
      errorRate: "1.2%",
      tasksCompleted: 254
    }
  }
];

// Recent activities for teams
export const RECENT_ACTIVITIES = [
  { id: 1, type: "task", status: "completed", description: "Optimized meta descriptions for 15 product pages", timestamp: "2 hours ago" },
  { id: 2, type: "alert", status: "warning", description: "Detected duplicate content on blog posts", timestamp: "5 hours ago" },
  { id: 3, type: "task", status: "completed", description: "Generated weekly performance report", timestamp: "1 day ago" },
  { id: 4, type: "task", status: "failed", description: "Social media post scheduling failed", timestamp: "1 day ago" },
  { id: 5, type: "task", status: "completed", description: "Analyzed competitor keyword strategy", timestamp: "2 days ago" }
];

// Job roles for AI workers
export const AI_WORKER_ROLES = [
  "Content Writer", 
  "SEO Specialist", 
  "Analytics Expert", 
  "Social Media Manager", 
  "Email Marketer",
  "Customer Support Agent",
  "Data Analyst",
  "Project Manager"
];

// Zustand store for teams data with persistence
interface TeamsState {
  teams: Team[];
  addTeam: (team: Team) => void;
  updateTeam: (updatedTeam: Team) => void;
  getTeamById: (id: string) => Team | undefined;
}

type TeamsStorePersist = {
  name: string;
  version?: number;
};

export const useTeamsStore = create<TeamsState>()(
  persist(
    (set, get) => ({
      teams: INITIAL_TEAMS,
      
      addTeam: (team: Team) => 
        set((state: TeamsState) => ({ 
          teams: [...state.teams, team] 
        })),
      
      updateTeam: (updatedTeam: Team) =>
        set((state: TeamsState) => ({
          teams: state.teams.map((team: Team) => 
            team.id === updatedTeam.id ? updatedTeam : team
          )
        })),
      
      getTeamById: (id: string) => {
        const { teams } = get();
        return teams.find(team => team.id === id);
      }
    }),
    {
      name: 'xander-teams-storage',
    } as PersistOptions<TeamsState, TeamsState>
  )
); 