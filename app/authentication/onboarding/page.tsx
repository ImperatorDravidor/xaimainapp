"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import { BeamsBackground } from "@/components/ui/beams-background";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import { useClerk, useUser } from "@clerk/nextjs";
import { UserNav } from "@/components/auth/UserNav";
import { ArrowRight, CheckCircle, LogOut, LockIcon, Shield, Building, Users } from "lucide-react";
import Link from "next/link";

export default function OnboardingPage() {
  const router = useRouter();
  const { user, isLoaded } = useUser();
  const { signOut } = useClerk();
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    companyName: "",
    companySize: "enterprise",
    industry: "",
    userRole: "admin",
    accessLevel: "admin",
    department: "executive",
    aiGoals: ["productivity", "cost_savings"],
    enableNotifications: true,
    clientId: "",
    inviteCode: ""
  });

  const handleSignOut = async () => {
    await signOut();
    router.push("/authentication/login");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRadioChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (goal: string) => {
    setFormData(prev => {
      const newGoals = prev.aiGoals.includes(goal)
        ? prev.aiGoals.filter(g => g !== goal)
        : [...prev.aiGoals, goal];
      return { ...prev, aiGoals: newGoals };
    });
  };

  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      handleComplete();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleComplete = async () => {
    setLoading(true);
    // Here you would normally save the data to your backend
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
    setLoading(false);
    router.push("/recap?new_user=true");
  };

  const steps = [
    {
      title: "Welcome to XanderAI Enterprise",
      description: "Complete your client onboarding to access your tailored AI workforce platform",
      content: (
        <div className="space-y-6">
          <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg mb-6">
            <div className="flex items-start space-x-3">
              <LockIcon className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-sm font-medium text-white">Invitation-Only Platform</h3>
                <p className="text-xs text-neutral-400 mt-1">
                  XanderAI is an exclusive enterprise platform available only to pre-approved clients. 
                  Please verify your client ID and invitation code to continue.
                </p>
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            <Label htmlFor="companyName">Company Name</Label>
            <Input
              id="companyName"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              placeholder="Your enterprise name"
              className="bg-black/30 border-neutral-800 focus:border-blue-500"
            />
          </div>
          
          <div className="space-y-3">
            <Label htmlFor="clientId">Client ID</Label>
            <Input
              id="clientId"
              name="clientId"
              value={formData.clientId}
              onChange={handleChange}
              placeholder="XAI-ENT-12345"
              className="bg-black/30 border-neutral-800 focus:border-blue-500"
            />
            <p className="text-xs text-neutral-500">
              Your Client ID was provided by your XanderAI account manager
            </p>
          </div>
          
          <div className="space-y-3">
            <Label htmlFor="inviteCode">Invitation Code</Label>
            <Input
              id="inviteCode"
              name="inviteCode"
              value={formData.inviteCode}
              onChange={handleChange}
              placeholder="XXXX-XXXX-XXXX"
              className="bg-black/30 border-neutral-800 focus:border-blue-500"
            />
            <p className="text-xs text-neutral-500">
              Your unique invitation code provides secure access to your enterprise instance
            </p>
          </div>
        </div>
      )
    },
    {
      title: "Enterprise Profile",
      description: "Tell us more about your organization",
      content: (
        <div className="space-y-6">
          <div className="space-y-3">
            <Label htmlFor="industry">Industry</Label>
            <Input
              id="industry"
              name="industry"
              value={formData.industry}
              onChange={handleChange}
              placeholder="Technology, Healthcare, Finance, etc."
              className="bg-black/30 border-neutral-800 focus:border-blue-500"
            />
          </div>
          
          <div className="space-y-3">
            <Label>Company Size</Label>
            <RadioGroup
              value={formData.companySize}
              onValueChange={(value) => handleRadioChange("companySize", value)}
              className="flex flex-col space-y-1"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="mid-market" id="mid-market" className="text-blue-500" />
                <Label htmlFor="mid-market" className="font-normal">Mid-Market (100-999 employees)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="enterprise" id="enterprise" className="text-blue-500" />
                <Label htmlFor="enterprise" className="font-normal">Enterprise (1,000-4,999 employees)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="large-enterprise" id="large-enterprise" className="text-blue-500" />
                <Label htmlFor="large-enterprise" className="font-normal">Large Enterprise (5,000+ employees)</Label>
              </div>
            </RadioGroup>
          </div>
        </div>
      )
    },
    {
      title: "Your Access Profile",
      description: "Configure your role and permissions within the organization",
      content: (
        <div className="space-y-6">
          <div className="space-y-3">
            <Label>Department</Label>
            <select
              value={formData.department}
              onChange={(e) => handleSelectChange("department", e.target.value)}
              className="w-full h-10 px-3 py-2 rounded-md border border-neutral-800 bg-black/30 text-white text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="executive">Executive Leadership</option>
              <option value="it">IT & Security</option>
              <option value="operations">Operations</option>
              <option value="marketing">Marketing & Sales</option>
              <option value="finance">Finance</option>
              <option value="hr">Human Resources</option>
              <option value="product">Product Development</option>
              <option value="research">Research & Development</option>
            </select>
          </div>
          
          <div className="space-y-3">
            <Label>Your Role</Label>
            <RadioGroup
              value={formData.userRole}
              onValueChange={(value) => handleRadioChange("userRole", value)}
              className="flex flex-col space-y-1"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="executive" id="role-executive" className="text-blue-500" />
                <Label htmlFor="role-executive" className="font-normal">Executive (C-Suite, VP)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="director" id="role-director" className="text-blue-500" />
                <Label htmlFor="role-director" className="font-normal">Director / Senior Manager</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="manager" id="role-manager" className="text-blue-500" />
                <Label htmlFor="role-manager" className="font-normal">Manager / Team Lead</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="specialist" id="role-specialist" className="text-blue-500" />
                <Label htmlFor="role-specialist" className="font-normal">Specialist / Individual Contributor</Label>
              </div>
            </RadioGroup>
          </div>
          
          <div className="space-y-3">
            <Label>System Access Level</Label>
            <div className="grid grid-cols-1 gap-3">
              {[
                { 
                  id: "admin", 
                  label: "Administrator", 
                  description: "Full platform access with user management and security controls",
                  icon: <Shield className="w-4 h-4 text-red-400" />
                },
                { 
                  id: "manager", 
                  label: "Workforce Manager", 
                  description: "Create and manage AI teams, view all analytics and reports",
                  icon: <Building className="w-4 h-4 text-blue-400" />
                },
                { 
                  id: "user", 
                  label: "Team Member", 
                  description: "Work with assigned AI teams and workflows",
                  icon: <Users className="w-4 h-4 text-green-400" />
                },
              ].map((level) => (
                <div 
                  key={level.id}
                  className={`flex items-start p-3 rounded-lg cursor-pointer border ${
                    formData.accessLevel === level.id 
                      ? "bg-blue-950/30 border-blue-500/30" 
                      : "bg-black/20 border-neutral-800 hover:bg-black/30"
                  }`}
                  onClick={() => handleRadioChange("accessLevel", level.id)}
                >
                  <div className="mt-0.5">{level.icon}</div>
                  <div className="ml-3 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-white">{level.label}</span>
                      {formData.accessLevel === level.id && (
                        <CheckCircle className="w-4 h-4 text-blue-400" />
                      )}
                    </div>
                    <p className="text-xs text-neutral-400 mt-1">{level.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Enterprise AI Goals",
      description: "Tell us how your organization plans to leverage our AI platform",
      content: (
        <div className="space-y-6">
          <div className="space-y-3">
            <Label>Business Objectives (Select all that apply)</Label>
            <div className="grid grid-cols-1 gap-2">
              {[
                { id: "productivity", label: "Enterprise Productivity Enhancement", description: "Automate routine tasks and workflows across departments" },
                { id: "cost_savings", label: "Operational Cost Reduction", description: "Optimize processes to reduce operational expenses" },
                { id: "automation", label: "Workflow Automation & Integration", description: "Connect and automate complex business processes" },
                { id: "insights", label: "Advanced Business Intelligence", description: "Extract actionable insights from enterprise data" },
                { id: "decision_making", label: "Executive Decision Support", description: "AI-powered analytics for leadership decisions" },
                { id: "customer_experience", label: "Customer Experience Enhancement", description: "Improve client interactions and satisfaction" },
                { id: "innovation", label: "Product & Service Innovation", description: "Accelerate R&D and innovation initiatives" },
                { id: "compliance", label: "Regulatory Compliance & Risk Management", description: "Ensure adherence to industry regulations" },
              ].map((goal) => (
                <div key={goal.id} className="flex items-start space-x-2 p-2 rounded-lg hover:bg-white/5">
                  <Checkbox 
                    id={goal.id} 
                    checked={formData.aiGoals.includes(goal.id)}
                    onCheckedChange={() => handleCheckboxChange(goal.id)}
                    className="text-blue-500 border-neutral-500 mt-1"
                  />
                  <div>
                    <Label htmlFor={goal.id} className="font-medium">{goal.label}</Label>
                    <p className="text-xs text-neutral-400 mt-1">{goal.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Ready for Enterprise AI",
      description: "Your AI workforce platform is being prepared",
      content: (
        <div className="space-y-8 py-4">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-500/20 mb-4">
              <CheckCircle className="w-8 h-8 text-blue-400" />
            </div>
            <h3 className="text-xl font-medium text-white">Enterprise Setup Complete</h3>
            <p className="text-neutral-400 mt-2 max-w-md mx-auto">
              Your dedicated XanderAI instance is being configured with enterprise-grade security and your organization's preferences.
            </p>
          </div>
          
          <Card className="bg-black/30 border-neutral-800">
            <div className="p-4 space-y-4">
              <h4 className="font-medium text-white">Enterprise Configuration Summary</h4>
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <div className="text-sm text-neutral-500">Company</div>
                  <div className="text-white">{formData.companyName || "Not specified"}</div>
                </div>
                <div>
                  <div className="text-sm text-neutral-500">Client ID</div>
                  <div className="text-white font-mono text-sm">{formData.clientId || "Not verified"}</div>
                </div>
                <div>
                  <div className="text-sm text-neutral-500">Industry</div>
                  <div className="text-white">{formData.industry || "Not specified"}</div>
                </div>
                <div>
                  <div className="text-sm text-neutral-500">Company Size</div>
                  <div className="text-white capitalize">{formData.companySize.replace("-", " ")}</div>
                </div>
                <div>
                  <div className="text-sm text-neutral-500">Department</div>
                  <div className="text-white capitalize">{formData.department.replace("_", " ")}</div>
                </div>
                <div>
                  <div className="text-sm text-neutral-500">Role</div>
                  <div className="text-white capitalize">{formData.userRole.replace("_", " ")}</div>
                </div>
                <div>
                  <div className="text-sm text-neutral-500">Access Level</div>
                  <div className="text-white capitalize">
                    {formData.accessLevel === "admin" ? "Administrator" : 
                     formData.accessLevel === "manager" ? "Workforce Manager" : "Team Member"}
                  </div>
                </div>
              </div>
              
              <div>
                <div className="text-sm text-neutral-500">Enterprise AI Goals</div>
                <div className="flex flex-wrap gap-2 mt-1">
                  {formData.aiGoals.map(goal => (
                    <span 
                      key={goal} 
                      className="text-xs bg-blue-900/30 text-blue-400 border border-blue-500/20 px-2 py-1 rounded-full"
                    >
                      {goal.replace("_", " ")}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </div>
      )
    }
  ];

  return (
    <BeamsBackground intensity="strong">
      <div className="min-h-screen flex flex-col px-4 py-16 sm:px-6 lg:px-8 relative">
        {/* User Navigation */}
        <div className="absolute top-4 right-4 z-10 flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleSignOut}
            className="text-white/70 hover:text-white flex items-center gap-2"
          >
            <LogOut size={16} />
            <span>Sign Out</span>
          </Button>
          {isLoaded && (
            <UserNav />
          )}
        </div>

        {/* Logo */}
        <div className="absolute top-4 left-4 z-10">
          <div className="flex items-center">
            <Image
              src="/xanderai.svg"
              alt="XanderAI"
              width={150}
              height={40}
              priority
            />
            <span className="ml-2 text-xs px-2 py-1 bg-blue-900/30 border border-blue-500/30 rounded-sm text-blue-400 font-medium">
              ENTERPRISE
            </span>
          </div>
        </div>

        <div className="mx-auto w-full max-w-5xl">
          <div className="mt-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-8"
            >
              <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-blue-500 pb-1">
                {steps[currentStep].title}
              </h1>
              <p className="text-neutral-400 max-w-lg mx-auto">
                {steps[currentStep].description}
              </p>
            </motion.div>

            <div className="flex flex-col items-center justify-center">
              <motion.div
                key={`step-${currentStep}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-2xl"
              >
                <Card className="backdrop-blur-md bg-black/60 border-neutral-800 shadow-xl">
                  <div className="p-6">
                    {steps[currentStep].content}
                  </div>
                </Card>
              </motion.div>

              <div className="mt-8 flex items-center justify-between w-full max-w-2xl">
                <Button
                  variant="outline"
                  disabled={currentStep === 0}
                  onClick={handleBack}
                  className="text-white/70 hover:text-white border-neutral-700"
                >
                  Back
                </Button>

                <div className="flex items-center">
                  {Array.from({ length: steps.length }).map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full mx-1 ${
                        index === currentStep
                          ? "bg-blue-500"
                          : index < currentStep
                          ? "bg-blue-900"
                          : "bg-neutral-700"
                      }`}
                    />
                  ))}
                </div>

                <Button
                  onClick={handleNext}
                  disabled={loading}
                  className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-500 hover:to-blue-700 text-white"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing
                    </>
                  ) : currentStep === steps.length - 1 ? (
                    "Complete Setup"
                  ) : (
                    <>
                      Continue
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </BeamsBackground>
  );
} 