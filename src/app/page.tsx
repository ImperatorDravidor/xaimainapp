"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";

const RaycastBackground = dynamic(
  () => import("@/components/ui/raycast-animated-blue-background").then(mod => mod.Component),
  { 
    ssr: false,
    loading: () => (
      <div className="absolute inset-0 bg-gradient-to-br from-black via-blue-950/30 to-black animate-pulse" />
    )
  }
);
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { 
  ArrowRight, Shield, Clock, DollarSign, Zap, Users, BarChart2, Building2,
  CheckCircle2, Cpu, TrendingUp, Lock, Globe, Sparkles, Timer, Activity,
  Network, MapPin, Wifi, MessageSquare, FileText, Database, Settings, 
  RefreshCw, Calculator, Package, ClipboardList, Bot
} from "lucide-react";

const WorldMap = dynamic(() => import("@/components/ui/world-map").then(mod => mod.WorldMap), {
  ssr: false,
  loading: () => (
    <div className="w-full aspect-[2/1] bg-black rounded-lg animate-pulse" />
  )
});

export default function LandingPage() {
  const router = useRouter();
  const [scrolled, setScrolled] = React.useState(false);
  const [backgroundLoaded, setBackgroundLoaded] = React.useState(false);
  
  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Preload the Raycast component
    import("@/components/ui/raycast-animated-blue-background").then(() => {
      setBackgroundLoaded(true);
    });
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Floating Navigation */}
      <AnimatePresence>
        {scrolled && (
          <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-black/80 border-b border-white/5"
          >
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
              <Image
                src="/xanderai.svg"
                alt="XanderAI"
                width={120}
                height={30}
                className="h-auto"
              />
              <div className="flex items-center gap-8">
                <Link href="#capabilities" className="text-white/70 hover:text-white transition-colors text-sm font-medium">
                  Capabilities
                </Link>
                <Link href="#impact" className="text-white/70 hover:text-white transition-colors text-sm font-medium">
                  Impact
                </Link>
                <Link href="#pricing" className="text-white/70 hover:text-white transition-colors text-sm font-medium">
                  Pricing
                </Link>
                <Link href="/authentication/signup">
                  <Button className="bg-white text-black hover:bg-white/90 px-6 py-2 text-sm font-semibold">
                    Get Started
                  </Button>
                </Link>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Hero Section with Raycast Background */}
      <section className="relative min-h-screen">
        {/* Raycast Background - Exact component as provided */}
        <div className="absolute inset-0 z-0">
          <RaycastBackground />
        </div>
        
        {/* Subtle overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30 z-[1]" />
        
        {/* Content Overlay */}
        <div className="relative z-10 min-h-screen flex items-center justify-center px-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-5xl mx-auto"
          >
            {/* Logo */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mb-12"
            >
              <Image
                src="/xanderai.svg"
                alt="XanderAI"
                width={160}
                height={45}
                className="h-auto mx-auto"
                priority
              />
            </motion.div>

            {/* Main Headline */}
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-5xl md:text-7xl font-bold mb-6 leading-tight tracking-tight"
            >
              <span className="text-white">Stop Paying Humans</span>
              <span className="block bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                For AI Work
              </span>
            </motion.h1>

            {/* Value Proposition */}
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-xl md:text-2xl text-white/70 mb-8 max-w-3xl mx-auto font-light leading-relaxed"
            >
              XanderAI automates your entire operations stack—
              <span className="text-white/90 font-medium"> data entry, document processing, invoice handling, report generation</span>. 
              The mundane work that costs you millions, automated at 
              <span className="text-cyan-400 font-semibold"> 1/10th the cost</span>.
            </motion.p>

            {/* Key Benefits - Glass Style */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.55 }}
              className="flex flex-wrap justify-center gap-4 mb-12"
            >
              <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-full px-6 py-3 flex items-center gap-2">
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                <span className="text-white/80 text-sm">100% Accuracy</span>
              </div>
              <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-full px-6 py-3 flex items-center gap-2">
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                <span className="text-white/80 text-sm">24/7 Processing</span>
              </div>
              <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-full px-6 py-3 flex items-center gap-2">
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                <span className="text-white/80 text-sm">Zero Training</span>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
            >
              <Link href="/authentication/signup">
                <Button 
                  size="lg" 
                  className="bg-white text-black hover:bg-white/90 px-8 py-6 text-base font-semibold transition-all duration-300 shadow-xl"
                >
                  Start Building Your AI Team
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/authentication/login">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white/30 text-white hover:bg-white/10 px-8 py-6 text-base font-medium backdrop-blur-xl"
                >
                  Watch Demo
                </Button>
              </Link>
            </motion.div>

            {/* Operations Impact Stats - Glass Style */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4"
            >
              <div className="backdrop-blur-xl bg-white/[0.03] border border-white/10 rounded-xl p-6 text-center">
                <div className="text-3xl font-bold text-cyan-400 mb-1">47M</div>
                <div className="text-xs text-white/50 uppercase tracking-wider">Documents/Year</div>
              </div>
              <div className="backdrop-blur-xl bg-white/[0.03] border border-white/10 rounded-xl p-6 text-center">
                <div className="text-3xl font-bold text-purple-400 mb-1">0.3s</div>
                <div className="text-xs text-white/50 uppercase tracking-wider">Avg Process Time</div>
              </div>
              <div className="backdrop-blur-xl bg-white/[0.03] border border-white/10 rounded-xl p-6 text-center">
                <div className="text-3xl font-bold text-green-400 mb-1">$8M</div>
                <div className="text-xs text-white/50 uppercase tracking-wider">Saved Annually</div>
              </div>
              <div className="backdrop-blur-xl bg-white/[0.03] border border-white/10 rounded-xl p-6 text-center">
                <div className="text-3xl font-bold text-pink-400 mb-1">∞</div>
                <div className="text-xs text-white/50 uppercase tracking-wider">Scalability</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Minimal scroll indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div 
            className="w-px h-12 bg-white/20"
            animate={{ opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </section>

      {/* Operations Automation Section - Futuristic Glass Design */}
      <section className="py-32 px-6 relative bg-black">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Automate Your Entire Operations Stack
            </h2>
            <p className="text-xl text-white/60 max-w-3xl mx-auto">
              Every repetitive task. Every manual process. Every spreadsheet update. 
              <span className="text-cyan-400"> Automated.</span>
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid md:grid-cols-3 gap-6"
          >
            {/* Document Processing */}
            <div className="backdrop-blur-xl bg-white/[0.02] border border-white/10 rounded-2xl p-8 hover:bg-white/[0.05] transition-all duration-300">
              <div className="w-14 h-14 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 backdrop-blur-xl rounded-xl flex items-center justify-center mb-6 border border-cyan-500/20">
                <FileText className="text-cyan-400" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Document Operations</h3>
              <p className="text-white/60 mb-4">
                Process 10,000+ documents daily with 99.9% accuracy
              </p>
              <ul className="space-y-2">
                <li className="text-sm text-white/50 flex items-start gap-2">
                  <div className="w-1 h-1 bg-cyan-400 rounded-full mt-2"></div>
                  <span>OCR & data extraction</span>
                </li>
                <li className="text-sm text-white/50 flex items-start gap-2">
                  <div className="w-1 h-1 bg-cyan-400 rounded-full mt-2"></div>
                  <span>Contract analysis</span>
                </li>
                <li className="text-sm text-white/50 flex items-start gap-2">
                  <div className="w-1 h-1 bg-cyan-400 rounded-full mt-2"></div>
                  <span>Form processing</span>
                </li>
              </ul>
            </div>

            {/* Data Entry & Processing */}
            <div className="backdrop-blur-xl bg-white/[0.02] border border-white/10 rounded-2xl p-8 hover:bg-white/[0.05] transition-all duration-300">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-xl rounded-xl flex items-center justify-center mb-6 border border-purple-500/20">
                <Database className="text-purple-400" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Data Operations</h3>
              <p className="text-white/60 mb-4">
                Eliminate manual data entry and validation forever
              </p>
              <ul className="space-y-2">
                <li className="text-sm text-white/50 flex items-start gap-2">
                  <div className="w-1 h-1 bg-purple-400 rounded-full mt-2"></div>
                  <span>CRM data entry</span>
                </li>
                <li className="text-sm text-white/50 flex items-start gap-2">
                  <div className="w-1 h-1 bg-purple-400 rounded-full mt-2"></div>
                  <span>Database migration</span>
                </li>
                <li className="text-sm text-white/50 flex items-start gap-2">
                  <div className="w-1 h-1 bg-purple-400 rounded-full mt-2"></div>
                  <span>Data validation</span>
                </li>
              </ul>
            </div>

            {/* Financial Operations */}
            <div className="backdrop-blur-xl bg-white/[0.02] border border-white/10 rounded-2xl p-8 hover:bg-white/[0.05] transition-all duration-300">
              <div className="w-14 h-14 bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-xl rounded-xl flex items-center justify-center mb-6 border border-green-500/20">
                <Calculator className="text-green-400" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Financial Operations</h3>
              <p className="text-white/60 mb-4">
                Automate your entire accounts payable/receivable
              </p>
              <ul className="space-y-2">
                <li className="text-sm text-white/50 flex items-start gap-2">
                  <div className="w-1 h-1 bg-green-400 rounded-full mt-2"></div>
                  <span>Invoice processing</span>
                </li>
                <li className="text-sm text-white/50 flex items-start gap-2">
                  <div className="w-1 h-1 bg-green-400 rounded-full mt-2"></div>
                  <span>Expense management</span>
                </li>
                <li className="text-sm text-white/50 flex items-start gap-2">
                  <div className="w-1 h-1 bg-green-400 rounded-full mt-2"></div>
                  <span>Report generation</span>
                </li>
              </ul>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center mt-16"
          >
            <Link href="/authentication/signup">
              <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-10 py-6 text-lg font-semibold shadow-2xl">
                See XanderAI in Action
                <ArrowRight className="ml-2" size={20} />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Global AI Teams Network Section */}
      <section className="py-32 relative overflow-hidden bg-black">

        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20 px-6"
          >
            <h2 className="heading-display-emphasis mb-6">
              <span className="text-muted">Always On.</span>{" "}
              <span className="text-primary">Everywhere.</span>
            </h2>
            <p className="text-subtitle max-w-2xl mx-auto">
              AI teams that never sleep, never stop, never slow down.
            </p>
          </motion.div>

          {/* World Map - Full Width, No Container */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="w-full max-w-7xl mx-auto px-6"
          >
            <div className="relative">
              <WorldMap
                lineColor="#3b82f640"
                dots={[
                  // Simplified, elegant connections
                  { start: { lat: 37.7749, lng: -122.4194 }, end: { lat: 51.5074, lng: -0.1278 } },
                  { start: { lat: 40.7128, lng: -74.0060 }, end: { lat: 35.6762, lng: 139.6503 } },
                  { start: { lat: 51.5074, lng: -0.1278 }, end: { lat: 1.3521, lng: 103.8198 } },
                  { start: { lat: 35.6762, lng: 139.6503 }, end: { lat: -33.8688, lng: 151.2093 } },
                  { start: { lat: 1.3521, lng: 103.8198 }, end: { lat: 25.2048, lng: 55.2708 } },
                ]}
              />
            </div>
          </motion.div>

          {/* Elegant Stats - Floating Above Map */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto -mt-20 relative z-20 px-6"
          >
            <div className="stats-floating p-8">
              <div className="grid grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="stat-value mb-2">24/7</div>
                  <div className="stat-label">Always Active</div>
                </div>
                <div className="text-center border-x border-white/10">
                  <div className="stat-value mb-2">∞</div>
                  <div className="stat-label">Infinite Scale</div>
                </div>
                <div className="text-center">
                  <div className="stat-value mb-2">0ms</div>
                  <div className="stat-label">No Delays</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Minimalist Feature Cards */}
          <div className="max-w-6xl mx-auto mt-24 px-6">
            <div className="grid md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="group"
              >
                <div className="feature-card-minimal">
                  <Wifi className="w-8 h-8 text-white/40 mb-4" />
                  <h3 className="text-lg font-medium text-white mb-2">Always Online</h3>
                  <p className="text-white/40 text-sm leading-relaxed">
                    Continuous operations across every timezone. No downtime, no delays.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="group"
              >
                <div className="feature-card-minimal">
                  <Globe className="w-8 h-8 text-white/40 mb-4" />
                  <h3 className="text-lg font-medium text-white mb-2">Global Reach</h3>
                  <p className="text-white/40 text-sm leading-relaxed">
                    Deploy anywhere instantly. No borders, no barriers, no limits.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="group"
              >
                <div className="feature-card-minimal">
                  <Zap className="w-8 h-8 text-white/40 mb-4" />
                  <h3 className="text-lg font-medium text-white mb-2">Instant Scale</h3>
                  <p className="text-white/40 text-sm leading-relaxed">
                    Add capacity in seconds. Scale up or down without constraints.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-6 bg-gradient-to-b from-transparent to-blue-950/10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Enterprise-Ready from Day One
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Deploy industry-specific AI teams with enterprise security, compliance, and integrations built-in
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <Card className="bg-white/5 border-white/10 p-6 h-full hover:bg-white/10 transition-colors">
                <Cpu className="w-12 h-12 text-blue-400 mb-4" />
                <h3 className="text-xl font-bold mb-3">Industry Templates</h3>
                <p className="text-white/60 mb-4">
                  Pre-trained AI teams for agencies, e-commerce, SaaS, professional services, and more
                </p>
                <ul className="text-sm text-white/50 space-y-1">
                  <li>• Marketing & Creative Teams</li>
                  <li>• Customer Service Teams</li>
                  <li>• Operations Teams</li>
                  <li>• Sales & BD Teams</li>
                </ul>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Card className="bg-white/5 border-white/10 p-6 h-full hover:bg-white/10 transition-colors">
                <Activity className="w-12 h-12 text-purple-400 mb-4" />
                <h3 className="text-xl font-bold mb-3">Real-Time Analytics</h3>
                <p className="text-white/60 mb-4">
                  Live dashboards showing productivity, cost savings, and performance metrics
                </p>
                <ul className="text-sm text-white/50 space-y-1">
                  <li>• Cost savings tracking</li>
                  <li>• Throughput metrics</li>
                  <li>• Error rate monitoring</li>
                  <li>• SLA compliance</li>
                </ul>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <Card className="bg-white/5 border-white/10 p-6 h-full hover:bg-white/10 transition-colors">
                <Globe className="w-12 h-12 text-green-400 mb-4" />
                <h3 className="text-xl font-bold mb-3">Seamless Integration</h3>
                <p className="text-white/60 mb-4">
                  Connect with your existing tools via REST, GraphQL, webhooks, and ETL pipelines
                </p>
                <ul className="text-sm text-white/50 space-y-1">
                  <li>• CRM & ERP systems</li>
                  <li>• Communication tools</li>
                  <li>• Project management</li>
                  <li>• Custom APIs</li>
                </ul>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ROI Calculator Section */}
      <section id="roi" className="py-24 px-6 bg-gradient-to-b from-blue-950/10 to-purple-950/10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              The Math is Simple
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              See how XanderAI transforms your operational economics
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <Card className="bg-gradient-to-br from-blue-950/30 to-purple-950/30 border-white/20 p-8 max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                {/* Traditional Team */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-red-400">Traditional 10-Person Team</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-white/60">Base Salaries</span>
                      <span className="font-mono">$1,000,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">Hidden Costs (1.85×)</span>
                      <span className="font-mono">$1,850,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">Productive Hours/Day</span>
                      <span className="font-mono">2-3 hours</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold pt-3 border-t border-white/10">
                      <span>Total Annual Cost</span>
                      <span className="text-red-400">$2,850,000</span>
                    </div>
                  </div>
                </div>

                {/* XanderAI Team */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-green-400">XanderAI Equivalent</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-white/60">AI Team Subscription</span>
                      <span className="font-mono">$480,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">Hidden Costs</span>
                      <span className="font-mono">$0</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">Productive Hours/Day</span>
                      <span className="font-mono">24 hours</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold pt-3 border-t border-white/10">
                      <span>Total Annual Cost</span>
                      <span className="text-green-400">$480,000</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-lg p-6 text-center">
                <div className="text-3xl font-bold mb-2">
                  Save $2,370,000 Annually
                </div>
                <div className="text-white/70">
                  83% cost reduction with 10× productivity increase
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Built for Your Industry
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Specialized AI teams for businesses with 20-500 employees
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Building2, title: "Digital Agencies", desc: "Creative, content, and campaign management" },
              { icon: TrendingUp, title: "E-Commerce", desc: "Product management, customer service, fulfillment" },
              { icon: Users, title: "Professional Services", desc: "Research, analysis, documentation" },
              { icon: BarChart2, title: "SaaS Companies", desc: "Support, onboarding, product operations" },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="bg-white/5 border-white/10 p-6 h-full hover:bg-white/10 transition-colors">
                  <item.icon className="w-10 h-10 text-blue-400 mb-4" />
                  <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                  <p className="text-white/60 text-sm">{item.desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section id="security" className="py-24 px-6 bg-gradient-to-b from-transparent to-black">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Enterprise Security & Compliance
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Bank-grade security and compliance from day one
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-white/5 border-white/10 p-6 text-center">
              <Shield className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-3">SOC 2 Type II</h3>
              <p className="text-white/60">Independently audited security controls</p>
            </Card>
            <Card className="bg-white/5 border-white/10 p-6 text-center">
              <Lock className="w-12 h-12 text-green-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-3">AES-256 Encryption</h3>
              <p className="text-white/60">Military-grade encryption at rest and in transit</p>
            </Card>
            <Card className="bg-white/5 border-white/10 p-6 text-center">
              <Globe className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-3">GDPR & CCPA</h3>
              <p className="text-white/60">Full compliance with global privacy regulations</p>
            </Card>
          </div>

          <div className="mt-12 text-center">
            <p className="text-white/60 mb-6">Additional security features:</p>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                "SAML 2.0 SSO",
                "OAuth 2.0",
                "2FA/MFA",
                "Audit Logs",
                "IP Whitelisting",
                "RBAC",
                "99.9% Uptime SLA"
              ].map((feature) => (
                <Badge key={feature} className="bg-white/10 text-white border-white/20">
                  {feature}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 relative bg-gradient-to-b from-transparent via-blue-950/10 to-transparent">
        <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Deploy Your First AI Team Today
              </h2>
              <p className="text-xl text-white/70 mb-8">
                Join companies saving millions while scaling faster than ever
              </p>
              
              <div className="flex gap-4 justify-center mb-8">
                <Link href="/authentication/signup">
                  <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 px-8">
                    Start 14-Day Free Trial
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/authentication/login">
                  <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10 px-8">
                    Schedule Demo
                  </Button>
                </Link>
              </div>

              <p className="text-sm text-white/50">
                No credit card required • Deploy in under 3 hours • Cancel anytime
              </p>
            </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <Image
                src="/xanderai.svg"
                alt="XanderAI"
                width={120}
                height={30}
                className="h-auto mb-4"
              />
              <p className="text-white/50 text-sm">
                The AI workforce platform for modern businesses
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-white/50 text-sm">
                <li><Link href="#features" className="hover:text-white transition-colors">Features</Link></li>
                <li><Link href="#roi" className="hover:text-white transition-colors">ROI Calculator</Link></li>
                <li><Link href="#security" className="hover:text-white transition-colors">Security</Link></li>
                <li><Link href="/platform/dashboard" className="hover:text-white transition-colors">Dashboard</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-white/50 text-sm">
                <li><Link href="#" className="hover:text-white transition-colors">About</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Careers</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Blog</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-white/50 text-sm">
                <li><Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Terms of Service</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">SOC 2 Report</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">GDPR</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-white/10 text-center text-white/50 text-sm">
            © 2024 XanderAI. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
