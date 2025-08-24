import { useState } from "react"
import * as React from "react"
import { Layout } from "@/components/layout/layout"
import { Button } from "@/components/ui/button"
import { HeroSection } from "@/components/ui/hero-section"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ResponsiveTable } from "@/components/ui/responsive-table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { Search, Play, Pause, Clock, Calendar, Users, TrendingUp, Filter, StopCircle, Loader2 } from "lucide-react"

const timeEntries = [
  {
    id: 1,
    employee: "Sarah Johnson",
    customer: "ABC Corporation",
    date: "2024-01-15",
    startTime: "09:00",
    endTime: "12:00",
    totalHours: 3.0,
    status: "Completed",
    task: "Office cleaning - 3rd floor",
    hourlyRate: 25.00,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop"
  },
  {
    id: 2,
    employee: "Mike Rodriguez",
    customer: "The Johnson Family", 
    date: "2024-01-15",
    startTime: "14:00",
    endTime: "16:00",
    totalHours: 2.0,
    status: "Completed",
    task: "House cleaning - Living areas",
    hourlyRate: 22.00,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop"
  },
  {
    id: 3,
    employee: "Emily Chen",
    customer: "Metro Office Complex",
    date: "2024-01-15",
    startTime: "10:30",
    endTime: null,
    totalHours: 0,
    status: "In Progress",
    task: "Commercial cleaning - Lobby",
    hourlyRate: 28.00,
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop"
  }
]

const weeklyStats = [
  { employee: "Sarah Johnson", hoursWorked: 38.5, target: 40, efficiency: 96 },
  { employee: "Mike Rodriguez", hoursWorked: 35.0, target: 40, efficiency: 88 },
  { employee: "Emily Chen", hoursWorked: 42.0, target: 40, efficiency: 105 }
]

