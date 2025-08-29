"use client";

import DashboardLayout from "@/components/dashboard/layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { 
  Users, 
  UserPlus, 
  Shield, 
  Search, 
  Briefcase, 
  Check, 
  X, 
  Edit, 
  MoreHorizontal,
  Download,
  FileText,
  Filter
} from "lucide-react";

const mockUsers = [
  { 
    id: 1, 
    name: "Sarah Johnson", 
    email: "sarah.johnson@company.com", 
    avatar: "/avatars/sarah.jpg", 
    role: "Admin", 
    department: "IT", 
    status: "Active",
    lastActive: "2 hours ago"
  },
  { 
    id: 2, 
    name: "Michael Chen", 
    email: "michael.chen@company.com", 
    avatar: "/avatars/michael.jpg", 
    role: "Manager", 
    department: "Marketing", 
    status: "Active",
    lastActive: "5 minutes ago"
  },
  { 
    id: 3, 
    name: "Emily Rodriguez", 
    email: "emily.r@company.com", 
    avatar: "/avatars/emily.jpg", 
    role: "User", 
    department: "Sales", 
    status: "Active",
    lastActive: "1 day ago"
  },
  { 
    id: 4, 
    name: "David Wilson", 
    email: "david.wilson@company.com", 
    avatar: "/avatars/david.jpg", 
    role: "Manager", 
    department: "Finance", 
    status: "Inactive",
    lastActive: "5 days ago"
  },
  { 
    id: 5, 
    name: "Lisa Thompson", 
    email: "lisa.t@company.com", 
    avatar: "/avatars/lisa.jpg", 
    role: "User", 
    department: "HR", 
    status: "Pending",
    lastActive: "Never"
  }
];

const rolesList = [
  { 
    id: 1, 
    name: "Administrator", 
    description: "Full access to all systems and settings",
    permissions: 12,
    users: 3
  },
  { 
    id: 2, 
    name: "Manager", 
    description: "Team management and reporting capabilities",
    permissions: 8,
    users: 8
  },
  { 
    id: 3, 
    name: "User", 
    description: "Standard user access to platform features",
    permissions: 4,
    users: 22
  },
  { 
    id: 4, 
    name: "Viewer", 
    description: "Read-only access to dashboards and reports",
    permissions: 2,
    users: 6
  },
  { 
    id: 5, 
    name: "Guest", 
    description: "Limited access to specific shared resources",
    permissions: 1,
    users: 4
  }
];

