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
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Search, Plus, Edit, Trash2, Package, AlertTriangle, TrendingUp, TrendingDown, Loader2, ShoppingCart } from "lucide-react"

const initialInventory = [
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
  const [inventory, setInventory] = useState(initialInventory)
  const [filteredInventory, setFilteredInventory] = useState(initialInventory)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [editingItem, setEditingItem] = useState<typeof initialInventory[0] | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("All Categories")
  const [statusFilter, setStatusFilter] = useState("All Status")
  const [supplierFilter, setSupplierFilter] = useState("All Suppliers")
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    currentStock: "",
    minStock: "",
    maxStock: "",
    unit: "",
    costPerUnit: "",
    supplier: ""
  })
  const { toast } = useToast()

  // Filter inventory
  const filterInventory = () => {
    let filtered = inventory.filter(item => {
      const matchesSearch = searchTerm === "" || 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.supplier.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesCategory = categoryFilter === "All Categories" || item.category === categoryFilter
      const matchesStatus = statusFilter === "All Status" || item.status === statusFilter
      const matchesSupplier = supplierFilter === "All Suppliers" || item.supplier === supplierFilter

      return matchesSearch && matchesCategory && matchesStatus && matchesSupplier
    })
    setFilteredInventory(filtered)
  }

  React.useEffect(() => {
    filterInventory()
  }, [searchTerm, categoryFilter, statusFilter, supplierFilter, inventory])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const handleCategoryFilter = () => {
    const categories = ["All Categories", "Cleaning Supplies", "Equipment"]
    const currentIndex = categories.indexOf(categoryFilter)
    const nextIndex = (currentIndex + 1) % categories.length
    setCategoryFilter(categories[nextIndex])
    toast({ title: "Filter updated", description: `Filtering by category: ${categories[nextIndex]}` })
  }

  const handleStatusFilter = () => {
    const statuses = ["All Status", "In Stock", "Low Stock", "Out of Stock"]
    const currentIndex = statuses.indexOf(statusFilter)
    const nextIndex = (currentIndex + 1) % statuses.length
    setStatusFilter(statuses[nextIndex])
    toast({ title: "Filter updated", description: `Filtering by status: ${statuses[nextIndex]}` })
  }

  const handleSupplierFilter = () => {
    const suppliers = ["All Suppliers", "CleanCorp Inc", "Supply Plus", "Equipment World"]
    const currentIndex = suppliers.indexOf(supplierFilter)
    const nextIndex = (currentIndex + 1) % suppliers.length
    setSupplierFilter(suppliers[nextIndex])
    toast({ title: "Filter updated", description: `Filtering by supplier: ${suppliers[nextIndex]}` })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.id]: e.target.value }))
  }

  const handleSelectChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleEditItem = (item: typeof initialInventory[0]) => {
    setIsEditMode(true)
    setEditingItem(item)
    setFormData({
      name: item.name,
      category: item.category,
      currentStock: item.currentStock.toString(),
      minStock: item.minStock.toString(),
      maxStock: item.maxStock.toString(),
      unit: item.unit,
      costPerUnit: item.costPerUnit.toString(),
      supplier: item.supplier
    })
    setIsModalOpen(true)
  }

  const handleDeleteItem = async (itemId: number, itemName: string) => {
    setIsLoading(true)
    setTimeout(() => {
      setInventory(prev => prev.filter(item => item.id !== itemId))
      setIsLoading(false)
      toast({ title: "Item removed", description: `${itemName} has been removed from inventory.`, variant: "destructive" })
    }, 1000)
  }

  const handleReorderItem = (item: typeof initialInventory[0]) => {
    toast({
      title: "Reorder Initiated",
      description: `Reorder request sent for ${item.name}. Expected delivery in 3-5 business days.`,
    })
  }

  const resetForm = () => {
    setFormData({ name: "", category: "", currentStock: "", minStock: "", maxStock: "", unit: "", costPerUnit: "", supplier: "" })
    setIsEditMode(false)
    setEditingItem(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    setTimeout(() => {
      if (isEditMode && editingItem) {
        setInventory(prev => prev.map(item => 
          item.id === editingItem.id 
            ? {
                ...item,
                name: formData.name,
                category: formData.category,
                currentStock: parseInt(formData.currentStock),
                minStock: parseInt(formData.minStock),
                maxStock: parseInt(formData.maxStock),
                unit: formData.unit,
                costPerUnit: parseFloat(formData.costPerUnit),
                supplier: formData.supplier,
                status: getStockStatus(parseInt(formData.currentStock), parseInt(formData.minStock))
              }
            : item
        ))
        toast({ title: "Item updated successfully", description: `${formData.name} has been updated.` })
      } else {
        const newItem = {
          id: Math.max(...inventory.map(i => i.id)) + 1,
          name: formData.name,
          category: formData.category,
          currentStock: parseInt(formData.currentStock),
          minStock: parseInt(formData.minStock),
          maxStock: parseInt(formData.maxStock),
          unit: formData.unit,
          costPerUnit: parseFloat(formData.costPerUnit),
          supplier: formData.supplier,
          lastRestocked: new Date().toISOString().split('T')[0],
          status: getStockStatus(parseInt(formData.currentStock), parseInt(formData.minStock))
        }
        setInventory(prev => [...prev, newItem])
        toast({ title: "Item added successfully", description: `${formData.name} has been added to inventory.` })
      }
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
              title="Inventory Management"
              description="Track your cleaning supplies, equipment, and stock levels. Never run out of essentials and maintain optimal inventory levels."
              imageUrl="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&h=400&fit=crop"
              imageAlt="Cleaning supplies"
            >
              <Button variant="hero" size="lg" onClick={() => setIsModalOpen(true)}>
                <Plus className="h-4 w-4" />
                Add Item
              </Button>
            </HeroSection>

            {/* Search and Filters */}
            <Card>
              <CardContent className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Search inventory by name, category, or supplier..."
                      className="pl-10"
                      value={searchTerm}
                      onChange={handleSearch}
                    />
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button variant="outline" onClick={handleCategoryFilter}>{categoryFilter}</Button>
                    <Button variant="outline" onClick={handleStatusFilter}>{statusFilter}</Button>
                    <Button variant="outline" onClick={handleSupplierFilter}>{supplierFilter}</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Inventory Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <Card>
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Package className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm sm:text-base text-muted-foreground">Total Items</p>
                      <p className="text-xl sm:text-2xl font-bold">84</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-destructive/10 rounded-lg">
                      <AlertTriangle className="h-5 w-5 text-destructive" />
                    </div>
                    <div>
                      <p className="text-sm sm:text-base text-muted-foreground">Low Stock</p>
                      <p className="text-xl sm:text-2xl font-bold">12</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-warning/10 rounded-lg">
                      <TrendingDown className="h-5 w-5 text-warning" />
                    </div>
                    <div>
                      <p className="text-sm sm:text-base text-muted-foreground">Out of Stock</p>
                      <p className="text-xl sm:text-2xl font-bold">3</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-success/10 rounded-lg">
                      <TrendingUp className="h-5 w-5 text-success" />
                    </div>
                    <div>
                      <p className="text-sm sm:text-base text-muted-foreground">Total Value</p>
                      <p className="text-xl sm:text-2xl font-bold">$8,450</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Inventory List */}
            <Tabs defaultValue="list" className="space-y-4 sm:space-y-6">
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
                    <ResponsiveTable>
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
                        {filteredInventory.map((item) => (
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
                                <Button variant="ghost" size="icon" onClick={() => handleEditItem(item)} disabled={isLoading}>
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
                                      <AlertDialogTitle>Delete Item</AlertDialogTitle>
                                      <AlertDialogDescription>
                                        Are you sure you want to remove {item.name} from inventory? This action cannot be undone.
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                                      <AlertDialogAction onClick={() => handleDeleteItem(item.id, item.name)} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                                        {isLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Deleting...</> : "Delete Item"}
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
                  {filteredInventory.map((item) => (
                    <Card key={item.id}>
                      <CardContent className="p-4 sm:p-6">
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
                          <Button variant="outline" size="sm" className="flex-1" onClick={() => handleEditItem(item)} disabled={isLoading}>
                            <Edit className="h-3 w-3 mr-2" />Edit
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="outline" size="sm" disabled={isLoading}>
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Delete Item</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to remove {item.name} from inventory?
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleDeleteItem(item.id, item.name)} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                                  Delete Item
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
                              <Button variant="outline" size="sm" onClick={() => handleReorderItem(item)} disabled={isLoading}>
                                <ShoppingCart className="h-3 w-3 mr-1" />Reorder
                              </Button>
                              <Button variant="outline" size="sm" onClick={() => handleEditItem(item)} disabled={isLoading}>
                                <Edit className="h-3 w-3 mr-1" />Edit
                              </Button>
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
      </div>

        {/* Add/Edit Item Modal */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="w-[calc(100vw-2rem)] sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>{isEditMode ? "Edit Inventory Item" : "Add New Item"}</DialogTitle>
              <DialogDescription>
                {isEditMode ? "Update the inventory item details." : "Add a new item to your inventory."}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-3 sm:gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Item Name</Label>
                  <Input id="name" placeholder="All-Purpose Cleaner" value={formData.name} onChange={handleInputChange} required disabled={isLoading} />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="category">Category</Label>
                    <Select value={formData.category} onValueChange={(value) => handleSelectChange("category", value)} disabled={isLoading}>
                      <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Cleaning Supplies">Cleaning Supplies</SelectItem>
                        <SelectItem value="Equipment">Equipment</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="unit">Unit</Label>
                    <Input id="unit" placeholder="bottles, packs, boxes" value={formData.unit} onChange={handleInputChange} required disabled={isLoading} />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="currentStock">Current Stock</Label>
                    <Input id="currentStock" type="number" value={formData.currentStock} onChange={handleInputChange} required disabled={isLoading} />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="minStock">Min Stock</Label>
                    <Input id="minStock" type="number" value={formData.minStock} onChange={handleInputChange} required disabled={isLoading} />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="maxStock">Max Stock</Label>
                    <Input id="maxStock" type="number" value={formData.maxStock} onChange={handleInputChange} required disabled={isLoading} />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="costPerUnit">Cost Per Unit ($)</Label>
                    <Input id="costPerUnit" type="number" step="0.01" value={formData.costPerUnit} onChange={handleInputChange} required disabled={isLoading} />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="supplier">Supplier</Label>
                    <Select value={formData.supplier} onValueChange={(value) => handleSelectChange("supplier", value)} disabled={isLoading}>
                      <SelectTrigger><SelectValue placeholder="Select supplier" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="CleanCorp Inc">CleanCorp Inc</SelectItem>
                        <SelectItem value="Supply Plus">Supply Plus</SelectItem>
                        <SelectItem value="Equipment World">Equipment World</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => { setIsModalOpen(false); resetForm() }} disabled={isLoading}>Cancel</Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />{isEditMode ? "Updating..." : "Adding..."}</> : (isEditMode ? "Update Item" : "Add Item")}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
    </Layout>
  )
}