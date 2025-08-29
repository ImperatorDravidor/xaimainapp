/**
 * Centralized API layer for handling data fetching and mutations
 */

// API response types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: string;
}

// Base URL for API requests - replace with actual API URL in production
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

/**
 * Generic fetch function with error handling and type safety
 */
async function fetchFromApi<T>(
  endpoint: string, 
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  try {
    // In a real app, you might want to handle auth tokens here
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    // Parse the JSON response
    const data = await response.json();

    // Check if the response is successful
    if (!response.ok) {
      return {
        success: false,
        data: {} as T,
        error: data.error || `Error: ${response.status} ${response.statusText}`
      };
    }

    return {
      success: true,
      data: data as T
    };

  } catch (error) {
    console.error('API request failed:', error);
    return {
      success: false,
      data: {} as T,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
}

/**
 * GET request helper
 */
export function get<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
  return fetchFromApi<T>(endpoint, {
    method: 'GET',
    ...options,
  });
}

/**
 * POST request helper
 */
export function post<T>(endpoint: string, data: any, options: RequestInit = {}): Promise<ApiResponse<T>> {
  return fetchFromApi<T>(endpoint, {
    method: 'POST',
    body: JSON.stringify(data),
    ...options,
  });
}

/**
 * PUT request helper
 */
export function put<T>(endpoint: string, data: any, options: RequestInit = {}): Promise<ApiResponse<T>> {
  return fetchFromApi<T>(endpoint, {
    method: 'PUT',
    body: JSON.stringify(data),
    ...options,
  });
}

/**
 * DELETE request helper
 */
export function del<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
  return fetchFromApi<T>(endpoint, {
    method: 'DELETE',
    ...options,
  });
}

// Type definitions for common data structures
export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
}

export interface Team {
  id: string;
  name: string;
  description?: string;
  members: number;
  status: "active" | "inactive" | "paused" | "deploying";
  metrics: {
    tasksCompleted: number;
    errorRate: string;
  };
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: "completed" | "in-progress" | "pending" | "failed";
  priority: "low" | "medium" | "high" | "urgent";
  due: string;
  assignedTo: string;
  team: string;
}

// API endpoints for different resources
export const api = {
  teams: {
    getAll: () => get<Team[]>('/teams'),
    getById: (id: string) => get<Team>(`/teams/${id}`),
    create: (teamData: Omit<Team, 'id'>) => post<Team>('/teams', teamData),
    update: (id: string, teamData: Partial<Team>) => put<Team>(`/teams/${id}`, teamData),
    delete: (id: string) => del<void>(`/teams/${id}`),
  },
  
  tasks: {
    getAll: () => get<Task[]>('/tasks'),
    getByTeam: (teamId: string) => get<Task[]>(`/teams/${teamId}/tasks`),
    getById: (id: string) => get<Task>(`/tasks/${id}`),
    create: (taskData: Omit<Task, 'id'>) => post<Task>('/tasks', taskData),
    update: (id: string, taskData: Partial<Task>) => put<Task>(`/tasks/${id}`, taskData),
    delete: (id: string) => del<void>(`/tasks/${id}`),
  },

  users: {
    getAll: () => get<User[]>('/users'),
    getById: (id: string) => get<User>(`/users/${id}`),
    getCurrent: () => get<User>('/users/me'),
    update: (id: string, userData: Partial<User>) => put<User>(`/users/${id}`, userData),
  },

  // Add more API endpoints as needed
}; 