"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  Users, 
  BarChart, 
  Clock, 
  Settings, 
  Activity, 
  DollarSign, 
  AlertTriangle,
  CheckCircle,
  XCircle,
  Plus
} from "lucide-react";
import { Team } from "@/components/dashboard/TeamCard";
import { useTeamsStore, RECENT_ACTIVITIES, AI_WORKER_ROLES } from "@/lib/data";
import { toast } from "sonner";
import DashboardLayout from "@/components/dashboard/layout";
import { SubNavigation, SubNavigationTabs } from "@/components/ui/sub-navigation";
import { Tabs, TabsContent } from "@/components/ui/tabs";

export default function TeamDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { getTeamById, updateTeam } = useTeamsStore();
  const [team, setTeam] = useState<Team | null>(null);
  const [loading, setLoading] = useState(true);
  const [addingWorker, setAddingWorker] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [teamId, setTeamId] = useState<string>("");

  useEffect(() => {
    // Resolve the params promise
    params.then((resolvedParams) => {
      setTeamId(resolvedParams.id);
    });
  }, [params]);

  useEffect(() => {
    if (!teamId) return;
    
    // Simulate loading data
    const timer = setTimeout(() => {
      // Get team from store
      const fetchedTeam = getTeamById(teamId);
      setTeam(fetchedTeam || null);
      setLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, [teamId, getTeamById]);

  // Function to add an AI worker
  const handleAddWorker = () => {
    if (!team) return;
    
    setAddingWorker(true);
    
    // Simulate adding a worker
    setTimeout(() => {
      const updatedTeam = {
        ...team,
        members: team.members + 1
      };
      
      updateTeam(updatedTeam);
      setTeam(updatedTeam);
      setAddingWorker(false);
      
      toast.success('New AI worker added to the team');
    }, 1500);
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 border-4 border-t-blue-600 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-gray-400">Loading team details...</p>
          </div>
        </div>
      );
    }

    if (!team) {
      return (
        <div className="text-center py-8">
          <h1 className="text-2xl font-bold text-white mb-4">Team Not Found</h1>
          <p className="text-gray-400 mb-6">The team you're looking for doesn't exist or has been removed.</p>
          <Button 
            onClick={() => router.push("/company/teams")}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Teams
          </Button>
        </div>
      );
    }

    const getStatusIcon = (status: string) => {
      switch(status) {
        case 'completed':
          return <CheckCircle className="h-4 w-4 text-green-500" />;
        case 'warning':
          return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
        case 'failed':
          return <XCircle className="h-4 w-4 text-red-500" />;
        default:
          return <Activity className="h-4 w-4 text-blue-500" />;
      }
    };

    return (
      <div className="space-y-6 px-6 pt-6">
        <div className="mb-6">
          <Button 
            onClick={() => router.push("/company/teams")}
            variant="ghost"
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Teams
          </Button>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-6">
              <div>
                <div className="flex items-center gap-3 flex-wrap">
                  <h1 className="text-3xl font-bold text-white">{team?.name || 'Team Details'}</h1>
                  {team && (
                    <Badge
                      variant={team.status === "active" ? "default" : "destructive"}
                      className={
                        team.status === "active" 
                          ? "bg-green-600 text-white" 
                          : team.status === "deploying"
                          ? "bg-blue-600 text-white"
                          : "bg-yellow-600 text-white"
                      }
                    >
                      {team.status === "deploying" ? (
                        <span className="flex items-center">
                          <Clock className="animate-spin h-3 w-3 mr-1" />
                          Deploying
                        </span>
                      ) : (
                        team.status.charAt(0).toUpperCase() + team.status.slice(1)
                      )}
                    </Badge>
                  )}
                </div>
                <p className="text-gray-400 mt-2">{team?.description || ''}</p>
              </div>
              
              {!loading && team && (
                <SubNavigation>
                  <SubNavigationTabs
                    tabs={[
                      { value: "overview", label: "Overview" },
                      { value: "members", label: "Members" },
                      { value: "activity", label: "Activity" },
                      { value: "settings", label: "Settings" }
                    ]}
                    defaultValue={activeTab}
                    onChange={(value) => setActiveTab(value || "overview")}
                    className="w-auto"
                  />
                </SubNavigation>
              )}
            </div>

            {team && (
              <Button 
                className="bg-blue-600 hover:bg-blue-700 text-white"
                disabled={team.status === "deploying"}
              >
                <Settings className="mr-2 h-4 w-4" />
                Configure Team
              </Button>
            )}
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center min-h-[50vh]">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 border-4 border-t-blue-600 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-gray-400">Loading team details...</p>
            </div>
          </div>
        ) : !team ? (
          <div className="text-center py-8">
            <h1 className="text-2xl font-bold text-white mb-4">Team Not Found</h1>
            <p className="text-gray-400 mb-6">The team you're looking for doesn't exist or has been removed.</p>
            <Button 
              onClick={() => router.push("/company/teams")}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Teams
            </Button>
          </div>
        ) : (
          <Tabs value={activeTab} className="w-full">
            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Performance Metrics</CardTitle>
                      <CardDescription>Key performance indicators for this AI team</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-black/40 p-4 rounded-lg">
                          <div className="flex items-center mb-2">
                            <DollarSign className="h-5 w-5 text-green-500 mr-2" />
                            <h3 className="text-sm font-medium text-gray-300">Cost Savings</h3>
                          </div>
                          <p className="text-2xl font-bold text-green-400">{team.metrics.costSavings}</p>
                          <p className="text-xs text-gray-400 mt-1">vs. human workforce</p>
                        </div>
                        
                        <div className="bg-black/40 p-4 rounded-lg">
                          <div className="flex items-center mb-2">
                            <CheckCircle className="h-5 w-5 text-blue-500 mr-2" />
                            <h3 className="text-sm font-medium text-gray-300">Tasks Completed</h3>
                          </div>
                          <p className="text-2xl font-bold text-white">{team.metrics.tasksCompleted}</p>
                          <p className="text-xs text-gray-400 mt-1">in the last 30 days</p>
                        </div>
                        
                        <div className="bg-black/40 p-4 rounded-lg">
                          <div className="flex items-center mb-2">
                            <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2" />
                            <h3 className="text-sm font-medium text-gray-300">Error Rate</h3>
                          </div>
                          <p className="text-2xl font-bold text-white">{team.metrics.errorRate}</p>
                          <p className="text-xs text-gray-400 mt-1">below industry average</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Activity</CardTitle>
                      <CardDescription>Tasks and alerts from this team</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {team.status === "deploying" ? (
                        <div className="text-center py-6">
                          <Clock className="h-8 w-8 text-blue-500 mx-auto animate-spin mb-3" />
                          <p className="text-gray-400">Team is still deploying. Activity will appear here once active.</p>
                        </div>
                      ) : team.members === 0 ? (
                        <div className="text-center py-6">
                          <Users className="h-8 w-8 text-gray-500 mx-auto mb-3" />
                          <p className="text-gray-400">Add AI workers to start seeing activity.</p>
                        </div>
                      ) : (
                        <ul className="space-y-4">
                          {RECENT_ACTIVITIES.map((activity) => (
                            <li key={activity.id} className="flex items-start p-3 rounded-lg bg-black/30 hover:bg-black/40 transition-colors">
                              <div className="mr-3 mt-0.5">
                                {getStatusIcon(activity.status)}
                              </div>
                              <div className="flex-1">
                                <p className="text-sm text-gray-200">{activity.description}</p>
                                <p className="text-xs text-gray-500 mt-1">{activity.timestamp}</p>
                              </div>
                            </li>
                          ))}
                        </ul>
                      )}
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Team Members</CardTitle>
                      <CardDescription>AI workers in this team</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {team.members === 0 ? (
                        <div className="text-center py-6">
                          <p className="text-gray-400 mb-4">No AI workers in this team yet.</p>
                        </div>
                      ) : (
                        <ul className="space-y-3 mb-4">
                          {Array.from({ length: team.members }).map((_, index) => (
                            <li key={index} className="flex items-center p-3 rounded-lg bg-black/30">
                              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-medium text-sm mr-3">
                                AI
                              </div>
                              <div>
                                <p className="text-sm font-medium text-white">AI Worker {index + 1}</p>
                                <p className="text-xs text-gray-400">
                                  {AI_WORKER_ROLES[index % AI_WORKER_ROLES.length]}
                                </p>
                              </div>
                            </li>
                          ))}
                        </ul>
                      )}
                      <Button 
                        className="w-full"
                        onClick={handleAddWorker}
                        disabled={addingWorker || team.status === "deploying"}
                      >
                        {addingWorker ? (
                          <>
                            <Clock className="animate-spin h-4 w-4 mr-2" />
                            Adding AI Worker...
                          </>
                        ) : (
                          <>
                            <Plus className="mr-2 h-4 w-4" />
                            Add AI Worker
                          </>
                        )}
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="members" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Team Members</CardTitle>
                  <CardDescription>Manage AI workers in this team</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-neutral-400 mb-4">View and manage all AI workers in this team.</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="activity" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Activity Log</CardTitle>
                  <CardDescription>Complete history of team activities</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-neutral-400 mb-4">Detailed log of all actions and tasks performed by this team.</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Team Settings</CardTitle>
                  <CardDescription>Configure this team</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-neutral-400 mb-4">Manage team configuration, permissions, and operation parameters.</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        )}
      </div>
    );
  };

  return (
    <DashboardLayout>
      {renderContent()}
    </DashboardLayout>
  );
} 