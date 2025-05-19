"use client";

import { useState } from "react";
import DashboardLayout from "@/components/dashboard/layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Activity, 
  Shield, 
  UserCog, 
  Settings, 
  FileText, 
  AlertTriangle, 
  CheckCircle, 
  RefreshCw,
  Info,
  Search,
  Download,
  Filter,
  Lock,
  Server,
  Database,
  Clock,
  Calendar
} from "lucide-react";

// Mock audit logs data
const mockAuditLogs = [
  {
    id: "log-001",
    timestamp: "2023-06-15T14:32:45",
    user: "Sarah Johnson",
    action: "User Login",
    category: "Authentication",
    ipAddress: "192.168.1.105",
    status: "Success",
    details: "User logged in successfully from Chrome on Windows"
  },
  {
    id: "log-002",
    timestamp: "2023-06-15T13:21:15",
    user: "Michael Chen",
    action: "Permission Change",
    category: "Access Control",
    ipAddress: "192.168.1.110",
    status: "Success",
    details: "Added 'Analytics' permission to Marketing Manager role"
  },
  {
    id: "log-003",
    timestamp: "2023-06-15T11:45:30",
    user: "David Wilson",
    action: "AI Team Created",
    category: "Team Management",
    ipAddress: "192.168.1.118",
    status: "Success",
    details: "Created new AI team 'Customer Support Automation'"
  },
  {
    id: "log-004",
    timestamp: "2023-06-15T10:12:05",
    user: "Emily Rodriguez",
    action: "Data Export",
    category: "Data Management",
    ipAddress: "192.168.1.125",
    status: "Success",
    details: "Exported analytics report for Q2 2023"
  },
  {
    id: "log-005",
    timestamp: "2023-06-15T09:05:22",
    user: "System",
    action: "Failed Login Attempt",
    category: "Authentication",
    ipAddress: "203.45.67.89",
    status: "Failed",
    details: "Multiple failed login attempts for user 'lisa.t@company.com'"
  },
  {
    id: "log-006",
    timestamp: "2023-06-14T16:48:10",
    user: "Admin User",
    action: "System Configuration",
    category: "System",
    ipAddress: "192.168.1.100",
    status: "Success",
    details: "Updated security policy settings"
  },
  {
    id: "log-007",
    timestamp: "2023-06-14T15:33:45",
    user: "Lisa Thompson",
    action: "User Created",
    category: "User Management",
    ipAddress: "192.168.1.130",
    status: "Success",
    details: "Created new user account for 'james.miller@company.com'"
  }
];

// Compliance data
const complianceChecks = [
  {
    id: 1,
    name: "Data Retention Policy",
    status: "Compliant",
    lastChecked: "2023-06-14T10:15:30",
    description: "All data retention settings comply with company policy"
  },
  {
    id: 2,
    name: "Password Security Policy",
    status: "Compliant",
    lastChecked: "2023-06-15T08:30:45",
    description: "Password policies meet security requirements"
  },
  {
    id: 3,
    name: "Access Control Review",
    status: "Warning",
    lastChecked: "2023-06-13T14:20:10",
    description: "5 user accounts have elevated permissions that need review"
  },
  {
    id: 4,
    name: "GDPR Compliance",
    status: "Compliant",
    lastChecked: "2023-06-12T11:45:20",
    description: "All GDPR required settings are properly configured"
  },
  {
    id: 5,
    name: "API Access Audit",
    status: "Issue",
    lastChecked: "2023-06-10T16:05:30",
    description: "Unused API keys detected that should be revoked"
  }
];

