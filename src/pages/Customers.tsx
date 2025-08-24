import { Header } from "@/components/layout/header"
import { Sidebar } from "@/components/layout/sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Plus, Edit, Trash2, Phone, Mail, MapPin, Calendar, Building, Home } from "lucide-react"

const customers = [
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
                <h1 className="text-3xl font-bold font-heading">Customer Management</h1>
                <p className="text-muted-foreground">Manage residential and commercial clients</p>
              </div>
              <Button variant="hero" size="lg">
                <Plus className="h-4 w-4" />
                Add Customer
              </Button>
            </div>

            {/* Search and Filters */}
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Search customers by name, contact, or address..."
                      className="pl-10"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline">All Types</Button>
                    <Button variant="outline">All Status</Button>
                    <Button variant="outline">All Locations</Button>
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
                        {customers.map((customer) => (
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
                                <Button variant="ghost" size="icon">
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
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
                  {customers.map((customer) => (
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
                          <Button variant="outline" size="sm" className="flex-1">
                            <Edit className="h-3 w-3" />
                            Edit
                          </Button>
                          <Button variant="outline" size="sm">
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}