import { Header } from "@/components/layout/header"
import { Sidebar } from "@/components/layout/sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Plus, Calendar as CalendarIcon, Clock, MapPin, Users, Filter } from "lucide-react"
import { useState } from "react"

const schedules = [
  {
    id: 1,
    customer: "ABC Corporation",
    location: "123 Business Ave",
    time: "09:00 - 12:00",
    date: "2024-01-15",
    employees: ["Sarah Johnson", "Mike Rodriguez"],
    status: "Scheduled",
    type: "Commercial",
    duration: "3 hours"
  },
  {
    id: 2,
    customer: "The Johnson Family",
    location: "456 Oak Street",
    time: "14:00 - 16:00",
    date: "2024-01-15",
    employees: ["Emily Chen"],
    status: "In Progress",
    type: "Residential",
    duration: "2 hours"
  },
  {
    id: 3,
    customer: "Metro Office Complex",
    location: "789 Metro Blvd",
    time: "18:00 - 22:00",
    date: "2024-01-16",
    employees: ["Sarah Johnson", "Mike Rodriguez", "Emily Chen"],
    status: "Scheduled",
    type: "Commercial",
    duration: "4 hours"
  }
]

export default function Scheduling() {
  const [date, setDate] = useState<Date | undefined>(new Date())

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-3xl font-bold font-heading">Schedule Management</h1>
                <p className="text-muted-foreground">Organize cleaning appointments and team assignments</p>
              </div>
              <Button variant="hero" size="lg">
                <Plus className="h-4 w-4" />
                New Appointment
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <CalendarIcon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Today's Jobs</p>
                      <p className="text-2xl font-bold">8</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-success/10 rounded-lg">
                      <Clock className="h-5 w-5 text-success" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">In Progress</p>
                      <p className="text-2xl font-bold">3</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-warning/10 rounded-lg">
                      <Users className="h-5 w-5 text-warning" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Teams Active</p>
                      <p className="text-2xl font-bold">6</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-accent/10 rounded-lg">
                      <CalendarIcon className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">This Week</p>
                      <p className="text-2xl font-bold">47</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Calendar */}
              <Card className="lg:col-span-1">
                <CardHeader>
                  <CardTitle>Calendar</CardTitle>
                  <CardDescription>Select a date to view schedules</CardDescription>
                </CardHeader>
                <CardContent>
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border"
                  />
                </CardContent>
              </Card>

              {/* Schedule List */}
              <div className="lg:col-span-2 space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">Today's Schedule</h2>
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4" />
                    Filter
                  </Button>
                </div>

                <Tabs defaultValue="timeline" className="space-y-4">
                  <TabsList>
                    <TabsTrigger value="timeline">Timeline View</TabsTrigger>
                    <TabsTrigger value="list">List View</TabsTrigger>
                  </TabsList>

                  <TabsContent value="timeline" className="space-y-4">
                    {schedules.map((schedule) => (
                      <Card key={schedule.id}>
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                              <div className="p-2 bg-primary/10 rounded-lg">
                                <Clock className="h-4 w-4 text-primary" />
                              </div>
                              <div>
                                <h3 className="font-semibold">{schedule.customer}</h3>
                                <p className="text-sm text-muted-foreground">{schedule.time}</p>
                              </div>
                            </div>
                            <Badge variant={schedule.status === "In Progress" ? "default" : "secondary"}>
                              {schedule.status}
                            </Badge>
                          </div>

                          <div className="space-y-2 mb-4">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <MapPin className="h-3 w-3" />
                              {schedule.location}
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Clock className="h-3 w-3" />
                              Duration: {schedule.duration}
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Badge variant="outline">{schedule.type}</Badge>
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Users className="h-4 w-4 text-muted-foreground" />
                              <div className="flex -space-x-2">
                                {schedule.employees.map((employee, index) => (
                                  <Avatar key={index} className="h-6 w-6 border-2 border-background">
                                    <AvatarImage src="/placeholder.svg" />
                                    <AvatarFallback className="text-xs">
                                      {employee.split(' ').map(n => n[0]).join('')}
                                    </AvatarFallback>
                                  </Avatar>
                                ))}
                              </div>
                              <span className="text-sm text-muted-foreground">
                                {schedule.employees.length} team member{schedule.employees.length > 1 ? 's' : ''}
                              </span>
                            </div>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">Edit</Button>
                              <Button variant="outline" size="sm">View</Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </TabsContent>

                  <TabsContent value="list" className="space-y-4">
                    <div className="space-y-3">
                      {schedules.map((schedule) => (
                        <Card key={schedule.id}>
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-4">
                                <div className="text-center">
                                  <p className="text-sm font-medium">{schedule.time.split(' - ')[0]}</p>
                                  <p className="text-xs text-muted-foreground">{schedule.duration}</p>
                                </div>
                                <div className="flex-1">
                                  <h3 className="font-medium">{schedule.customer}</h3>
                                  <p className="text-sm text-muted-foreground">{schedule.location}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                  <div className="flex -space-x-1">
                                    {schedule.employees.slice(0, 3).map((employee, index) => (
                                      <Avatar key={index} className="h-6 w-6 border border-background">
                                        <AvatarImage src="/placeholder.svg" />
                                        <AvatarFallback className="text-xs">
                                          {employee.split(' ').map(n => n[0]).join('')}
                                        </AvatarFallback>
                                      </Avatar>
                                    ))}
                                  </div>
                                </div>
                              </div>
                              <Badge variant={schedule.status === "In Progress" ? "default" : "secondary"}>
                                {schedule.status}
                              </Badge>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}