export default function AuditLogsPage() {
  const [dateFilter, setDateFilter] = useState("last7days");

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-white mb-1">Audit Logs & Compliance</h1>
            <p className="text-sm text-neutral-400">Monitor system activity and security compliance</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-8 border-neutral-700 hover:border-neutral-600">
              <Download size={14} className="mr-1.5" />
              Export Logs
            </Button>
            <Button size="sm" className="h-8">
              <RefreshCw size={14} className="mr-1.5" />
              Refresh
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="audit-logs" className="w-full">
          <TabsList className="bg-black/40 border border-neutral-800">
            <TabsTrigger value="audit-logs" className="data-[state=active]:bg-blue-600">
              <Activity size={14} className="mr-1" /> Audit Logs
            </TabsTrigger>
            <TabsTrigger value="compliance" className="data-[state=active]:bg-blue-600">
              <Shield size={14} className="mr-1" /> Compliance
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="audit-logs" className="mt-4 space-y-4">
            {/* Filtering options */}
            <Card className="bg-black/50 backdrop-blur-sm border-neutral-800">
              <CardContent className="p-3">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500" size={16} />
                    <Input
                      placeholder="Search logs..."
                      className="pl-9 h-9 bg-black/30 border-neutral-700 text-sm"
                    />
                  </div>
                  
                  <div className="space-y-1">
                    <label className="text-xs text-neutral-400">Filter By</label>
                    <div className="flex gap-2">
                      <select className="flex-1 bg-black/30 border border-neutral-700 rounded-md p-1.5 px-2 text-white text-sm h-9">
                        <option value="all">All Categories</option>
                        <option value="authentication">Authentication</option>
                        <option value="user">User Management</option>
                        <option value="system">System</option>
                        <option value="data">Data Management</option>
                        <option value="access">Access Control</option>
                      </select>
                      
                      <select className="flex-1 bg-black/30 border border-neutral-700 rounded-md p-1.5 px-2 text-white text-sm h-9">
                        <option value="all-status">All Status</option>
                        <option value="success">Success</option>
                        <option value="failed">Failed</option>
                        <option value="warning">Warning</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <label className="text-xs text-neutral-400">Date Range</label>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="w-full h-9 bg-black/30 border-neutral-700 hover:bg-black/50 hover:border-neutral-600 text-sm"
                      >
                        <Calendar className="mr-1.5 h-4 w-4" />
                        Last 7 days
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Audit logs table */}
            <Card className="bg-black/50 backdrop-blur-sm border-neutral-800 overflow-hidden">
              <CardHeader className="p-4 border-b border-neutral-800">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg text-white">System Activity Logs</CardTitle>
                  <CardDescription className="text-xs">
                    Jun 8, 2023 - Jun 15, 2023
                  </CardDescription>
                </div>
              </CardHeader>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-black/60 border-b border-neutral-800">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-neutral-400">Timestamp</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-neutral-400">User</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-neutral-400">Action</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-neutral-400">Category</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-neutral-400">Status</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-neutral-400">Details</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-800">
                    {mockAuditLogs.map((log) => (
                      <tr key={log.id} className="hover:bg-black/30">
                        <td className="px-4 py-2.5 text-xs text-neutral-300">
                          <div className="flex items-center gap-2">
                            <Clock size={12} className="text-neutral-500" />
                            {new Date(log.timestamp).toLocaleString()}
                          </div>
                        </td>
                        <td className="px-4 py-2.5 text-xs text-neutral-300">{log.user}</td>
                        <td className="px-4 py-2.5 text-xs text-neutral-300">{log.action}</td>
                        <td className="px-4 py-2.5">
                          <Badge variant="outline" className={`text-xs ${
                            log.category === 'Authentication' ? 'border-blue-500/40 text-blue-400 bg-blue-900/20' :
                            log.category === 'Access Control' ? 'border-purple-500/40 text-purple-400 bg-purple-900/20' :
                            log.category === 'System' ? 'border-emerald-500/40 text-emerald-400 bg-emerald-900/20' :
                            log.category === 'Data Management' ? 'border-amber-500/40 text-amber-400 bg-amber-900/20' :
                            'border-neutral-500/40 text-neutral-400 bg-neutral-900/20'
                          }`}>
                            {log.category}
                          </Badge>
                        </td>
                        <td className="px-4 py-2.5">
                          <div className="flex items-center gap-2">
                            <div className={`w-1.5 h-1.5 rounded-full ${
                              log.status === 'Success' ? 'bg-green-500' : 
                              log.status === 'Failed' ? 'bg-red-500' : 
                              'bg-amber-500'
                            }`} />
                            <span className="text-xs text-neutral-300">{log.status}</span>
                          </div>
                        </td>
                        <td className="px-4 py-2.5 text-xs text-neutral-400 max-w-xs truncate">{log.details}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <CardFooter className="p-3 flex justify-between items-center border-t border-neutral-800">
                <div className="text-xs text-neutral-400">Showing recent logs - Total: 1,532 entries</div>
                <div className="flex gap-1">
                  <Button variant="outline" size="sm" className="h-7 text-xs border-neutral-700 hover:border-neutral-600">Previous</Button>
                  <Button variant="outline" size="sm" className="h-7 text-xs border-neutral-700 hover:border-neutral-600">Next</Button>
                </div>
              </CardFooter>
            </Card>
            
            {/* Summary cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              {[
                { 
                  title: "Authentication", 
                  count: 156, 
                  icon: <Lock className="w-4 h-4 text-blue-400" />,
                  color: "bg-blue-900/20 border-blue-700/20"
                },
                { 
                  title: "User Management", 
                  count: 78, 
                  icon: <UserCog className="w-4 h-4 text-purple-400" />,
                  color: "bg-purple-900/20 border-purple-700/20"
                },
                { 
                  title: "System Config", 
                  count: 42, 
                  icon: <Settings className="w-4 h-4 text-emerald-400" />,
                  color: "bg-emerald-900/20 border-emerald-700/20"
                },
                { 
                  title: "Data Operations", 
                  count: 103, 
                  icon: <Database className="w-4 h-4 text-amber-400" />,
                  color: "bg-amber-900/20 border-amber-700/20"
                }
              ].map((item, i) => (
                <Card key={i} className={`border border-neutral-800 ${item.color}`}>
                  <CardContent className="p-3 flex items-center justify-between">
                    <div>
                      <p className="text-xs text-neutral-400">{item.title}</p>
                      <p className="text-lg font-bold text-white mt-1">{item.count}</p>
                      <p className="text-[10px] text-neutral-500">Last 7 days</p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-black/30 flex items-center justify-center">
                      {item.icon}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="compliance" className="mt-4 space-y-4">
            {/* Compliance dashboard */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <Card className="bg-green-900/10 border-green-800/30">
                <CardContent className="p-3 flex items-center">
                  <div className="w-10 h-10 rounded-full bg-green-900/30 flex items-center justify-center mr-3">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <p className="text-xs text-neutral-400">Compliant Items</p>
                    <p className="text-xl font-bold text-white">3</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-amber-900/10 border-amber-800/30">
                <CardContent className="p-3 flex items-center">
                  <div className="w-10 h-10 rounded-full bg-amber-900/30 flex items-center justify-center mr-3">
                    <AlertTriangle className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <p className="text-xs text-neutral-400">Warnings</p>
                    <p className="text-xl font-bold text-white">1</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-red-900/10 border-red-800/30">
                <CardContent className="p-3 flex items-center">
                  <div className="w-10 h-10 rounded-full bg-red-900/30 flex items-center justify-center mr-3">
                    <AlertTriangle className="w-5 h-5 text-red-400" />
                  </div>
                  <div>
                    <p className="text-xs text-neutral-400">Issues</p>
                    <p className="text-xl font-bold text-white">1</p>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Compliance checks table */}
            <Card className="bg-black/50 backdrop-blur-sm border-neutral-800 overflow-hidden">
              <CardHeader className="p-4 border-b border-neutral-800">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-lg text-white">Compliance Status</CardTitle>
                    <CardDescription className="text-xs">Review and resolve compliance issues</CardDescription>
                  </div>
                  <Button size="sm" className="h-8 gap-1">
                    <RefreshCw size={14} className="mr-1" />
                    Run Checks
                  </Button>
                </div>
              </CardHeader>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-black/60 border-b border-neutral-800">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-neutral-400">Check Name</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-neutral-400">Status</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-neutral-400">Last Checked</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-neutral-400">Description</th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-neutral-400">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-800">
                    {complianceChecks.map((check) => (
                      <tr key={check.id} className="hover:bg-black/30">
                        <td className="px-4 py-2.5 font-medium text-sm text-white">{check.name}</td>
                        <td className="px-4 py-2.5">
                          <Badge className={`text-xs ${
                            check.status === 'Compliant' ? 'bg-green-900/30 text-green-300 border-none' :
                            check.status === 'Warning' ? 'bg-amber-900/30 text-amber-300 border-none' :
                            'bg-red-900/30 text-red-300 border-none'
                          }`}>
                            {check.status}
                          </Badge>
                        </td>
                        <td className="px-4 py-2.5 text-xs text-neutral-300">
                          {new Date(check.lastChecked).toLocaleString()}
                        </td>
                        <td className="px-4 py-2.5 text-xs text-neutral-400 max-w-xs truncate">{check.description}</td>
                        <td className="px-4 py-2.5 text-right">
                          <Button variant="outline" size="sm" className="h-7 text-xs border-neutral-700 hover:border-neutral-600">
                            {check.status !== 'Compliant' ? 'Resolve' : 'View Details'}
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
            
            {/* Compliance reports */}
            <Card className="bg-black/50 backdrop-blur-sm border-neutral-800">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg text-white">Compliance Reports</CardTitle>
                <CardDescription className="text-xs">Download detailed compliance reports</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 pt-0">
                {[
                  { 
                    name: "Quarterly Security Audit", 
                    date: "2023-06-01", 
                    type: "Security",
                    status: "Complete" 
                  },
                  { 
                    name: "Data Protection Impact Assessment", 
                    date: "2023-05-15", 
                    type: "Data Privacy",
                    status: "Complete" 
                  },
                  { 
                    name: "Access Control Review", 
                    date: "2023-04-30", 
                    type: "Access Control",
                    status: "Complete" 
                  }
                ].map((report, index) => (
                  <div key={index} className="flex justify-between items-center p-2.5 border border-neutral-800 rounded-lg bg-black/30">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-900/30 flex items-center justify-center">
                        <FileText size={14} className="text-blue-400" />
                      </div>
                      <div>
                        <h3 className="font-medium text-sm text-white">{report.name}</h3>
                        <div className="flex items-center gap-3 text-xs">
                          <span className="text-neutral-400">{report.date}</span>
                          <Badge variant="outline" className="text-xs border-blue-500/20 text-blue-300 bg-blue-900/10">
                            {report.type}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="h-7 text-xs border-neutral-700 hover:border-neutral-600">
                      <Download size={12} className="mr-1.5" />
                      Download
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