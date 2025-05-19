"use client";

import { useState } from "react";
import DashboardLayout from "@/components/dashboard/layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Bell, Globe, Lock, User, Palette, Moon, Sun } from "lucide-react";

export default function SettingsPage() {
  const [colorMode, setColorMode] = useState("dark");
  
  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
          <p className="text-neutral-400">Manage your account and platform preferences</p>
        </div>
        
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="bg-black/40 border border-neutral-800">
            <TabsTrigger value="profile" className="data-[state=active]:bg-blue-600">
              <User size={14} className="mr-1" /> Profile
            </TabsTrigger>
            <TabsTrigger value="appearance" className="data-[state=active]:bg-blue-600">
              <Palette size={14} className="mr-1" /> Appearance
            </TabsTrigger>
            <TabsTrigger value="notifications" className="data-[state=active]:bg-blue-600">
              <Bell size={14} className="mr-1" /> Notifications
            </TabsTrigger>
            <TabsTrigger value="security" className="data-[state=active]:bg-blue-600">
              <Lock size={14} className="mr-1" /> Security
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile" className="mt-6">
            <Card className="bg-black/50 backdrop-blur-xl border-neutral-800">
              <CardHeader>
                <CardTitle className="text-xl text-white">Personal Information</CardTitle>
                <CardDescription>Update your account details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" defaultValue="Alex Johnson" className="bg-black/30 border-neutral-700" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" defaultValue="alex.johnson@company.com" className="bg-black/30 border-neutral-700" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="title">Job Title</Label>
                    <Input id="title" defaultValue="Product Manager" className="bg-black/30 border-neutral-700" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <Input id="department" defaultValue="Product Development" className="bg-black/30 border-neutral-700" />
                  </div>
                </div>
                <div className="pt-4">
                  <Button>Save Changes</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="appearance" className="mt-6">
            <Card className="bg-black/50 backdrop-blur-xl border-neutral-800">
              <CardHeader>
                <CardTitle className="text-xl text-white">Theme Preferences</CardTitle>
                <CardDescription>Customize your interface</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Color Mode</Label>
                      <CardDescription>Choose between dark and light mode</CardDescription>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Sun size={16} className={colorMode === "light" ? "text-yellow-400" : "text-neutral-500"} />
                      <Switch 
                        checked={colorMode === "dark"} 
                        onCheckedChange={(checked: boolean) => setColorMode(checked ? "dark" : "light")}
                      />
                      <Moon size={16} className={colorMode === "dark" ? "text-blue-400" : "text-neutral-500"} />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Animations</Label>
                      <CardDescription>Enable interface animations</CardDescription>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Reduced Motion</Label>
                      <CardDescription>Use more subtle animations</CardDescription>
                    </div>
                    <Switch />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications" className="mt-6">
            <Card className="bg-black/50 backdrop-blur-xl border-neutral-800">
              <CardHeader>
                <CardTitle className="text-xl text-white">Notification Settings</CardTitle>
                <CardDescription>Control what notifications you receive</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { 
                      title: "AI Team Reports",
                      description: "Receive notifications when new reports are generated",
                      defaultChecked: true 
                    },
                    { 
                      title: "Performance Alerts",
                      description: "Get alerts about significant performance changes",
                      defaultChecked: true 
                    },
                    { 
                      title: "System Updates",
                      description: "Be notified about platform updates and maintenance",
                      defaultChecked: true 
                    },
                    { 
                      title: "Task Completions",
                      description: "Get notified when AI teams complete assigned tasks",
                      defaultChecked: false 
                    },
                    { 
                      title: "Security Alerts",
                      description: "Urgent notifications about security-related issues",
                      defaultChecked: true 
                    }
                  ].map((notification, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">{notification.title}</Label>
                        <CardDescription>{notification.description}</CardDescription>
                      </div>
                      <Switch defaultChecked={notification.defaultChecked} />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="security" className="mt-6">
            <Card className="bg-black/50 backdrop-blur-xl border-neutral-800">
              <CardHeader>
                <CardTitle className="text-xl text-white">Security Settings</CardTitle>
                <CardDescription>Manage account security options</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-white mb-2">Change Password</h3>
                    <div className="space-y-3">
                      <div className="space-y-2">
                        <Label htmlFor="current-password">Current Password</Label>
                        <Input id="current-password" type="password" className="bg-black/30 border-neutral-700" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="new-password">New Password</Label>
                        <Input id="new-password" type="password" className="bg-black/30 border-neutral-700" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirm-password">Confirm New Password</Label>
                        <Input id="confirm-password" type="password" className="bg-black/30 border-neutral-700" />
                      </div>
                      <Button className="mt-2">Update Password</Button>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-neutral-800">
                    <h3 className="text-lg font-medium text-white mb-2">Two-Factor Authentication</h3>
                    <p className="text-neutral-400 text-sm mb-4">Add an extra layer of security to your account</p>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Enable 2FA</Label>
                        <CardDescription>Use an authenticator app to generate verification codes</CardDescription>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
} 