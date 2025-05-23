import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Team, User, Task } from './api';

// Define the global state shape
interface GlobalState {
  // Current user
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  
  // Teams
  teams: Team[];
  setTeams: (teams: Team[]) => void;
  addTeam: (team: Team) => void;
  updateTeam: (id: string, teamData: Partial<Team>) => void;
  removeTeam: (id: string) => void;
  
  // Tasks
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
  addTask: (task: Task) => void;
  updateTask: (id: string, taskData: Partial<Task>) => void;
  removeTask: (id: string) => void;
  
  // UI state
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  sidebarCollapsed: boolean;
  toggleSidebar: () => void;
  
  // Application state
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  globalError: string | null;
  setGlobalError: (error: string | null) => void;
}

// Create the store with Zustand
export const useStore = create<GlobalState>()(
  persist(
    (set) => ({
      // User state
      currentUser: null,
      setCurrentUser: (user) => set({ currentUser: user }),
      
      // Teams state
      teams: [],
      setTeams: (teams) => set({ teams }),
      addTeam: (team) => set((state) => ({ teams: [...state.teams, team] })),
      updateTeam: (id, teamData) => set((state) => ({
        teams: state.teams.map((team) => 
          team.id === id ? { ...team, ...teamData } : team
        ),
      })),
      removeTeam: (id) => set((state) => ({
        teams: state.teams.filter((team) => team.id !== id),
      })),
      
      // Tasks state
      tasks: [],
      setTasks: (tasks) => set({ tasks }),
      addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
      updateTask: (id, taskData) => set((state) => ({
        tasks: state.tasks.map((task) => 
          task.id === id ? { ...task, ...taskData } : task
        ),
      })),
      removeTask: (id) => set((state) => ({
        tasks: state.tasks.filter((task) => task.id !== id),
      })),
      
      // UI state
      isDarkMode: true, // Default to dark mode
      toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
      sidebarCollapsed: false,
      toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
      
      // Application state
      isLoading: false,
      setIsLoading: (loading) => set({ isLoading: loading }),
      globalError: null,
      setGlobalError: (error) => set({ globalError: error }),
    }),
    {
      name: 'xanderai-store',
      partialize: (state) => ({
        // Only persist these keys to localStorage
        isDarkMode: state.isDarkMode,
        sidebarCollapsed: state.sidebarCollapsed,
      }),
    }
  )
);

// Helper hooks for specific slices of state
export const useUserState = () => {
  const { currentUser, setCurrentUser } = useStore();
  return { currentUser, setCurrentUser };
};

export const useTeamState = () => {
  const { teams, setTeams, addTeam, updateTeam, removeTeam } = useStore();
  return { teams, setTeams, addTeam, updateTeam, removeTeam };
};

export const useTaskState = () => {
  const { tasks, setTasks, addTask, updateTask, removeTask } = useStore();
  return { tasks, setTasks, addTask, updateTask, removeTask };
};

export const useUIState = () => {
  const { isDarkMode, toggleDarkMode, sidebarCollapsed, toggleSidebar } = useStore();
  return { isDarkMode, toggleDarkMode, sidebarCollapsed, toggleSidebar };
};

export const useAppState = () => {
  const { isLoading, setIsLoading, globalError, setGlobalError } = useStore();
  return { isLoading, setIsLoading, globalError, setGlobalError };
}; 