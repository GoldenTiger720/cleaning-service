import { useState, useEffect } from "react"
import * as React from "react"
import { Layout } from "@/components/layout/layout"
import { Button } from "@/components/ui/button"
import { HeroSection } from "@/components/ui/hero-section"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Search, Plus, Edit, Trash2, Phone, Mail, MapPin, Calendar, Building, Home, Loader2 } from "lucide-react"

const initialCustomers = [
  {
    id: 1,
    name: "ABC Corporation",
    type: "Commercial",
    contact: "John Smith",
    email: "john.smith@abccorp.com",
    phone: "(555) 123-4567",
    address: "123 Business Ave, Downtown",
    status: "Active",
    nextService: "2024-01-15",
    totalServices: 24,
    avatar: "/placeholder.svg"
  },
  {
    id: 2,
    name: "The Johnson Family",
    type: "Residential",
    contact: "Sarah Johnson",
    email: "sarah.j@email.com",
    phone: "(555) 234-5678",
    address: "456 Oak Street, Suburbia",
    status: "Active",
    nextService: "2024-01-16",
    totalServices: 12,
    avatar: "/placeholder.svg"
  },
  {
    id: 3,
    name: "Metro Office Complex",
    type: "Commercial",
    contact: "Mike Rodriguez",
    email: "facilities@metrooffice.com",
    phone: "(555) 345-6789",
    address: "789 Metro Blvd, Business District",
    status: "Pending",
    nextService: "2024-01-18",
    totalServices: 6,
    avatar: "/placeholder.svg"
  }
]

