import { useState, useEffect } from "react"
import * as React from "react"
import { Layout } from "@/components/layout/layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { HeroSection } from "@/components/ui/hero-section"
import { ResponsiveTable } from "@/components/ui/responsive-table"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Search, Plus, Edit, Trash2, Phone, Mail, MapPin, Calendar, Loader2 } from "lucide-react"

const initialEmployees = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.johnson@cleanpro.com",
    phone: "(555) 123-4567",
    role: "Team Lead",
    status: "Active",
    location: "Downtown",
    hireDate: "2023-01-15",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop"
  },
  {
    id: 2,
    name: "Mike Rodriguez",
    email: "mike.rodriguez@cleanpro.com",
    phone: "(555) 234-5678",
    role: "Cleaner",
    status: "Active",
    location: "Uptown",
    hireDate: "2023-03-22",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop"
  },
  {
    id: 3,
    name: "Emily Chen",
    email: "emily.chen@cleanpro.com",
    phone: "(555) 345-6789",
    role: "Supervisor",
    status: "On Leave",
    location: "Midtown",
    hireDate: "2022-11-08",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop"
  }
]

export default function Employees() {
  const [employees, setEmployees] = useState(initialEmployees)
  const [filteredEmployees, setFilteredEmployees] = useState(initialEmployees)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [editingEmployee, setEditingEmployee] = useState<typeof initialEmployees[0] | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState("All Roles")
  const [locationFilter, setLocationFilter] = useState("All Locations")
  const [statusFilter, setStatusFilter] = useState("All Status")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    location: "",
  })
  const { toast } = useToast()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  // Filter employees based on search and filter criteria
  const filterEmployees = () => {
    let filtered = employees.filter(employee => {
      const matchesSearch = searchTerm === "" || 
        employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.role.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesRole = roleFilter === "All Roles" || employee.role === roleFilter
      const matchesLocation = locationFilter === "All Locations" || employee.location === locationFilter
      const matchesStatus = statusFilter === "All Status" || employee.status === statusFilter

      return matchesSearch && matchesRole && matchesLocation && matchesStatus
    })
    setFilteredEmployees(filtered)
  }

  // Apply filters whenever search term or filters change
  React.useEffect(() => {
    filterEmployees()
  }, [searchTerm, roleFilter, locationFilter, statusFilter, employees])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const handleRoleFilter = () => {
    const roles = ["All Roles", "Cleaner", "Team Lead", "Supervisor", "Manager"]
    const currentIndex = roles.indexOf(roleFilter)
    const nextIndex = (currentIndex + 1) % roles.length
    setRoleFilter(roles[nextIndex])
    
    toast({
      title: "Filter updated",
      description: `Filtering by: ${roles[nextIndex]}`,
    })
  }

  const handleLocationFilter = () => {
    const locations = ["All Locations", "Downtown", "Uptown", "Midtown", "Suburbs"]
    const currentIndex = locations.indexOf(locationFilter)
    const nextIndex = (currentIndex + 1) % locations.length
    setLocationFilter(locations[nextIndex])
    
    toast({
      title: "Filter updated",
      description: `Filtering by: ${locations[nextIndex]}`,
    })
  }

  const handleStatusFilter = () => {
    const statuses = ["All Status", "Active", "On Leave"]
    const currentIndex = statuses.indexOf(statusFilter)
    const nextIndex = (currentIndex + 1) % statuses.length
    setStatusFilter(statuses[nextIndex])
    
    toast({
      title: "Filter updated",
      description: `Filtering by: ${statuses[nextIndex]}`,
    })
  }

  const handleEditEmployee = (employee: typeof initialEmployees[0]) => {
    setIsEditMode(true)
    setEditingEmployee(employee)
    setFormData({
      name: employee.name,
      email: employee.email,
      phone: employee.phone,
      role: employee.role,
      location: employee.location,
    })
    setIsModalOpen(true)
  }

  const handleDeleteEmployee = async (employeeId: number, employeeName: string) => {
    setIsLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      setEmployees(prev => prev.filter(emp => emp.id !== employeeId))
      setIsLoading(false)
      
      toast({
        title: "Employee removed",
        description: `${employeeName} has been removed from your team.`,
        variant: "destructive",
      })
    }, 1000)
  }

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      role: "",
      location: "",
    })
    setIsEditMode(false)
    setEditingEmployee(null)
  }

  const handleAddEmployee = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      if (isEditMode && editingEmployee) {
        // Update existing employee
        setEmployees(prev => prev.map(emp => 
          emp.id === editingEmployee.id 
            ? {
                ...emp,
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                role: formData.role,
                location: formData.location,
              }
            : emp
        ))
        
        toast({
          title: "Employee updated successfully",
          description: `${formData.name}'s information has been updated.`,
        })
      } else {
        // Add new employee
        const newEmployee = {
          id: Math.max(...employees.map(e => e.id)) + 1,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          role: formData.role,
          status: "Active" as const,
          location: formData.location,
          hireDate: new Date().toISOString().split('T')[0],
          avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.name)}&background=random&size=150`
        }

        setEmployees(prev => [...prev, newEmployee])
        
        toast({
          title: "Employee added successfully",
          description: `${formData.name} has been added to your team.`,
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
              title="Employee Management"
              description="Build and manage your exceptional cleaning team"
              imageUrl="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1600&h=400&fit=crop"
              imageAlt="Professional cleaning team working together"
            >
              <Button variant="hero" size="lg" onClick={() => setIsModalOpen(true)}>
                <Plus className="h-4 w-4" />
                Add Employee
              </Button>
            </HeroSection>

            {/* Search and Filters */}
            <Card>
              <CardContent className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Search employees by name, email, or role..."
                      className="pl-10"
                      value={searchTerm}
                      onChange={handleSearch}
                    />
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button variant="outline" onClick={handleRoleFilter}>{roleFilter}</Button>
                    <Button variant="outline" onClick={handleLocationFilter}>{locationFilter}</Button>
                    <Button variant="outline" onClick={handleStatusFilter}>{statusFilter}</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Employee Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <Card>
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Calendar className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm sm:text-base text-muted-foreground">Total Employees</p>
                      <p className="text-xl sm:text-2xl font-bold">24</p>
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
                      <p className="text-sm sm:text-base text-muted-foreground">Active</p>
                      <p className="text-xl sm:text-2xl font-bold">22</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-warning/10 rounded-lg">
                      <Calendar className="h-5 w-5 text-warning" />
                    </div>
                    <div>
                      <p className="text-sm sm:text-base text-muted-foreground">On Leave</p>
                      <p className="text-xl sm:text-2xl font-bold">2</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-accent/10 rounded-lg">
                      <Calendar className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <p className="text-sm sm:text-base text-muted-foreground">New This Month</p>
                      <p className="text-xl sm:text-2xl font-bold">3</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Employee List */}
            <Tabs defaultValue="list" className="space-y-4 sm:space-y-6">
              <TabsList>
                <TabsTrigger value="list">List View</TabsTrigger>
                <TabsTrigger value="cards">Card View</TabsTrigger>
              </TabsList>

              <TabsContent value="list">
                <Card>
                  <CardHeader>
                    <CardTitle>Employee Directory</CardTitle>
                    <CardDescription>Comprehensive list of all team members</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveTable>
                  <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Employee</TableHead>
                          <TableHead>Role</TableHead>
                          <TableHead>Location</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Hire Date</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredEmployees.map((employee) => (
                          <TableRow key={employee.id}>
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <Avatar>
                                  <AvatarImage src={employee.avatar} />
                                  <AvatarFallback>{employee.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="font-medium">{employee.name}</p>
                                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Mail className="h-3 w-3" />
                                    {employee.email}
                                  </div>
                                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Phone className="h-3 w-3" />
                                    {employee.phone}
                                  </div>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant={employee.role === "Team Lead" ? "default" : "secondary"}>
                                {employee.role}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <MapPin className="h-3 w-3 text-muted-foreground" />
                                {employee.location}
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant={employee.status === "Active" ? "default" : "secondary"}>
                                {employee.status}
                              </Badge>
                            </TableCell>
                            <TableCell>{employee.hireDate}</TableCell>
                            <TableCell>
                              <div className="flex flex-col sm:flex-row gap-2">
                                <Button 
                                  variant="ghost" 
                                  size="icon"
                                  onClick={() => handleEditEmployee(employee)}
                                  disabled={isLoading}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <Button variant="ghost" size="icon" disabled={isLoading}>
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>Delete Employee</AlertDialogTitle>
                                      <AlertDialogDescription>
                                        Are you sure you want to remove {employee.name} from your team? This action cannot be undone.
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                                      <AlertDialogAction
                                        onClick={() => handleDeleteEmployee(employee.id, employee.name)}
                                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                      >
                                        {isLoading ? (
                                          <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Deleting...
                                          </>
                                        ) : (
                                          "Delete Employee"
                                        )}
                                      </AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </ResponsiveTable>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="cards">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {filteredEmployees.map((employee) => (
                    <Card key={employee.id}>
                      <CardContent className="p-4 sm:p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-12 w-12">
                              <AvatarImage src={employee.avatar} />
                              <AvatarFallback>{employee.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="font-semibold">{employee.name}</h3>
                              <Badge variant={employee.role === "Team Lead" ? "default" : "secondary"}>
                                {employee.role}
                              </Badge>
                            </div>
                          </div>
                          <Badge variant={employee.status === "Active" ? "default" : "secondary"}>
                            {employee.status}
                          </Badge>
                        </div>
                        <div className="space-y-2 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <Mail className="h-3 w-3" />
                            {employee.email}
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="h-3 w-3" />
                            {employee.phone}
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-3 w-3" />
                            {employee.location}
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-3 w-3" />
                            Hired: {employee.hireDate}
                          </div>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-2 mt-4">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="flex-1"
                            onClick={() => handleEditEmployee(employee)}
                            disabled={isLoading}
                          >
                            <Edit className="h-3 w-3 mr-2" />
                            Edit
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="outline" size="sm" disabled={isLoading}>
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Delete Employee</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to remove {employee.name} from your team? This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDeleteEmployee(employee.id, employee.name)}
                                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                >
                                  {isLoading ? (
                                    <>
                                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                      Deleting...
                                    </>
                                  ) : (
                                    "Delete Employee"
                                  )}
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Add Employee Modal */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="w-[calc(100vw-2rem)] sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{isEditMode ? "Edit Employee" : "Add New Employee"}</DialogTitle>
              <DialogDescription>
                {isEditMode 
                  ? "Update the information for this team member." 
                  : "Add a new team member to your cleaning company."
                }
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAddEmployee}>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    disabled={isLoading}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john.doe@cleanpro.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    disabled={isLoading}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="(555) 123-4567"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    disabled={isLoading}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="role">Role</Label>
                  <Select 
                    value={formData.role} 
                    onValueChange={(value) => handleSelectChange("role", value)}
                    disabled={isLoading}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Cleaner">Cleaner</SelectItem>
                      <SelectItem value="Team Lead">Team Lead</SelectItem>
                      <SelectItem value="Supervisor">Supervisor</SelectItem>
                      <SelectItem value="Manager">Manager</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="location">Location</Label>
                  <Select 
                    value={formData.location} 
                    onValueChange={(value) => handleSelectChange("location", value)}
                    disabled={isLoading}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Downtown">Downtown</SelectItem>
                      <SelectItem value="Uptown">Uptown</SelectItem>
                      <SelectItem value="Midtown">Midtown</SelectItem>
                      <SelectItem value="Suburbs">Suburbs</SelectItem>
                    </SelectContent>
                  </Select>
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
                      {isEditMode ? "Updating..." : "Saving..."}
                    </>
                  ) : (
                    isEditMode ? "Update Employee" : "Save Employee"
                  )}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </Layout>
  )
}