export default function TimeTracking() {
  const [entries, setEntries] = useState(timeEntries)
  const [isTimerModalOpen, setIsTimerModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [activeTimer, setActiveTimer] = useState<number | null>(null)
  const { toast } = useToast()

  const handleStartTimer = () => {
    setIsTimerModalOpen(true)
  }

  const handleClockIn = (employeeName: string) => {
    setIsLoading(true)
    setTimeout(() => {
      toast({ title: "Clocked In", description: `${employeeName} has been clocked in successfully.` })
      setIsLoading(false)
    }, 1000)
  }

  const handleStopTimer = (entryId: number, employeeName: string) => {
    setIsLoading(true)
    setTimeout(() => {
      setEntries(prev => prev.map(entry => 
        entry.id === entryId 
          ? { ...entry, status: "Completed" as const, endTime: "17:30", totalHours: 7.0 }
          : entry
      ))
      toast({ title: "Timer Stopped", description: `Time entry for ${employeeName} has been completed.` })
      setIsLoading(false)
    }, 1000)
  }

  return (
    <Layout>
      <div className="p-4 sm:p-6">
          <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
            {/* Hero Section */}
            <HeroSection
              title="Time Tracking"
              description="Monitor work hours and productivity across your team. Track time spent on jobs, measure efficiency, and optimize workflows."
              imageUrl="https://images.unsplash.com/photo-1611348586804-61bf6c080437?w=1600&h=400&fit=crop"
              imageAlt="Clock and time management"
            >
              <Button variant="hero" size="lg">
                <Play className="h-4 w-4" />
                Start Timer
              </Button>
            </HeroSection>

            {/* Search and Filters */}
            <Card>
              <CardContent className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Search by employee, customer, or task..."
                      className="pl-10"
                    />
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button variant="outline">
                      <Filter className="h-4 w-4" />
                      All Employees
                    </Button>
                    <Button variant="outline">Today</Button>
                    <Button variant="outline">This Week</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Time Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <Card>
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Clock className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm sm:text-base text-muted-foreground">Today's Hours</p>
                      <p className="text-xl sm:text-2xl font-bold">28.5</p>
                      <p className="text-xs text-success flex items-center gap-1">
                        <TrendingUp className="h-3 w-3" />
                        +2.5 from yesterday
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-success/10 rounded-lg">
                      <Calendar className="h-5 w-5 text-success" />
                    </div>
                    <div>
                      <p className="text-sm sm:text-base text-muted-foreground">This Week</p>
                      <p className="text-xl sm:text-2xl font-bold">142</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-accent/10 rounded-lg">
                      <Users className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <p className="text-sm sm:text-base text-muted-foreground">Active Now</p>
                      <p className="text-xl sm:text-2xl font-bold">3</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-warning/10 rounded-lg">
                      <TrendingUp className="h-5 w-5 text-warning" />
                    </div>
                    <div>
                      <p className="text-sm sm:text-base text-muted-foreground">Avg Efficiency</p>
                      <p className="text-xl sm:text-2xl font-bold">96%</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <Tabs defaultValue="current" className="space-y-4 sm:space-y-6">
              <TabsList>
                <TabsTrigger value="current">Current Activity</TabsTrigger>
                <TabsTrigger value="history">Time History</TabsTrigger>
                <TabsTrigger value="reports">Weekly Reports</TabsTrigger>
              </TabsList>

              <TabsContent value="current">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                  {/* Active Sessions */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Active Time Sessions</CardTitle>
                      <CardDescription>Currently running timers</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {timeEntries.filter(entry => entry.status === "In Progress").map((entry) => (
                          <div key={entry.id} className="flex items-center justify-between p-4 border rounded-lg bg-primary/5">
                            <div className="flex items-center gap-3">
                              <Avatar>
                                <AvatarImage src={entry.avatar} />
                                <AvatarFallback>{entry.employee.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">{entry.employee}</p>
                                <p className="text-sm text-muted-foreground">{entry.customer}</p>
                                <p className="text-sm text-muted-foreground">{entry.task}</p>
                                <p className="text-sm text-primary">Started at {entry.startTime}</p>
                              </div>
                            </div>
                            <div className="flex flex-col sm:flex-row items-center gap-2">
                              <Button variant="outline" size="sm">
                                <Pause className="h-3 w-3" />
                                Pause
                              </Button>
                              <Button variant="outline" size="sm">Stop</Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Today's Completed */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Today's Completed Work</CardTitle>
                      <CardDescription>Finished time entries for today</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {timeEntries.filter(entry => entry.status === "Completed").map((entry) => (
                          <div key={entry.id} className="flex items-center justify-between p-4 border rounded-lg">
                            <div className="flex items-center gap-3">
                              <Avatar>
                                <AvatarImage src={entry.avatar} />
                                <AvatarFallback>{entry.employee.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">{entry.employee}</p>
                                <p className="text-sm text-muted-foreground">{entry.customer}</p>
                                <p className="text-sm text-muted-foreground">{entry.task}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-medium">{entry.totalHours}h</p>
                              <p className="text-sm text-muted-foreground">{entry.startTime} - {entry.endTime}</p>
                              <p className="text-sm text-success">${(entry.totalHours * entry.hourlyRate).toFixed(2)}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="history">
                <Card>
                  <CardHeader>
                    <CardTitle>Time Entry History</CardTitle>
                    <CardDescription>Complete record of all logged hours</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveTable>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Employee</TableHead>
                          <TableHead>Customer</TableHead>
                          <TableHead>Task</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Start Time</TableHead>
                          <TableHead>End Time</TableHead>
                          <TableHead>Hours</TableHead>
                          <TableHead>Rate</TableHead>
                          <TableHead>Total</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {timeEntries.map((entry) => (
                          <TableRow key={entry.id}>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Avatar className="h-6 w-6">
                                  <AvatarImage src={entry.avatar} />
                                  <AvatarFallback className="text-xs">
                                    {entry.employee.split(' ').map(n => n[0]).join('')}
                                  </AvatarFallback>
                                </Avatar>
                                {entry.employee}
                              </div>
                            </TableCell>
                            <TableCell>{entry.customer}</TableCell>
                            <TableCell>{entry.task}</TableCell>
                            <TableCell>{entry.date}</TableCell>
                            <TableCell>{entry.startTime}</TableCell>
                            <TableCell>{entry.endTime || "-"}</TableCell>
                            <TableCell>{entry.totalHours || "-"}</TableCell>
                            <TableCell>${entry.hourlyRate}</TableCell>
                            <TableCell>
                              {entry.totalHours ? `$${(entry.totalHours * entry.hourlyRate).toFixed(2)}` : "-"}
                            </TableCell>
                            <TableCell>
                              <Badge variant={entry.status === "Completed" ? "default" : "secondary"}>
                                {entry.status}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                    </ResponsiveTable>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reports">
                <Card>
                  <CardHeader>
                    <CardTitle>Weekly Performance Report</CardTitle>
                    <CardDescription>Employee productivity and hours summary</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {weeklyStats.map((stat, index) => (
                        <div key={index} className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <Avatar>
                                <AvatarImage src={`https://ui-avatars.com/api/?name=${encodeURIComponent(stat.employee)}&background=random&size=150`} />
                                <AvatarFallback>{stat.employee.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">{stat.employee}</p>
                                <p className="text-sm text-muted-foreground">
                                  {stat.hoursWorked}h / {stat.target}h target
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-medium">{stat.efficiency}% efficiency</p>
                              <Badge variant={stat.efficiency >= 100 ? "default" : stat.efficiency >= 90 ? "secondary" : "outline"}>
                                {stat.efficiency >= 100 ? "Excellent" : stat.efficiency >= 90 ? "Good" : "Needs Improvement"}
                              </Badge>
                            </div>
                          </div>
                          <div className="space-y-1">
                            <div className="flex justify-between text-sm">
                              <span>Hours Progress</span>
                              <span>{stat.hoursWorked}h / {stat.target}h</span>
                            </div>
                            <Progress value={(stat.hoursWorked / stat.target) * 100} className="h-2" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
      </div>
    </Layout>
  )
}