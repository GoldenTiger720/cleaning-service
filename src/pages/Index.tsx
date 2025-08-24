import { 
  Users, 
  Calendar, 
  DollarSign, 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  Package, 
  AlertTriangle 
} from "lucide-react"
import { Header } from "@/components/layout/header"
import { Sidebar } from "@/components/layout/sidebar"
import { StatsCard } from "@/components/dashboard/stats-card"
import { RecentJobs } from "@/components/dashboard/recent-jobs"
import { QuickActions } from "@/components/dashboard/quick-actions"
import heroImage from "@/assets/hero-cleaning.jpg"
import dashboardBg from "@/assets/dashboard-bg.jpg"

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="flex">
        <Sidebar />
        
        <main className="flex-1 p-6 space-y-6">
          {/* Hero Section */}
          <div 
            className="relative rounded-xl overflow-hidden bg-gradient-hero text-white p-8"
            style={{
              backgroundImage: `linear-gradient(135deg, rgba(0, 154, 255, 0.9), rgba(34, 197, 94, 0.8)), url(${heroImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <div className="relative z-10">
              <h1 className="text-3xl font-bold font-heading mb-2">
                Welcome to CleanPro Management
              </h1>
              <p className="text-xl opacity-90 mb-6">
                Streamline your cleaning business operations with our comprehensive platform
              </p>
              <div className="flex gap-4">
                <button className="bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30 text-white font-semibold py-3 px-6 rounded-lg transition-smooth">
                  Schedule New Job
                </button>
                <button className="bg-white text-primary font-semibold py-3 px-6 rounded-lg hover:bg-white/90 transition-smooth">
                  View Reports
                </button>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatsCard
              title="Active Employees"
              value={24}
              change="+2 this week"
              changeType="positive"
              icon={Users}
              description="Currently working staff"
            />
            <StatsCard
              title="Today's Jobs"
              value={12}
              change="3 completed"
              changeType="positive"
              icon={Calendar}
              description="Scheduled for today"
            />
            <StatsCard
              title="Monthly Revenue"
              value="$45,280"
              change="+15.3%"
              changeType="positive"
              icon={DollarSign}
              description="Compared to last month"
            />
            <StatsCard
              title="Efficiency Rate"
              value="94.5%"
              change="+2.1%"
              changeType="positive"
              icon={TrendingUp}
              description="Job completion rate"
            />
          </div>

          {/* Secondary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatsCard
              title="Hours Logged"
              value="1,247"
              change="This week"
              changeType="neutral"
              icon={Clock}
              description="Total work hours"
              gradient
            />
            <StatsCard
              title="Completed Jobs"
              value={156}
              change="This month"
              changeType="positive"
              icon={CheckCircle}
              description="Successfully finished"
              gradient
            />
            <StatsCard
              title="Inventory Items"
              value={89}
              change="12 low stock"
              changeType="negative"
              icon={Package}
              description="Cleaning supplies"
              gradient
            />
            <StatsCard
              title="Pending Invoices"
              value={7}
              change="$12,450 total"
              changeType="neutral"
              icon={AlertTriangle}
              description="Awaiting payment"
              gradient
            />
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <RecentJobs />
            </div>
            <div>
              <QuickActions />
            </div>
          </div>

          {/* Background Dashboard Image */}
          <div 
            className="hidden lg:block fixed bottom-0 right-0 w-96 h-64 opacity-5 pointer-events-none"
            style={{
              backgroundImage: `url(${dashboardBg})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          />
        </main>
      </div>
    </div>
  );
};

export default Index;
