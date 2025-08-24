import { Layout } from "@/components/layout/layout"
import { Button } from "@/components/ui/button"
import { HeroSection } from "@/components/ui/hero-section"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Plus, Calendar as CalendarIcon, Clock, MapPin, Users, Filter, Play, CheckCircle, XCircle, Eye, Edit, Loader2 } from "lucide-react"
import { useState, useEffect } from "react"
import * as React from "react"

const initialSchedules = [
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
  const [schedules, setSchedules] = useState(initialSchedules)
  const [filteredSchedules, setFilteredSchedules] = useState(initialSchedules)
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [editingSchedule, setEditingSchedule] = useState<typeof initialSchedules[0] | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [statusFilter, setStatusFilter] = useState("All")
  const [typeFilter, setTypeFilter] = useState("All")
  const [formData, setFormData] = useState({
    customer: "",
    location: "",
    time: "",
    date: "",
    employees: [] as string[],
    type: "",
    duration: ""
  })
  const { toast } = useToast()

  // Filter schedules
  const filterSchedules = () => {
    let filtered = schedules.filter(schedule => {
      const matchesStatus = statusFilter === "All" || schedule.status === statusFilter
      const matchesType = typeFilter === "All" || schedule.type === typeFilter
      return matchesStatus && matchesType
    })
    setFilteredSchedules(filtered)
  }

  React.useEffect(() => {
    filterSchedules()
  }, [statusFilter, typeFilter, schedules])

  const handleFilter = () => {
    const statuses = ["All", "Scheduled", "In Progress", "Completed", "Cancelled"]
    const currentIndex = statuses.indexOf(statusFilter)
    const nextIndex = (currentIndex + 1) % statuses.length
    setStatusFilter(statuses[nextIndex])
    
    toast({
      title: "Filter updated",
      description: `Filtering by status: ${statuses[nextIndex]}`,
    })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.id]: e.target.value
    }))
  }

  const handleSelectChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleEditSchedule = (schedule: typeof initialSchedules[0]) => {
    setIsEditMode(true)
    setEditingSchedule(schedule)
    setFormData({
      customer: schedule.customer,
      location: schedule.location,
      time: schedule.time,
      date: schedule.date,
      employees: schedule.employees,
      type: schedule.type,
      duration: schedule.duration,
    })
    setIsModalOpen(true)
  }

  const handleViewSchedule = (schedule: typeof initialSchedules[0]) => {
    toast({
      title: "Viewing Schedule",
      description: `Opening details for ${schedule.customer}'s appointment`,
    })
  }

  const handleUpdateStatus = async (scheduleId: number, newStatus: string, customerName: string) => {
    setIsLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      setSchedules(prev => prev.map(schedule => 
        schedule.id === scheduleId 
          ? { ...schedule, status: newStatus }
          : schedule
      ))
      setIsLoading(false)
      
      toast({
        title: "Status Updated",
        description: `${customerName}'s appointment status changed to ${newStatus}`,
      })
    }, 1000)
  }

  const handleCancelSchedule = async (scheduleId: number, customerName: string) => {
    setIsLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      setSchedules(prev => prev.filter(schedule => schedule.id !== scheduleId))
      setIsLoading(false)
      
      toast({
        title: "Appointment Cancelled",
        description: `${customerName}'s appointment has been cancelled and removed.`,
        variant: "destructive",
      })
    }, 1000)
  }

  const resetForm = () => {
    setFormData({
      customer: "",
      location: "",
      time: "",
      date: "",
      employees: [],
      type: "",
      duration: ""
    })
    setIsEditMode(false)
    setEditingSchedule(null)
  }

  const handleAddSchedule = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      if (isEditMode && editingSchedule) {
        // Update existing schedule
        setSchedules(prev => prev.map(schedule => 
          schedule.id === editingSchedule.id 
            ? {
                ...schedule,
                customer: formData.customer,
                location: formData.location,
                time: formData.time,
                date: formData.date,
                employees: formData.employees,
                type: formData.type,
                duration: formData.duration,
              }
            : schedule
        ))
        
        toast({
          title: "Appointment updated successfully",
          description: `${formData.customer}'s appointment has been updated.`,
        })
      } else {
        // Add new schedule
        const newSchedule = {
          id: Math.max(...schedules.map(s => s.id)) + 1,
          customer: formData.customer,
          location: formData.location,
          time: formData.time,
          date: formData.date,
          employees: formData.employees,
          status: "Scheduled" as const,
          type: formData.type,
          duration: formData.duration
        }

        setSchedules(prev => [...prev, newSchedule])
        
        toast({
          title: "Appointment scheduled successfully",
          description: `${formData.customer}'s appointment has been added to the schedule.`,
        })
      }

      // Reset form
      resetForm()
      setIsModalOpen(false)
      setIsLoading(false)
    }, 1000)
  }

  return (
    <Layout>
      <div className="p-4 sm:p-6">
          <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
            {/* Hero Section */}
            <HeroSection
              title="Schedule Management"
              description="Organize cleaning appointments and team assignments efficiently. Plan ahead, track progress, and ensure no job is missed."
              imageUrl="https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=1600&h=400&fit=crop"
              imageAlt="Calendar planning"
            >
              <Button variant="hero" size="lg" onClick={() => setIsModalOpen(true)}>
                <Plus className="h-4 w-4" />
                New Appointment
              </Button>
            </HeroSection>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <Card>
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <CalendarIcon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm sm:text-base text-muted-foreground">Today's Jobs</p>
                      <p className="text-xl sm:text-2xl font-bold">8</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-success/10 rounded-lg">
                      <Clock className="h-5 w-5 text-success" />
                    </div>
                    <div>
                      <p className="text-sm sm:text-base text-muted-foreground">In Progress</p>
                      <p className="text-xl sm:text-2xl font-bold">3</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-warning/10 rounded-lg">
                      <Users className="h-5 w-5 text-warning" />
                    </div>
                    <div>
                      <p className="text-sm sm:text-base text-muted-foreground">Teams Active</p>
                      <p className="text-xl sm:text-2xl font-bold">6</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-accent/10 rounded-lg">
                      <CalendarIcon className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <p className="text-sm sm:text-base text-muted-foreground">This Week</p>
                      <p className="text-xl sm:text-2xl font-bold">47</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
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
              <div className="lg:col-span-2 space-y-4 sm:space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg sm:text-xl font-semibold">Today's Schedule</h2>
                  <Button variant="outline" size="sm" onClick={handleFilter}>
                    <Filter className="h-4 w-4" />
                    Filter by: {statusFilter}
                  </Button>
                </div>

                <Tabs defaultValue="timeline" className="space-y-3 sm:space-y-4">
                  <TabsList>
                    <TabsTrigger value="timeline">Timeline View</TabsTrigger>
                    <TabsTrigger value="list">List View</TabsTrigger>
                  </TabsList>

                  <TabsContent value="timeline" className="space-y-4">
                    {filteredSchedules.map((schedule) => (
                      <Card key={schedule.id}>
                        <CardContent className="p-4 sm:p-6">
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
                                    <AvatarImage src={`https://ui-avatars.com/api/?name=${encodeURIComponent(employee)}&background=random&size=150`} />
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
                            <div className="flex flex-col sm:flex-row gap-2">
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleEditSchedule(schedule)}
                                disabled={isLoading}
                              >
                                <Edit className="h-3 w-3 mr-1" />
                                Edit
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleViewSchedule(schedule)}
                                disabled={isLoading}
                              >
                                <Eye className="h-3 w-3 mr-1" />
                                View
                              </Button>
                              {schedule.status === "Scheduled" && (
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => handleUpdateStatus(schedule.id, "In Progress", schedule.customer)}
                                  disabled={isLoading}
                                >
                                  <Play className="h-3 w-3 mr-1" />
                                  Start
                                </Button>
                              )}
                              {schedule.status === "In Progress" && (
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => handleUpdateStatus(schedule.id, "Completed", schedule.customer)}
                                  disabled={isLoading}
                                >
                                  <CheckCircle className="h-3 w-3 mr-1" />
                                  Complete
                                </Button>
                              )}
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    disabled={isLoading}
                                  >
                                    <XCircle className="h-3 w-3 mr-1" />
                                    Cancel
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Cancel Appointment</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Are you sure you want to cancel the appointment for {schedule.customer}? This action cannot be undone.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Keep Appointment</AlertDialogCancel>
                                    <AlertDialogAction
                                      onClick={() => handleCancelSchedule(schedule.id, schedule.customer)}
                                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                    >
                                      {isLoading ? (
                                        <>
                                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                          Cancelling...
                                        </>
                                      ) : (
                                        "Cancel Appointment"
                                      )}
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </TabsContent>

                  <TabsContent value="list" className="space-y-4">
                    <div className="space-y-3">
                      {filteredSchedules.map((schedule) => (
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
                                        <AvatarImage src={`https://ui-avatars.com/api/?name=${encodeURIComponent(employee)}&background=random&size=150`} />
                                        <AvatarFallback className="text-xs">
                                          {employee.split(' ').map(n => n[0]).join('')}
                                        </AvatarFallback>
                                      </Avatar>
                                    ))}
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <Badge variant={schedule.status === "In Progress" ? "default" : "secondary"}>
                                  {schedule.status}
                                </Badge>
                                <div className="flex gap-1">
                                  <Button 
                                    variant="ghost" 
                                    size="sm"
                                    onClick={() => handleEditSchedule(schedule)}
                                    disabled={isLoading}
                                  >
                                    <Edit className="h-3 w-3" />
                                  </Button>
                                  <Button 
                                    variant="ghost" 
                                    size="sm"
                                    onClick={() => handleViewSchedule(schedule)}
                                    disabled={isLoading}
                                  >
                                    <Eye className="h-3 w-3" />
                                  </Button>
                                  {schedule.status === "Scheduled" && (
                                    <Button 
                                      variant="ghost" 
                                      size="sm"
                                      onClick={() => handleUpdateStatus(schedule.id, "In Progress", schedule.customer)}
                                      disabled={isLoading}
                                    >
                                      <Play className="h-3 w-3" />
                                    </Button>
                                  )}
                                  {schedule.status === "In Progress" && (
                                    <Button 
                                      variant="ghost" 
                                      size="sm"
                                      onClick={() => handleUpdateStatus(schedule.id, "Completed", schedule.customer)}
                                      disabled={isLoading}
                                    >
                                      <CheckCircle className="h-3 w-3" />
                                    </Button>
                                  )}
                                </div>
                              </div>
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
      </div>

        {/* Add/Edit Appointment Modal */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="w-[calc(100vw-2rem)] sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>{isEditMode ? "Edit Appointment" : "New Appointment"}</DialogTitle>
              <DialogDescription>
                {isEditMode 
                  ? "Update the appointment details." 
                  : "Schedule a new cleaning appointment."
                }
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAddSchedule}>
              <div className="grid gap-3 sm:gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="customer">Customer</Label>
                  <Input
                    id="customer"
                    placeholder="Customer name"
                    value={formData.customer}
                    onChange={handleInputChange}
                    required
                    disabled={isLoading}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="location">Location</Label>
                  <Textarea
                    id="location"
                    placeholder="Service address"
                    value={formData.location}
                    onChange={handleInputChange}
                    required
                    disabled={isLoading}
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="date">Date</Label>
                    <Input
                      id="date"
                      type="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      required
                      disabled={isLoading}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="time">Time</Label>
                    <Input
                      id="time"
                      placeholder="09:00 - 12:00"
                      value={formData.time}
                      onChange={handleInputChange}
                      required
                      disabled={isLoading}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="type">Service Type</Label>
                    <Select 
                      value={formData.type} 
                      onValueChange={(value) => handleSelectChange("type", value)}
                      disabled={isLoading}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Residential">Residential</SelectItem>
                        <SelectItem value="Commercial">Commercial</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="duration">Duration</Label>
                    <Input
                      id="duration"
                      placeholder="2 hours"
                      value={formData.duration}
                      onChange={handleInputChange}
                      required
                      disabled={isLoading}
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="employees">Team Members (comma-separated)</Label>
                  <Input
                    id="employees"
                    placeholder="Sarah Johnson, Mike Rodriguez"
                    value={formData.employees.join(", ")}
                    onChange={(e) => {
                      const employees = e.target.value.split(",").map(emp => emp.trim()).filter(emp => emp)
                      setFormData(prev => ({ ...prev, employees }))
                    }}
                    disabled={isLoading}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => {
                  setIsModalOpen(false)
                  resetForm()
                }} disabled={isLoading}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {isEditMode ? "Updating..." : "Scheduling..."}
                    </>
                  ) : (
                    isEditMode ? "Update Appointment" : "Schedule Appointment"
                  )}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
    </Layout>
  )
}