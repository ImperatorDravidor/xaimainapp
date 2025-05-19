"use client";

import { useState } from "react";
import DashboardLayout from "@/components/dashboard/layout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Database, 
  FileUp, 
  Search, 
  Filter, 
  Shield, 
  Server, 
  Layers, 
  FileText,
  ArrowUpDown,
  AlertCircle,
  CheckCircle,
  Clock,
  FileType2,
  MoreHorizontal,
  Plus,
  RefreshCw,
  Trash2,
  Lock,
  Eye,
  CloudCog
} from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { motion } from "framer-motion";

// Mock data for enterprise data sources
const dataSources = [
  { 
    id: "ds-001", 
    name: "Customer Relationship Management", 
    type: "Salesforce", 
    status: "connected",
    lastSync: "10 minutes ago",
    dataPoints: 142500,
    size: "258 MB",
    sensitivity: "high"
  },
  { 
    id: "ds-002", 
    name: "Enterprise Resource Planning", 
    type: "SAP", 
    status: "connected",
    lastSync: "2 hours ago",
    dataPoints: 527890,
    size: "1.2 GB",
    sensitivity: "high"
  },
  { 
    id: "ds-003", 
    name: "Human Resources Management", 
    type: "Workday", 
    status: "pending",
    lastSync: "Never",
    dataPoints: 0,
    size: "0",
    sensitivity: "high"
  },
  { 
    id: "ds-004", 
    name: "Financial Reporting", 
    type: "Oracle", 
    status: "connected",
    lastSync: "1 day ago",
    dataPoints: 89300,
    size: "498 MB",
    sensitivity: "high"
  },
  { 
    id: "ds-005", 
    name: "Marketing Analytics", 
    type: "Google Analytics", 
    status: "error",
    lastSync: "Failed",
    dataPoints: 0,
    size: "0",
    sensitivity: "medium"
  },
];

// Mock data for uploaded files
const uploadedFiles = [
  {
    id: "file-001",
    name: "Q3 Financial Report.xlsx",
    type: "Excel",
    uploadedBy: "Michael Chen",
    uploadDate: "2023-10-15",
    size: "4.2 MB",
    status: "processed",
    sensitivity: "high"
  },
  {
    id: "file-002",
    name: "Customer Survey Responses.csv",
    type: "CSV",
    uploadedBy: "Sarah Johnson",
    uploadDate: "2023-10-12",
    size: "18.5 MB",
    status: "processed",
    sensitivity: "medium"
  },
  {
    id: "file-003",
    name: "Market Research Analysis.pdf",
    type: "PDF",
    uploadedBy: "Emily Rodriguez",
    uploadDate: "2023-10-08",
    size: "12.1 MB",
    status: "processing",
    sensitivity: "low"
  },
  {
    id: "file-004",
    name: "Employee Handbook 2023.docx",
    type: "Word",
    uploadedBy: "David Wilson",
    uploadDate: "2023-09-30",
    size: "6.8 MB",
    status: "processed",
    sensitivity: "high"
  },
  {
    id: "file-005",
    name: "Product Specifications.pptx",
    type: "PowerPoint",
    uploadedBy: "Lisa Thompson",
    uploadDate: "2023-09-25",
    size: "22.3 MB",
    status: "error",
    sensitivity: "medium"
  }
];

// Mock data for storage usage
const storageData = {
  total: 2000, // GB
  used: 748, // GB
  byCategory: [
    { category: "Structured Data", size: 410, colorClass: "bg-blue-500" },
    { category: "Documents", size: 186, colorClass: "bg-purple-500" },
    { category: "Analytics Data", size: 95, colorClass: "bg-emerald-500" },
    { category: "Media Files", size: 57, colorClass: "bg-amber-500" }
  ]
};