export default function UserManagementPage() {
  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-white mb-1">User Management</h1>
            <p className="text-sm text-neutral-400">Manage users, roles, and permissions across your organization</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-8 border-neutral-700 hover:border-neutral-600">
              <Download size={14} className="mr-1.5" />
              Export
            </Button>
            <Button size="sm" className="h-8">
              <UserPlus size={14} className="mr-1.5" />
              Add User
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="users" className="w-full">
          <TabsList className="bg-black/40 border border-neutral-800">
            <TabsTrigger value="users" className="data-[state=active]:bg-blue-600">
              <Users size={14} className="mr-1" /> Users
            </TabsTrigger>
            <TabsTrigger value="roles" className="data-[state=active]:bg-blue-600">
              <Shield size={14} className="mr-1" /> Roles & Permissions
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="users" className="mt-4 space-y-4">
            {/* User filtering and search */}
            <Card className="bg-black/50 backdrop-blur-sm border-neutral-800">
              <CardContent className="p-3">
                <div className="flex flex-col md:flex-row gap-3">
                  <div className="relative flex-grow">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500" size={16} />
                    <Input
                      placeholder="Search users by name or email..."
                      className="pl-9 h-9 bg-black/30 border-neutral-700 text-sm"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="h-9 border-neutral-700 hover:border-neutral-600">
                      <Filter size={14} className="mr-1.5" />
                      Filter
                    </Button>
                    <Button variant="outline" size="sm" className="h-9 border-neutral-700 hover:border-neutral-600">
                      <Briefcase size={14} className="mr-1.5" />
                      Department
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Users table */}
            <Card className="bg-black/50 backdrop-blur-sm border-neutral-800 overflow-hidden">
              <CardHeader className="p-4 border-b border-neutral-800">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg text-white">Users</CardTitle>
                  <CardDescription className="text-xs">Showing {mockUsers.length} users</CardDescription>
                </div>
              </CardHeader>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-black/60 border-b border-neutral-800">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-neutral-400">User</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-neutral-400">Role</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-neutral-400">Department</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-neutral-400">Status</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-neutral-400">Last Active</th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-neutral-400">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-800">
                    {mockUsers.map((user) => (
                      <tr key={user.id} className="hover:bg-black/30">
                        <td className="px-4 py-2.5">
                          <div className="flex items-center gap-3">
                            <Avatar className="w-7 h-7 border border-neutral-700">
                              <AvatarImage src={user.avatar} alt={user.name} />
                              <AvatarFallback className="bg-blue-900/50 text-blue-200 text-xs">
                                {user.name.split(' ').map(name => name[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium text-sm text-white">{user.name}</div>
                              <div className="text-xs text-neutral-400">{user.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-2.5">
                          <Badge variant="outline" className={
                            user.role === 'Admin' ? 'border-blue-500/40 text-blue-400 bg-blue-900/20' :
                            user.role === 'Manager' ? 'border-purple-500/40 text-purple-400 bg-purple-900/20' :
                            'border-neutral-500/40 text-neutral-400 bg-neutral-900/20'
                          }>
                            {user.role}
                          </Badge>
                        </td>
                        <td className="px-4 py-2.5 text-xs text-neutral-300">{user.department}</td>
                        <td className="px-4 py-2.5">
                          <div className="flex items-center gap-2">
                            <div className={`w-1.5 h-1.5 rounded-full ${
                              user.status === 'Active' ? 'bg-green-500' : 
                              user.status === 'Inactive' ? 'bg-neutral-500' : 
                              'bg-amber-500'
                            }`} />
                            <span className="text-xs text-neutral-300">{user.status}</span>
                          </div>
                        </td>
                        <td className="px-4 py-2.5 text-xs text-neutral-300">{user.lastActive}</td>
                        <td className="px-4 py-2.5 text-right">
                          <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                            <MoreHorizontal size={14} />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <CardFooter className="p-3 flex justify-between items-center border-t border-neutral-800">
                <div className="text-xs text-neutral-400">Showing 1-5 of 43 users</div>
                <div className="flex gap-1">
                  <Button variant="outline" size="sm" className="h-7 text-xs border-neutral-700 hover:border-neutral-600">Previous</Button>
                  <Button variant="outline" size="sm" className="h-7 text-xs border-neutral-700 hover:border-neutral-600">Next</Button>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="roles" className="mt-4 space-y-4">
            <Card className="bg-black/50 backdrop-blur-sm border-neutral-800 overflow-hidden">
              <CardHeader className="p-4 border-b border-neutral-800">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-lg text-white">Roles & Permissions</CardTitle>
                    <CardDescription className="text-xs mt-1">
                      Define roles and associated permissions for users in your organization
                    </CardDescription>
                  </div>
                  <Button size="sm" className="h-8">
                    <Shield size={14} className="mr-1.5" />
                    Create Role
                  </Button>
                </div>
              </CardHeader>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-black/60 border-b border-neutral-800">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-neutral-400">Role</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-neutral-400">Description</th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-neutral-400">Permissions</th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-neutral-400">Users</th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-neutral-400">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-800">
                    {rolesList.map((role) => (
                      <tr key={role.id} className="hover:bg-black/30">
                        <td className="px-4 py-2.5">
                          <div className="font-medium text-sm text-white">{role.name}</div>
                        </td>
                        <td className="px-4 py-2.5 text-xs text-neutral-300">{role.description}</td>
                        <td className="px-4 py-2.5 text-center">
                          <Badge className="bg-blue-900/30 hover:bg-blue-900/40 text-blue-300 border-none text-xs">
                            {role.permissions} permissions
                          </Badge>
                        </td>
                        <td className="px-4 py-2.5 text-center text-xs text-neutral-300">{role.users} users</td>
                        <td className="px-4 py-2.5 text-right">
                          <div className="flex justify-end gap-1">
                            <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                              <Edit size={14} />
                            </Button>
                            <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                              <MoreHorizontal size={14} />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
            
            <Card className="bg-black/50 backdrop-blur-sm border-neutral-800">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg text-white">Permission Categories</CardTitle>
                <CardDescription className="text-xs">
                  Review permission categories that can be assigned to roles
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 pt-0">
                {[
                  { name: "User Management", description: "Create, edit, and delete user accounts" },
                  { name: "AI Team Management", description: "Configure and manage AI workforce teams" },
                  { name: "Analytics & Reporting", description: "Access to data and performance analytics" },
                  { name: "System Configuration", description: "Change system settings and configurations" },
                  { name: "Integrations", description: "Connect to external systems and data sources" },
                ].map((category, index) => (
                  <div key={index} className="flex justify-between items-center p-2.5 border border-neutral-800 rounded-lg bg-black/30">
                    <div>
                      <h3 className="font-medium text-sm text-white">{category.name}</h3>
                      <p className="text-xs text-neutral-400">{category.description}</p>
                    </div>
                    <Button variant="outline" size="sm" className="h-7 text-xs border-neutral-700 hover:border-neutral-600">
                      <FileText size={12} className="mr-1.5" />
                      Details
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
} 