export default function Customers() {
  const [customers, setCustomers] = useState(initialCustomers)
  const [filteredCustomers, setFilteredCustomers] = useState(initialCustomers)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [editingCustomer, setEditingCustomer] = useState<typeof initialCustomers[0] | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState("All Types")
  const [statusFilter, setStatusFilter] = useState("All Status")
  const [locationFilter, setLocationFilter] = useState("All Locations")
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    contact: "",
    email: "",
    phone: "",
    address: "",
    status: "Active"
  })
  const { toast } = useToast()

  // Filter customers based on search and filter criteria
  const filterCustomers = () => {
    let filtered = customers.filter(customer => {
      const matchesSearch = searchTerm === "" || 
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.address.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesType = typeFilter === "All Types" || customer.type === typeFilter
      const matchesStatus = statusFilter === "All Status" || customer.status === statusFilter
      const matchesLocation = locationFilter === "All Locations" || customer.address.toLowerCase().includes(locationFilter.toLowerCase())

      return matchesSearch && matchesType && matchesStatus && matchesLocation
    })
    setFilteredCustomers(filtered)
  }

  // Apply filters whenever search term or filters change
  React.useEffect(() => {
    filterCustomers()
  }, [searchTerm, typeFilter, statusFilter, locationFilter, customers])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const handleTypeFilter = () => {
    const types = ["All Types", "Residential", "Commercial"]
    const currentIndex = types.indexOf(typeFilter)
    const nextIndex = (currentIndex + 1) % types.length
    setTypeFilter(types[nextIndex])
    
    toast({
      title: "Filter updated",
      description: `Filtering by: ${types[nextIndex]}`,
    })
  }

  const handleStatusFilter = () => {
    const statuses = ["All Status", "Active", "Pending", "Inactive"]
    const currentIndex = statuses.indexOf(statusFilter)
    const nextIndex = (currentIndex + 1) % statuses.length
    setStatusFilter(statuses[nextIndex])
    
    toast({
      title: "Filter updated",
      description: `Filtering by: ${statuses[nextIndex]}`,
    })
  }

  const handleLocationFilter = () => {
    const locations = ["All Locations", "Downtown", "Suburbia", "Business District"]
    const currentIndex = locations.indexOf(locationFilter)
    const nextIndex = (currentIndex + 1) % locations.length
    setLocationFilter(locations[nextIndex])
    
    toast({
      title: "Filter updated",
      description: `Filtering by: ${locations[nextIndex]}`,
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

  const handleEditCustomer = (customer: typeof initialCustomers[0]) => {
    setIsEditMode(true)
    setEditingCustomer(customer)
    setFormData({
      name: customer.name,
      type: customer.type,
      contact: customer.contact,
      email: customer.email,
      phone: customer.phone,
      address: customer.address,
      status: customer.status,
    })
    setIsModalOpen(true)
  }

  const handleDeleteCustomer = async (customerId: number, customerName: string) => {
    setIsLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      setCustomers(prev => prev.filter(customer => customer.id !== customerId))
      setIsLoading(false)
      
      toast({
        title: "Customer removed",
        description: `${customerName} has been removed from your customer list.`,
        variant: "destructive",
      })
    }, 1000)
  }

  const resetForm = () => {
    setFormData({
      name: "",
      type: "",
      contact: "",
      email: "",
      phone: "",
      address: "",
      status: "Active"
    })
    setIsEditMode(false)
    setEditingCustomer(null)
  }

  const handleAddCustomer = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      if (isEditMode && editingCustomer) {
        // Update existing customer
        setCustomers(prev => prev.map(customer => 
          customer.id === editingCustomer.id 
            ? {
                ...customer,
                name: formData.name,
                type: formData.type as "Residential" | "Commercial",
                contact: formData.contact,
                email: formData.email,
                phone: formData.phone,
                address: formData.address,
                status: formData.status as "Active" | "Pending" | "Inactive",
              }
            : customer
        ))
        
        toast({
          title: "Customer updated successfully",
          description: `${formData.name}'s information has been updated.`,
        })
      } else {
        // Add new customer
        const newCustomer = {
          id: Math.max(...customers.map(c => c.id)) + 1,
          name: formData.name,
          type: formData.type as "Residential" | "Commercial",
          contact: formData.contact,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          status: formData.status as "Active" | "Pending" | "Inactive",
          nextService: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 7 days from now
          totalServices: 0,
          avatar: "/placeholder.svg"
        }

        setCustomers(prev => [...prev, newCustomer])
        
        toast({
          title: "Customer added successfully",
          description: `${formData.name} has been added to your customer list.`,
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
      <div className="p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Hero Section */}
            <HeroSection
              title="Customer Management"
              description="Manage your residential and commercial clients with ease. Track contact information, service history, and build lasting relationships."
              imageUrl="https://images.unsplash.com/photo-1556740758-90de374c12ad?w=1600&h=400&fit=crop"
              imageAlt="Business meeting handshake"
            >
              <Button variant="hero" size="lg" onClick={() => setIsModalOpen(true)}>
                <Plus className="h-4 w-4" />
                Add Customer
              </Button>
            </HeroSection>

            {/* Search and Filters */}
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Search customers by name, contact, or address..."
                      className="pl-10"
                      value={searchTerm}
                      onChange={handleSearch}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={handleTypeFilter}>{typeFilter}</Button>
                    <Button variant="outline" onClick={handleStatusFilter}>{statusFilter}</Button>
                    <Button variant="outline" onClick={handleLocationFilter}>{locationFilter}</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Customer Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Building className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Total Customers</p>
                      <p className="text-2xl font-bold">156</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-success/10 rounded-lg">
                      <Home className="h-5 w-5 text-success" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Residential</p>
                      <p className="text-2xl font-bold">98</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-accent/10 rounded-lg">
                      <Building className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Commercial</p>
                      <p className="text-2xl font-bold">58</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-warning/10 rounded-lg">
                      <Calendar className="h-5 w-5 text-warning" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">New This Month</p>
                      <p className="text-2xl font-bold">12</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Customer List */}
            <Tabs defaultValue="list" className="space-y-6">
              <TabsList>
                <TabsTrigger value="list">List View</TabsTrigger>
                <TabsTrigger value="cards">Card View</TabsTrigger>
              </TabsList>

              <TabsContent value="list">
                <Card>
                  <CardHeader>
                    <CardTitle>Customer Directory</CardTitle>
                    <CardDescription>Complete list of all clients</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Customer</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Contact</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Next Service</TableHead>
                          <TableHead>Total Services</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredCustomers.map((customer) => (
                          <TableRow key={customer.id}>
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <Avatar>
                                  <AvatarImage src={customer.avatar} />
                                  <AvatarFallback>
                                    {customer.type === "Commercial" ? <Building className="h-4 w-4" /> : <Home className="h-4 w-4" />}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="font-medium">{customer.name}</p>
                                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <MapPin className="h-3 w-3" />
                                    {customer.address}
                                  </div>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant={customer.type === "Commercial" ? "default" : "secondary"}>
                                {customer.type}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div>
                                <p className="font-medium">{customer.contact}</p>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                  <Mail className="h-3 w-3" />
                                  {customer.email}
                                </div>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                  <Phone className="h-3 w-3" />
                                  {customer.phone}
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant={customer.status === "Active" ? "default" : "secondary"}>
                                {customer.status}
                              </Badge>
                            </TableCell>
                            <TableCell>{customer.nextService}</TableCell>
                            <TableCell>{customer.totalServices}</TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                <Button 
                                  variant="ghost" 
                                  size="icon"
                                  onClick={() => handleEditCustomer(customer)}
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
                                      <AlertDialogTitle>Delete Customer</AlertDialogTitle>
                                      <AlertDialogDescription>
                                        Are you sure you want to remove {customer.name} from your customer list? This action cannot be undone.
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                                      <AlertDialogAction
                                        onClick={() => handleDeleteCustomer(customer.id, customer.name)}
                                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                      >
                                        {isLoading ? (
                                          <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Deleting...
                                          </>
                                        ) : (
                                          "Delete Customer"
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
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="cards">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredCustomers.map((customer) => (
                    <Card key={customer.id}>
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-12 w-12">
                              <AvatarImage src={customer.avatar} />
                              <AvatarFallback>
                                {customer.type === "Commercial" ? <Building className="h-6 w-6" /> : <Home className="h-6 w-6" />}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="font-semibold">{customer.name}</h3>
                              <Badge variant={customer.type === "Commercial" ? "default" : "secondary"}>
                                {customer.type}
                              </Badge>
                            </div>
                          </div>
                          <Badge variant={customer.status === "Active" ? "default" : "secondary"}>
                            {customer.status}
                          </Badge>
                        </div>
                        <div className="space-y-2 text-sm text-muted-foreground">
                          <div>
                            <p className="font-medium text-foreground">{customer.contact}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Mail className="h-3 w-3" />
                            {customer.email}
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="h-3 w-3" />
                            {customer.phone}
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-3 w-3" />
                            {customer.address}
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-3 w-3" />
                            Next: {customer.nextService}
                          </div>
                          <div className="flex items-center gap-2">
                            <span>Total Services: {customer.totalServices}</span>
                          </div>
                        </div>
                        <div className="flex gap-2 mt-4">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="flex-1"
                            onClick={() => handleEditCustomer(customer)}
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
                                <AlertDialogTitle>Delete Customer</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to remove {customer.name} from your customer list? This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDeleteCustomer(customer.id, customer.name)}
                                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                >
                                  {isLoading ? (
                                    <>
                                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                      Deleting...
                                    </>
                                  ) : (
                                    "Delete Customer"
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

        {/* Add/Edit Customer Modal */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>{isEditMode ? "Edit Customer" : "Add New Customer"}</DialogTitle>
              <DialogDescription>
                {isEditMode 
                  ? "Update the information for this customer." 
                  : "Add a new client to your customer database."
                }
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAddCustomer}>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Customer Name</Label>
                  <Input
                    id="name"
                    placeholder="ABC Corporation or John Doe"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    disabled={isLoading}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="type">Customer Type</Label>
                  <Select 
                    value={formData.type} 
                    onValueChange={(value) => handleSelectChange("type", value)}
                    disabled={isLoading}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select customer type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Residential">Residential</SelectItem>
                      <SelectItem value="Commercial">Commercial</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="contact">Contact Person</Label>
                  <Input
                    id="contact"
                    placeholder="John Smith"
                    value={formData.contact}
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
                    placeholder="contact@example.com"
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
                  <Label htmlFor="address">Address</Label>
                  <Textarea
                    id="address"
                    placeholder="123 Main Street, City, State"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    disabled={isLoading}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="status">Status</Label>
                  <Select 
                    value={formData.status} 
                    onValueChange={(value) => handleSelectChange("status", value)}
                    disabled={isLoading}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Pending">Pending</SelectItem>
                      <SelectItem value="Inactive">Inactive</SelectItem>
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
                    isEditMode ? "Update Customer" : "Save Customer"
                  )}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
    </Layout>
  )
}