export default function DataCenterPage() {
  const [activeTab, setActiveTab] = useState("data-sources");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Calculate storage percentages
  const usedPercentage = (storageData.used / storageData.total) * 100;
  const availablePercentage = 100 - usedPercentage;
  
  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
        >
          <div>
            <h1 className="text-2xl font-semibold text-white mb-1">Enterprise Data Center</h1>
            <p className="text-sm text-neutral-400">Manage your organization's data sources and uploads</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="h-9 border-neutral-700 hover:border-neutral-600 bg-black/30">
              <RefreshCw size={15} className="mr-1.5" />
              Refresh
            </Button>
            <Button className="h-9 bg-blue-600 hover:bg-blue-700">
              <Plus size={15} className="mr-1.5" />
              Add Data Source
            </Button>
          </div>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="lg:col-span-2"
          >
            <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="bg-black/40 border border-neutral-800">
                <TabsTrigger value="data-sources" className="data-[state=active]:bg-blue-600">
                  <Database size={14} className="mr-1.5" /> Data Sources
                </TabsTrigger>
                <TabsTrigger value="files" className="data-[state=active]:bg-blue-600">
                  <FileText size={14} className="mr-1.5" /> Files
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="data-sources" className="mt-4 space-y-4">
                {/* Search and filter */}
                <Card className="bg-black/50 backdrop-blur-sm border-neutral-800">
                  <CardContent className="p-3">
                    <div className="flex flex-col md:flex-row gap-3">
                      <div className="relative flex-grow">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500" size={16} />
                        <Input
                          placeholder="Search data sources..."
                          className="pl-9 h-9 bg-black/30 border-neutral-700 text-sm"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="h-9 border-neutral-700 hover:border-neutral-600">
                          <Filter size={14} className="mr-1.5" />
                          Filter
                        </Button>
                        <Button variant="outline" size="sm" className="h-9 border-neutral-700 hover:border-neutral-600">
                          <ArrowUpDown size={14} className="mr-1.5" />
                          Sort
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Data sources table */}
                <Card className="bg-black/50 backdrop-blur-sm border-neutral-800 overflow-hidden">
                  <CardHeader className="p-4 border-b border-neutral-800">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-lg text-white">Data Sources</CardTitle>
                      <CardDescription className="text-xs">Connected enterprise systems</CardDescription>
                    </div>
                  </CardHeader>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-black/60 border-b border-neutral-800">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-neutral-400">Name</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-neutral-400">Type</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-neutral-400">Status</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-neutral-400">Last Sync</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-neutral-400">Data Size</th>
                          <th className="px-4 py-3 text-right text-xs font-medium text-neutral-400">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-neutral-800">
                        {dataSources
                          .filter(ds => ds.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                      ds.type.toLowerCase().includes(searchQuery.toLowerCase()))
                          .map((source) => (
                          <tr key={source.id} className="hover:bg-black/30">
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded bg-neutral-800 flex items-center justify-center">
                                  <Database size={14} className="text-blue-400" />
                                </div>
                                <div>
                                  <div className="font-medium text-sm text-white">{source.name}</div>
                                  <div className="text-xs text-neutral-400">{source.dataPoints.toLocaleString()} records</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-3 text-xs text-neutral-300">{source.type}</td>
                            <td className="px-4 py-3">
                              <Badge variant="outline" className={
                                source.status === 'connected' ? 'border-green-500/40 text-green-400 bg-green-900/20' :
                                source.status === 'pending' ? 'border-amber-500/40 text-amber-400 bg-amber-900/20' :
                                'border-red-500/40 text-red-400 bg-red-900/20'
                              }>
                                {source.status === 'connected' ? (
                                  <><CheckCircle size={12} className="mr-1" /> Connected</>
                                ) : source.status === 'pending' ? (
                                  <><Clock size={12} className="mr-1" /> Pending</>
                                ) : (
                                  <><AlertCircle size={12} className="mr-1" /> Error</>
                                )}
                              </Badge>
                            </td>
                            <td className="px-4 py-3 text-xs text-neutral-300">{source.lastSync}</td>
                            <td className="px-4 py-3 text-xs text-neutral-300">{source.size}</td>
                            <td className="px-4 py-3 text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                                    <MoreHorizontal size={14} />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-48 bg-neutral-900 border-neutral-800 text-neutral-200">
                                  <DropdownMenuItem className="cursor-pointer hover:bg-neutral-800 focus:bg-neutral-800 text-xs py-1.5">
                                    <Eye size={14} className="mr-2" /> View Details
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="cursor-pointer hover:bg-neutral-800 focus:bg-neutral-800 text-xs py-1.5">
                                    <RefreshCw size={14} className="mr-2" /> Sync Now
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="cursor-pointer hover:bg-neutral-800 focus:bg-neutral-800 text-xs py-1.5">
                                    <CloudCog size={14} className="mr-2" /> Configure
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="cursor-pointer hover:bg-neutral-800 focus:bg-neutral-800 text-xs py-1.5 text-red-400">
                                    <Trash2 size={14} className="mr-2" /> Disconnect
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <CardFooter className="p-3 flex justify-between items-center border-t border-neutral-800">
                    <div className="text-xs text-neutral-400">Showing {dataSources.length} data sources</div>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              <TabsContent value="files" className="mt-4 space-y-4">
                {/* Upload and search */}
                <Card className="bg-black/50 backdrop-blur-sm border-neutral-800">
                  <CardContent className="p-3">
                    <div className="flex flex-col md:flex-row gap-3">
                      <div className="relative flex-grow">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500" size={16} />
                        <Input
                          placeholder="Search files..."
                          className="pl-9 h-9 bg-black/30 border-neutral-700 text-sm"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" className="h-9 border-neutral-700 hover:border-neutral-600">
                          <Filter size={14} className="mr-1.5" />
                          Filter
                        </Button>
                        <Button className="h-9 bg-blue-600 hover:bg-blue-700">
                          <FileUp size={14} className="mr-1.5" />
                          Upload Files
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Files table */}
                <Card className="bg-black/50 backdrop-blur-sm border-neutral-800 overflow-hidden">
                  <CardHeader className="p-4 border-b border-neutral-800">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-lg text-white">Uploaded Files</CardTitle>
                      <CardDescription className="text-xs">
                        {uploadedFiles.length} files uploaded for AI processing
                      </CardDescription>
                    </div>
                  </CardHeader>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-black/60 border-b border-neutral-800">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-neutral-400">File</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-neutral-400">Uploaded By</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-neutral-400">Status</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-neutral-400">Sensitivity</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-neutral-400">Size</th>
                          <th className="px-4 py-3 text-right text-xs font-medium text-neutral-400">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-neutral-800">
                        {uploadedFiles
                          .filter(file => file.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                      file.uploadedBy.toLowerCase().includes(searchQuery.toLowerCase()))
                          .map((file) => (
                          <tr key={file.id} className="hover:bg-black/30">
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded bg-neutral-800 flex items-center justify-center">
                                  <FileType2 size={14} className="text-blue-400" />
                                </div>
                                <div>
                                  <div className="font-medium text-sm text-white">{file.name}</div>
                                  <div className="text-xs text-neutral-400">{file.uploadDate}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-3 text-xs text-neutral-300">{file.uploadedBy}</td>
                            <td className="px-4 py-3">
                              <Badge variant="outline" className={
                                file.status === 'processed' ? 'border-green-500/40 text-green-400 bg-green-900/20' :
                                file.status === 'processing' ? 'border-amber-500/40 text-amber-400 bg-amber-900/20' :
                                'border-red-500/40 text-red-400 bg-red-900/20'
                              }>
                                {file.status === 'processed' ? (
                                  <><CheckCircle size={12} className="mr-1" /> Processed</>
                                ) : file.status === 'processing' ? (
                                  <><Clock size={12} className="mr-1" /> Processing</>
                                ) : (
                                  <><AlertCircle size={12} className="mr-1" /> Error</>
                                )}
                              </Badge>
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex items-center">
                                <Shield size={14} className={
                                  file.sensitivity === 'high' ? 'text-red-400 mr-1.5' :
                                  file.sensitivity === 'medium' ? 'text-amber-400 mr-1.5' :
                                  'text-green-400 mr-1.5'
                                } />
                                <span className="text-xs text-neutral-300 capitalize">{file.sensitivity}</span>
                              </div>
                            </td>
                            <td className="px-4 py-3 text-xs text-neutral-300">{file.size}</td>
                            <td className="px-4 py-3 text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                                    <MoreHorizontal size={14} />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-48 bg-neutral-900 border-neutral-800 text-neutral-200">
                                  <DropdownMenuItem className="cursor-pointer hover:bg-neutral-800 focus:bg-neutral-800 text-xs py-1.5">
                                    <Eye size={14} className="mr-2" /> View File
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="cursor-pointer hover:bg-neutral-800 focus:bg-neutral-800 text-xs py-1.5">
                                    <RefreshCw size={14} className="mr-2" /> Reprocess
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="cursor-pointer hover:bg-neutral-800 focus:bg-neutral-800 text-xs py-1.5 text-red-400">
                                    <Trash2 size={14} className="mr-2" /> Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <CardFooter className="p-3 flex justify-between items-center border-t border-neutral-800">
                    <div className="text-xs text-neutral-400">Showing {uploadedFiles.length} files</div>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Storage Overview */}
            <Card className="bg-black/50 backdrop-blur-sm border-neutral-800">
              <CardHeader className="p-4 border-b border-neutral-800">
                <CardTitle className="text-md text-white">Storage Overview</CardTitle>
              </CardHeader>
              <CardContent className="p-4 space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-400">Used Storage</span>
                    <span className="text-white font-medium">{storageData.used} GB / {storageData.total} GB</span>
                  </div>
                  <Progress value={usedPercentage} className="h-2 bg-neutral-800" indicatorClassName="bg-gradient-to-r from-blue-500 to-blue-700" />
                  <div className="flex justify-between text-xs text-neutral-500">
                    <span>{usedPercentage.toFixed(1)}% Used</span>
                    <span>{availablePercentage.toFixed(1)}% Available</span>
                  </div>
                </div>
                
                <div className="space-y-3 pt-2">
                  <h4 className="text-sm font-medium text-neutral-300">Storage by Category</h4>
                  {storageData.byCategory.map((item, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className={`w-3 h-3 rounded-sm ${item.colorClass} mr-2`}></div>
                        <span className="text-xs text-neutral-400">{item.category}</span>
                      </div>
                      <span className="text-xs text-neutral-300">{item.size} GB</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            {/* Security & Compliance */}
            <Card className="bg-black/50 backdrop-blur-sm border-neutral-800">
              <CardHeader className="p-4 border-b border-neutral-800">
                <CardTitle className="text-md text-white">Security & Compliance</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="p-2 rounded-full bg-green-500/10 mr-3">
                        <Shield size={14} className="text-green-400" />
                      </div>
                      <div>
                        <div className="text-sm text-white">Encryption Status</div>
                        <div className="text-xs text-neutral-400">All data is encrypted</div>
                      </div>
                    </div>
                    <Badge variant="outline" className="border-green-500/40 text-green-400 bg-green-900/20">
                      Secure
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="p-2 rounded-full bg-green-500/10 mr-3">
                        <Lock size={14} className="text-green-400" />
                      </div>
                      <div>
                        <div className="text-sm text-white">Access Control</div>
                        <div className="text-xs text-neutral-400">Role-based controls active</div>
                      </div>
                    </div>
                    <Badge variant="outline" className="border-green-500/40 text-green-400 bg-green-900/20">
                      Enabled
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="p-2 rounded-full bg-blue-500/10 mr-3">
                        <Server size={14} className="text-blue-400" />
                      </div>
                      <div>
                        <div className="text-sm text-white">Data Residency</div>
                        <div className="text-xs text-neutral-400">EU-West (Frankfurt)</div>
                      </div>
                    </div>
                    <Badge variant="outline" className="border-blue-500/40 text-blue-400 bg-blue-900/20">
                      Compliant
                    </Badge>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="p-4 border-t border-neutral-800">
                <Button variant="outline" size="sm" className="w-full border-neutral-700 hover:border-neutral-600 text-xs">
                  <Shield size={14} className="mr-1.5" />
                  View Security Report
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
} 