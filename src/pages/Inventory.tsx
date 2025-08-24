import { Header } from "@/components/layout/header"
import { Sidebar } from "@/components/layout/sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Search, Plus, Edit, Trash2, Package, AlertTriangle, TrendingUp, TrendingDown } from "lucide-react"

const inventory = [
  {
    id: 1,
    name: "All-Purpose Cleaner",
    category: "Cleaning Supplies",
    currentStock: 24,
    minStock: 10,
    maxStock: 50,
    unit: "bottles",
    costPerUnit: 8.50,
    supplier: "CleanCorp Inc",
    lastRestocked: "2024-01-10",
    status: "In Stock"
  },
  {
    id: 2,
    name: "Microfiber Cloths",
    category: "Equipment",
    currentStock: 5,
    minStock: 15,
    maxStock: 100,
    unit: "packs",
    costPerUnit: 12.99,
    supplier: "Supply Plus",
    lastRestocked: "2024-01-05",
    status: "Low Stock"
  },
  {
    id: 3,
    name: "Vacuum Cleaner Bags",
    category: "Equipment",
    currentStock: 0,
    minStock: 20,
    maxStock: 100,
    unit: "boxes",
    costPerUnit: 15.75,
    supplier: "Equipment World",
    lastRestocked: "2023-12-28",
    status: "Out of Stock"
  },
  {
    id: 4,
    name: "Disinfectant Spray",
    category: "Cleaning Supplies",
    currentStock: 45,
    minStock: 20,
    maxStock: 60,
    unit: "bottles",
    costPerUnit: 6.25,
    supplier: "CleanCorp Inc",
    lastRestocked: "2024-01-12",
    status: "In Stock"
  }
]

const getStockPercentage = (current: number, max: number) => (current / max) * 100
const getStockStatus = (current: number, min: number) => {
  if (current === 0) return "Out of Stock"
  if (current <= min) return "Low Stock"
  return "In Stock"
}

export default function Inventory() {
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
                <h1 className="text-3xl font-bold font-heading">Inventory Management</h1>
                <p className="text-muted-foreground">Track supplies, equipment, and stock levels</p>
              </div>
              <Button variant="hero" size="lg">
                <Plus className="h-4 w-4" />
                Add Item
              </Button>
            </div>

            {/* Search and Filters */}
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Search inventory by name, category, or supplier..."
                      className="pl-10"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline">All Categories</Button>
                    <Button variant="outline">All Status</Button>
                    <Button variant="outline">All Suppliers</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Inventory Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Package className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Total Items</p>
                      <p className="text-2xl font-bold">84</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-destructive/10 rounded-lg">
                      <AlertTriangle className="h-5 w-5 text-destructive" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Low Stock</p>
                      <p className="text-2xl font-bold">12</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-warning/10 rounded-lg">
                      <TrendingDown className="h-5 w-5 text-warning" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Out of Stock</p>
                      <p className="text-2xl font-bold">3</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-success/10 rounded-lg">
                      <TrendingUp className="h-5 w-5 text-success" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Total Value</p>
                      <p className="text-2xl font-bold">$8,450</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Inventory List */}
            <Tabs defaultValue="list" className="space-y-6">
              <TabsList>
                <TabsTrigger value="list">List View</TabsTrigger>
                <TabsTrigger value="cards">Card View</TabsTrigger>
                <TabsTrigger value="alerts">Stock Alerts</TabsTrigger>
              </TabsList>

              <TabsContent value="list">
                <Card>
                  <CardHeader>
                    <CardTitle>Inventory Items</CardTitle>
                    <CardDescription>Complete list of all inventory items</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Item</TableHead>
                          <TableHead>Category</TableHead>
                          <TableHead>Stock Level</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Cost/Unit</TableHead>
                          <TableHead>Supplier</TableHead>
                          <TableHead>Last Restocked</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {inventory.map((item) => (
                          <TableRow key={item.id}>
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <div className="p-2 bg-primary/10 rounded-lg">
                                  <Package className="h-4 w-4 text-primary" />
                                </div>
                                <div>
                                  <p className="font-medium">{item.name}</p>
                                  <p className="text-sm text-muted-foreground">{item.unit}</p>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline">{item.category}</Badge>
                            </TableCell>
                            <TableCell>
                              <div className="space-y-2">
                                <div className="flex items-center justify-between text-sm">
                                  <span>{item.currentStock}/{item.maxStock}</span>
                                  <span className="text-muted-foreground">
                                    {Math.round(getStockPercentage(item.currentStock, item.maxStock))}%
                                  </span>
                                </div>
                                <Progress
                                  value={getStockPercentage(item.currentStock, item.maxStock)}
                                  className="h-2"
                                />
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge 
                                variant={
                                  item.status === "Out of Stock" ? "destructive" : 
                                  item.status === "Low Stock" ? "secondary" : "default"
                                }
                              >
                                {item.status}
                              </Badge>
                            </TableCell>
                            <TableCell>${item.costPerUnit}</TableCell>
                            <TableCell>{item.supplier}</TableCell>
                            <TableCell>{item.lastRestocked}</TableCell>
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
                  {inventory.map((item) => (
                    <Card key={item.id}>
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-primary/10 rounded-lg">
                              <Package className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <h3 className="font-semibold">{item.name}</h3>
                              <Badge variant="outline" className="mt-1">{item.category}</Badge>
                            </div>
                          </div>
                          <Badge 
                            variant={
                              item.status === "Out of Stock" ? "destructive" : 
                              item.status === "Low Stock" ? "secondary" : "default"
                            }
                          >
                            {item.status}
                          </Badge>
                        </div>
                        
                        <div className="space-y-3">
                          <div>
                            <div className="flex items-center justify-between text-sm mb-1">
                              <span>Stock Level</span>
                              <span>{item.currentStock}/{item.maxStock} {item.unit}</span>
                            </div>
                            <Progress
                              value={getStockPercentage(item.currentStock, item.maxStock)}
                              className="h-2"
                            />
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <p className="text-muted-foreground">Cost/Unit</p>
                              <p className="font-medium">${item.costPerUnit}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Min Stock</p>
                              <p className="font-medium">{item.minStock} {item.unit}</p>
                            </div>
                          </div>
                          
                          <div className="text-sm">
                            <p className="text-muted-foreground">Supplier</p>
                            <p className="font-medium">{item.supplier}</p>
                          </div>
                          
                          <div className="text-sm">
                            <p className="text-muted-foreground">Last Restocked</p>
                            <p className="font-medium">{item.lastRestocked}</p>
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

              <TabsContent value="alerts">
                <div className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5 text-destructive" />
                        Critical Stock Alerts
                      </CardTitle>
                      <CardDescription>Items requiring immediate attention</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {inventory.filter(item => item.currentStock <= item.minStock).map((item) => (
                          <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                            <div className="flex items-center gap-3">
                              <div className="p-2 bg-destructive/10 rounded-lg">
                                <Package className="h-4 w-4 text-destructive" />
                              </div>
                              <div>
                                <p className="font-medium">{item.name}</p>
                                <p className="text-sm text-muted-foreground">
                                  Current: {item.currentStock} {item.unit} | Min: {item.minStock} {item.unit}
                                </p>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">Reorder</Button>
                              <Button variant="outline" size="sm">Edit</Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}