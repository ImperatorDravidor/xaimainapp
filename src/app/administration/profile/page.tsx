"use client";

import { useState, useEffect } from "react";
import DashboardLayout from "@/components/dashboard/layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { User, Mail, Phone, Building, Globe, UserCircle, Key, Bell, Clock, Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { createClient } from '@/utils/supabase/client';

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const supabase = createClient();
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);
  const [profileForm, setProfileForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    jobTitle: "",
    department: "",
    bio: "",
    language: "English (US)",
    timezone: "UTC-5 (Eastern Time)",
    notifications: {
      email: true,
      marketing: false,
      updates: true,
      teamActivity: true,
    },
  });

  // Fetch user data
  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setIsLoaded(true);
      setIsSignedIn(!!user);
    };
    fetchUser();
  }, [supabase]);

  // Update form when user data is loaded
  useEffect(() => {
    if (isLoaded && isSignedIn && user) {
      setProfileForm(prev => ({
        ...prev,
        firstName: user.user_metadata?.full_name?.split(' ')[0] || "",
        lastName: user.user_metadata?.full_name?.split(' ').slice(1).join(' ') || "",
        email: user.email || "",
        phone: user.user_metadata?.phone || "",
      }));
    }
  }, [isLoaded, isSignedIn, user]);

  const handleSaveProfile = async () => {
    setSaving(true);
    try {
      // In a real app, you would save the profile data to your backend
      // and potentially update the Clerk user profile via the SDK
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Show success toast
      toast({
        title: "Profile updated",
        description: "Your profile information has been successfully updated.",
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Update failed",
        description: "There was an error updating your profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  if (!isLoaded) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[80vh]">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-500" />
            <h2 className="text-2xl font-semibold mb-2">Loading profile...</h2>
            <p className="text-neutral-500">Please wait while we retrieve your profile information.</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (!isSignedIn) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[80vh]">
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-2">Authentication Required</h2>
            <p className="text-neutral-500 mb-4">Please sign in to view your profile.</p>
            <Button variant="default" onClick={() => window.location.href = "/authentication/login"}>
              Sign In
            </Button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-2">User Profile</h1>
        <p className="text-neutral-400">
          Manage your account settings and preferences
        </p>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="bg-black/30 backdrop-blur-sm border border-neutral-800 p-1 mb-8">
            <TabsTrigger value="profile" className="data-[state=active]:bg-blue-600">
              <User size={14} className="mr-1" /> Profile
            </TabsTrigger>
            <TabsTrigger value="account" className="data-[state=active]:bg-blue-600">
              <UserCircle size={14} className="mr-1" /> Account
            </TabsTrigger>
            <TabsTrigger value="notifications" className="data-[state=active]:bg-blue-600">
              <Bell size={14} className="mr-1" /> Notifications
            </TabsTrigger>
            <TabsTrigger value="preferences" className="data-[state=active]:bg-blue-600">
              <Globe size={14} className="mr-1" /> Preferences
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column - Profile Photo and Basic Info Card */}
              <Card className="lg:col-span-4 bg-black/40 backdrop-blur-sm border-neutral-800">
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>Your public profile details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex flex-col items-center">
                    <Avatar className="h-24 w-24 mb-4 border-2 border-blue-600/30">
                      {user.imageUrl ? (
                        <AvatarImage src={user.imageUrl} alt={user.fullName || "User"} />
                      ) : (
                        <AvatarFallback className="text-xl">
                          {user.firstName?.[0]}{user.lastName?.[0]}
                        </AvatarFallback>
                      )}
                    </Avatar>
                    <h3 className="text-lg font-medium text-white">{user.fullName}</h3>
                    <p className="text-neutral-400 text-sm">{profileForm.jobTitle}</p>
                    <p className="text-neutral-400 text-sm flex items-center mt-1">
                      <Building size={14} className="mr-1.5" /> {profileForm.department}
                    </p>
                  </div>

                  <div className="space-y-3 border-t border-neutral-800 pt-4">
                    <div className="flex items-center">
                      <Mail size={16} className="text-neutral-400 mr-2" />
                      <span className="text-neutral-300">{profileForm.email}</span>
                    </div>
                    
                    <div className="flex items-center">
                      <Phone size={16} className="text-neutral-400 mr-2" />
                      <span className="text-neutral-300">{profileForm.phone}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-3 border-t border-neutral-800 pt-4">
                    <div className="flex items-center">
                      <Globe size={16} className="text-neutral-400 mr-2" />
                      <span className="text-neutral-300">{profileForm.language}</span>
                    </div>
                    
                    <div className="flex items-center">
                      <Clock size={16} className="text-neutral-400 mr-2" />
                      <span className="text-neutral-300">{profileForm.timezone}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Right Column - Edit Profile Form */}
              <div className="lg:col-span-8 space-y-6">
                <Card className="bg-black/40 backdrop-blur-sm border-neutral-800">
                  <CardHeader>
                    <CardTitle>Edit Profile Information</CardTitle>
                    <CardDescription>Update your personal details</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          placeholder="Your first name"
                          value={profileForm.firstName}
                          onChange={(e) => setProfileForm(prev => ({ ...prev, firstName: e.target.value }))}
                          className="bg-black/30 border-neutral-700"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          placeholder="Your last name"
                          value={profileForm.lastName}
                          onChange={(e) => setProfileForm(prev => ({ ...prev, lastName: e.target.value }))}
                          className="bg-black/30 border-neutral-700"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="jobTitle">Job Title</Label>
                        <Input
                          id="jobTitle"
                          placeholder="Your position"
                          value={profileForm.jobTitle}
                          onChange={(e) => setProfileForm(prev => ({ ...prev, jobTitle: e.target.value }))}
                          className="bg-black/30 border-neutral-700"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="department">Department</Label>
                        <Input
                          id="department"
                          placeholder="Your department"
                          value={profileForm.department}
                          onChange={(e) => setProfileForm(prev => ({ ...prev, department: e.target.value }))}
                          className="bg-black/30 border-neutral-700"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="Your email address"
                          value={profileForm.email}
                          onChange={(e) => setProfileForm(prev => ({ ...prev, email: e.target.value }))}
                          className="bg-black/30 border-neutral-700"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          placeholder="Your phone number"
                          value={profileForm.phone}
                          onChange={(e) => setProfileForm(prev => ({ ...prev, phone: e.target.value }))}
                          className="bg-black/30 border-neutral-700"
                        />
                      </div>
                      
                      <div className="space-y-2 col-span-2">
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea
                          id="bio"
                          placeholder="Brief description about yourself"
                          value={profileForm.bio}
                          onChange={(e) => setProfileForm(prev => ({ ...prev, bio: e.target.value }))}
                          rows={3}
                          className="bg-black/30 border-neutral-700"
                        />
                      </div>
                    </div>
                    
                    <Button 
                      onClick={handleSaveProfile}
                      disabled={saving}
                      className="w-full md:w-auto"
                    >
                      {saving ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Saving...
                        </>
                      ) : "Save Changes"}
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications">
            <Card className="bg-black/40 backdrop-blur-sm border-neutral-800">
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>Manage how you receive notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h4 className="font-medium text-white">Email Notifications</h4>
                      <p className="text-sm text-neutral-400">Receive notifications via email</p>
                    </div>
                    <Switch 
                      checked={profileForm.notifications.email} 
                      onCheckedChange={(checked) => setProfileForm(prev => ({
                        ...prev,
                        notifications: {
                          ...prev.notifications,
                          email: checked
                        }
                      }))}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h4 className="font-medium text-white">Marketing Emails</h4>
                      <p className="text-sm text-neutral-400">Receive promotional emails and offers</p>
                    </div>
                    <Switch 
                      checked={profileForm.notifications.marketing} 
                      onCheckedChange={(checked) => setProfileForm(prev => ({
                        ...prev,
                        notifications: {
                          ...prev.notifications,
                          marketing: checked
                        }
                      }))}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h4 className="font-medium text-white">Platform Updates</h4>
                      <p className="text-sm text-neutral-400">Receive notifications about platform changes</p>
                    </div>
                    <Switch 
                      checked={profileForm.notifications.updates} 
                      onCheckedChange={(checked) => setProfileForm(prev => ({
                        ...prev,
                        notifications: {
                          ...prev.notifications,
                          updates: checked
                        }
                      }))}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h4 className="font-medium text-white">Team Activity</h4>
                      <p className="text-sm text-neutral-400">Get notified about team member actions</p>
                    </div>
                    <Switch 
                      checked={profileForm.notifications.teamActivity} 
                      onCheckedChange={(checked) => setProfileForm(prev => ({
                        ...prev,
                        notifications: {
                          ...prev.notifications,
                          teamActivity: checked
                        }
                      }))}
                    />
                  </div>
                </div>
                
                <Button 
                  onClick={handleSaveProfile}
                  disabled={saving}
                  className="w-full md:w-auto"
                >
                  {saving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : "Save Preferences"}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Preferences Tab */}
          <TabsContent value="preferences">
            <Card className="bg-black/40 backdrop-blur-sm border-neutral-800">
              <CardHeader>
                <CardTitle>Regional Preferences</CardTitle>
                <CardDescription>Customize your language and timezone settings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-3">
                    <Label htmlFor="language">Language</Label>
                    <select
                      id="language"
                      className="w-full bg-black/30 border border-neutral-700 rounded-md p-2 text-white"
                      value={profileForm.language}
                      onChange={(e) => setProfileForm(prev => ({ ...prev, language: e.target.value }))}
                    >
                      <option value="English (US)">English (US)</option>
                      <option value="English (UK)">English (UK)</option>
                      <option value="Spanish">Spanish</option>
                      <option value="French">French</option>
                      <option value="German">German</option>
                      <option value="Japanese">Japanese</option>
                      <option value="Chinese (Simplified)">Chinese (Simplified)</option>
                    </select>
                  </div>
                  
                  <div className="space-y-3">
                    <Label htmlFor="timezone">Timezone</Label>
                    <select
                      id="timezone"
                      className="w-full bg-black/30 border border-neutral-700 rounded-md p-2 text-white"
                      value={profileForm.timezone}
                      onChange={(e) => setProfileForm(prev => ({ ...prev, timezone: e.target.value }))}
                    >
                      <option value="UTC-8 (Pacific Time)">UTC-8 (Pacific Time)</option>
                      <option value="UTC-7 (Mountain Time)">UTC-7 (Mountain Time)</option>
                      <option value="UTC-6 (Central Time)">UTC-6 (Central Time)</option>
                      <option value="UTC-5 (Eastern Time)">UTC-5 (Eastern Time)</option>
                      <option value="UTC+0 (Greenwich Mean Time)">UTC+0 (Greenwich Mean Time)</option>
                      <option value="UTC+1 (Central European Time)">UTC+1 (Central European Time)</option>
                      <option value="UTC+8 (China Standard Time)">UTC+8 (China Standard Time)</option>
                      <option value="UTC+9 (Japan Standard Time)">UTC+9 (Japan Standard Time)</option>
                    </select>
                  </div>
                </div>

                <Button 
                  onClick={handleSaveProfile}
                  disabled={saving}
                  className="w-full md:w-auto"
                >
                  {saving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : "Save Preferences"}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Account Tab */}
          <TabsContent value="account">
            <Card className="bg-black/40 backdrop-blur-sm border-neutral-800">
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>Manage your account and security preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4 border-b border-neutral-800 pb-6">
                  <h3 className="text-lg font-medium text-white">Password</h3>
                  <p className="text-sm text-neutral-400">Change your password or enable additional security features</p>
                  <Button variant="outline" className="bg-black/30 border-neutral-700">
                    <Key size={16} className="mr-2" />
                    Change Password
                  </Button>
                </div>
                
                <div className="space-y-4 border-b border-neutral-800 pb-6">
                  <h3 className="text-lg font-medium text-white">Two-Factor Authentication</h3>
                  <p className="text-sm text-neutral-400">Add an extra layer of security to your account</p>
                  <Button variant="outline" className="bg-black/30 border-neutral-700">
                    Enable 2FA
                  </Button>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-white">Connected Accounts</h3>
                  <p className="text-sm text-neutral-400">Link your account with other services</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Button variant="outline" className="bg-black/30 border-neutral-700">
                      Connect Google
                    </Button>
                    <Button variant="outline" className="bg-black/30 border-neutral-700">
                      Connect GitHub
                    </Button>
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