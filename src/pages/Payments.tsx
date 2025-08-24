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
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Search, Plus, Download, Filter, DollarSign, CreditCard, Clock, TrendingUp, Loader2, FileText, Send, Mail, Phone } from "lucide-react"

const initialPayments = [
  {
    id: 1,
    customer: "ABC Corporation",
    amount: 850.00,
    status: "Paid",
    method: "Credit Card",
    date: "2024-01-15",
    invoiceId: "INV-001",
    dueDate: "2024-01-15",
    service: "Office Cleaning - January"
  },
  {
    id: 2,
    customer: "The Johnson Family",
    amount: 120.00,
    status: "Pending",
    method: "Bank Transfer",
    date: "2024-01-14",
    invoiceId: "INV-002",
    dueDate: "2024-01-20",
    service: "House Cleaning - Weekly"
  },
  {
    id: 3,
    customer: "Metro Office Complex",
    amount: 1200.00,
    status: "Overdue",
    method: "Check",
    date: "2024-01-10",
    invoiceId: "INV-003",
    dueDate: "2024-01-12",
    service: "Commercial Cleaning - Monthly"
  },
  {
    id: 4,
    customer: "Green Valley Apartments",
    amount: 650.00,
    status: "Paid",
    method: "ACH",
    date: "2024-01-13",
    invoiceId: "INV-004",
    dueDate: "2024-01-13",
    service: "Apartment Cleaning - Bi-weekly"
  }
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "Paid": return "default"
    case "Pending": return "secondary"
    case "Overdue": return "destructive"
    default: return "secondary"
  }
}

export default function Payments() {
  const [payments, setPayments] = useState(initialPayments)
  const [filteredPayments, setFilteredPayments] = useState(initialPayments)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("All Status")
  const [methodFilter, setMethodFilter] = useState("All Methods")
  const [periodFilter, setPeriodFilter] = useState("This Month")
  const [formData, setFormData] = useState({
    customer: "",
    amount: "",
    method: "",
    invoiceId: "",
    service: ""
  })
  const { toast } = useToast()

  // Filter payments
  const filterPayments = () => {
    let filtered = payments.filter(payment => {
      const matchesSearch = searchTerm === "" || 
        payment.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.invoiceId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.amount.toString().includes(searchTerm)
      
      const matchesStatus = statusFilter === "All Status" || payment.status === statusFilter
      const matchesMethod = methodFilter === "All Methods" || payment.method === methodFilter

      return matchesSearch && matchesStatus && matchesMethod
    })
    setFilteredPayments(filtered)
  }

  React.useEffect(() => {
    filterPayments()
  }, [searchTerm, statusFilter, methodFilter, periodFilter, payments])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const handleStatusFilter = () => {
    const statuses = ["All Status", "Paid", "Pending", "Overdue"]
    const currentIndex = statuses.indexOf(statusFilter)
    const nextIndex = (currentIndex + 1) % statuses.length
    setStatusFilter(statuses[nextIndex])
    toast({ title: "Filter updated", description: `Filtering by status: ${statuses[nextIndex]}` })
  }

  const handleMethodFilter = () => {
    const methods = ["All Methods", "Credit Card", "Bank Transfer", "Check", "ACH", "Cash"]
    const currentIndex = methods.indexOf(methodFilter)
    const nextIndex = (currentIndex + 1) % methods.length
    setMethodFilter(methods[nextIndex])
    toast({ title: "Filter updated", description: `Filtering by method: ${methods[nextIndex]}` })
  }

  const handlePeriodFilter = () => {
    const periods = ["This Month", "Last Month", "This Quarter", "This Year"]
    const currentIndex = periods.indexOf(periodFilter)
    const nextIndex = (currentIndex + 1) % periods.length
    setPeriodFilter(periods[nextIndex])
    toast({ title: "Filter updated", description: `Filtering by period: ${periods[nextIndex]}` })
  }

  const handleExport = () => {
    const csvContent = "data:text/csv;charset=utf-8," + 
      "Customer,Service,Amount,Status,Method,Invoice,Due Date,Paid Date\n" +
      payments.map(p => `${p.customer},${p.service},${p.amount},${p.status},${p.method},${p.invoiceId},${p.dueDate},${p.status === 'Paid' ? p.date : ''}`).join("\n")
    
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute("download", `payments_${new Date().toISOString().split('T')[0]}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    
    toast({ title: "Export completed", description: "Payment data has been exported to CSV file." })
  }

  const handleRecordPayment = async (paymentId: number, customerName: string) => {
    setIsLoading(true)
    setTimeout(() => {
      setPayments(prev => prev.map(payment => 
        payment.id === paymentId 
          ? { ...payment, status: "Paid" as const, date: new Date().toISOString().split('T')[0] }
          : payment
      ))
      setIsLoading(false)
      toast({ title: "Payment recorded", description: `Payment from ${customerName} has been marked as paid.` })
    }, 1000)
  }

  const handleSendReminder = (customerName: string) => {
    toast({ title: "Reminder sent", description: `Payment reminder has been sent to ${customerName}.` })
  }

  const handleContactCustomer = (customerName: string) => {
    toast({ title: "Contact initiated", description: `Opening contact options for ${customerName}.` })
  }

  const handleViewPayment = (paymentId: number) => {
    const payment = payments.find(p => p.id === paymentId)
    toast({ title: "Viewing payment", description: `Opening details for ${payment?.invoiceId || 'payment'}.` })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.id]: e.target.value }))
  }

  const handleSelectChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const resetForm = () => {
    setFormData({ customer: "", amount: "", method: "", invoiceId: "", service: "" })
  }

  const handleAddPayment = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    setTimeout(() => {
      const newPayment = {
        id: Math.max(...payments.map(p => p.id)) + 1,
        customer: formData.customer,
        amount: parseFloat(formData.amount),
        status: "Paid" as const,
        method: formData.method,
        date: new Date().toISOString().split('T')[0],
        invoiceId: formData.invoiceId || `INV-${String(Math.max(...payments.map(p => p.id)) + 1).padStart(3, '0')}`,
        dueDate: new Date().toISOString().split('T')[0],
        service: formData.service
      }

      setPayments(prev => [...prev, newPayment])
      toast({ title: "Payment recorded successfully", description: `Payment from ${formData.customer} has been added.` })
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
              title="Payment Management"
              description="Track payments, invoices, and financial transactions. Stay on top of your cash flow and ensure timely payments."
              imageUrl="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1600&h=400&fit=crop"
              imageAlt="Financial money management"
            >
              <div className="flex flex-col sm:flex-row gap-2">
                <Button variant="outline" size="lg" onClick={handleExport} disabled={isLoading}>
                  <Download className="h-4 w-4" />
                  Export
                </Button>
                <Button variant="hero" size="lg" onClick={() => setIsModalOpen(true)}>
                  <Plus className="h-4 w-4" />
                  New Payment
                </Button>
              </div>
            </HeroSection>

            {/* Search and Filters */}
            <Card>
              <CardContent className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Search payments by customer, invoice, or amount..."
                      className="pl-10"
                      value={searchTerm}
                      onChange={handleSearch}
                    />
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button variant="outline" onClick={handleStatusFilter}>
                      <Filter className="h-4 w-4" />
                      {statusFilter}
                    </Button>
                    <Button variant="outline" onClick={handleMethodFilter}>{methodFilter}</Button>
                    <Button variant="outline" onClick={handlePeriodFilter}>{periodFilter}</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <Card>
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <DollarSign className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm sm:text-base text-muted-foreground">Total Revenue</p>
                      <p className="text-xl sm:text-2xl font-bold">$24,850</p>
                      <p className="text-xs text-success flex items-center gap-1">
                        <TrendingUp className="h-3 w-3" />
                        +12% from last month
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-success/10 rounded-lg">
                      <CreditCard className="h-5 w-5 text-success" />
                    </div>
                    <div>
                      <p className="text-sm sm:text-base text-muted-foreground">Paid This Month</p>
                      <p className="text-xl sm:text-2xl font-bold">$18,450</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-warning/10 rounded-lg">
                      <Clock className="h-5 w-5 text-warning" />
                    </div>
                    <div>
                      <p className="text-sm sm:text-base text-muted-foreground">Pending</p>
                      <p className="text-xl sm:text-2xl font-bold">$3,200</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-destructive/10 rounded-lg">
                      <Clock className="h-5 w-5 text-destructive" />
                    </div>
                    <div>
                      <p className="text-sm sm:text-base text-muted-foreground">Overdue</p>
                      <p className="text-xl sm:text-2xl font-bold">$3,200</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Payment List */}
            <Tabs defaultValue="all" className="space-y-4 sm:space-y-6">
              <TabsList>
                <TabsTrigger value="all">All Payments</TabsTrigger>
                <TabsTrigger value="paid">Paid</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="overdue">Overdue</TabsTrigger>
              </TabsList>

              <TabsContent value="all">
                <Card>
                  <CardHeader>
                    <CardTitle>Payment History</CardTitle>
                    <CardDescription>Complete record of all financial transactions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveTable>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Customer</TableHead>
                          <TableHead>Service</TableHead>
                          <TableHead>Amount</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Method</TableHead>
                          <TableHead>Invoice</TableHead>
                          <TableHead>Due Date</TableHead>
                          <TableHead>Paid Date</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredPayments.map((payment) => (
                          <TableRow key={payment.id}>
                            <TableCell>
                              <div>
                                <p className="font-medium">{payment.customer}</p>
                              </div>
                            </TableCell>
                            <TableCell>
                              <p className="text-sm">{payment.service}</p>
                            </TableCell>
                            <TableCell>
                              <p className="font-medium">${payment.amount.toFixed(2)}</p>
                            </TableCell>
                            <TableCell>
                              <Badge variant={getStatusColor(payment.status)}>
                                {payment.status}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <CreditCard className="h-3 w-3 text-muted-foreground" />
                                {payment.method}
                              </div>
                            </TableCell>
                            <TableCell>
                              <Button variant="link" className="p-0 h-auto">
                                {payment.invoiceId}
                              </Button>
                            </TableCell>
                            <TableCell>
                              <span className={payment.status === "Overdue" ? "text-destructive" : ""}>
                                {payment.dueDate}
                              </span>
                            </TableCell>
                            <TableCell>
                              {payment.status === "Paid" ? payment.date : "-"}
                            </TableCell>
                            <TableCell>
                              <div className="flex flex-col sm:flex-row gap-2">
                                <Button variant="outline" size="sm" onClick={() => handleViewPayment(payment.id)} disabled={isLoading}>
                                  <FileText className="h-3 w-3 mr-1" />View
                                </Button>
                                {payment.status !== "Paid" && (
                                  <Button variant="outline" size="sm" onClick={() => handleRecordPayment(payment.id, payment.customer)} disabled={isLoading}>
                                    <DollarSign className="h-3 w-3 mr-1" />Record Payment
                                  </Button>
                                )}
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

              <TabsContent value="paid">
                <Card>
                  <CardHeader>
                    <CardTitle>Paid Invoices</CardTitle>
                    <CardDescription>Successfully completed payments</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {payments.filter(p => p.status === "Paid").map((payment) => (
                        <div key={payment.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center gap-4">
                            <div className="p-2 bg-success/10 rounded-lg">
                              <DollarSign className="h-4 w-4 text-success" />
                            </div>
                            <div>
                              <p className="font-medium">{payment.customer}</p>
                              <p className="text-sm text-muted-foreground">{payment.service}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">${payment.amount.toFixed(2)}</p>
                            <p className="text-sm text-muted-foreground">Paid on {payment.date}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="pending">
                <Card>
                  <CardHeader>
                    <CardTitle>Pending Payments</CardTitle>
                    <CardDescription>Awaiting payment confirmation</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {payments.filter(p => p.status === "Pending").map((payment) => (
                        <div key={payment.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center gap-4">
                            <div className="p-2 bg-warning/10 rounded-lg">
                              <Clock className="h-4 w-4 text-warning" />
                            </div>
                            <div>
                              <p className="font-medium">{payment.customer}</p>
                              <p className="text-sm text-muted-foreground">{payment.service}</p>
                              <p className="text-sm text-muted-foreground">Due: {payment.dueDate}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">${payment.amount.toFixed(2)}</p>
                            <div className="flex flex-col sm:flex-row gap-2 mt-2">
                              <Button variant="outline" size="sm" onClick={() => handleSendReminder(payment.customer)} disabled={isLoading}>
                                <Send className="h-3 w-3 mr-1" />Send Reminder
                              </Button>
                              <Button variant="outline" size="sm" onClick={() => handleRecordPayment(payment.id, payment.customer)} disabled={isLoading}>
                                <DollarSign className="h-3 w-3 mr-1" />Record Payment
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="overdue">
                <Card>
                  <CardHeader>
                    <CardTitle>Overdue Payments</CardTitle>
                    <CardDescription>Payments past their due date</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {payments.filter(p => p.status === "Overdue").map((payment) => (
                        <div key={payment.id} className="flex items-center justify-between p-4 border border-destructive/20 rounded-lg bg-destructive/5">
                          <div className="flex items-center gap-4">
                            <div className="p-2 bg-destructive/10 rounded-lg">
                              <Clock className="h-4 w-4 text-destructive" />
                            </div>
                            <div>
                              <p className="font-medium">{payment.customer}</p>
                              <p className="text-sm text-muted-foreground">{payment.service}</p>
                              <p className="text-sm text-destructive">Overdue since: {payment.dueDate}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-destructive">${payment.amount.toFixed(2)}</p>
                            <div className="flex flex-col sm:flex-row gap-2 mt-2">
                              <Button variant="outline" size="sm" onClick={() => handleContactCustomer(payment.customer)} disabled={isLoading}>
                                <Phone className="h-3 w-3 mr-1" />Contact Customer
                              </Button>
                              <Button variant="outline" size="sm" onClick={() => handleRecordPayment(payment.id, payment.customer)} disabled={isLoading}>
                                <DollarSign className="h-3 w-3 mr-1" />Record Payment
                              </Button>
                            </div>
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

        {/* New Payment Modal */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="w-[calc(100vw-2rem)] sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>Record New Payment</DialogTitle>
              <DialogDescription>
                Record a payment received from a customer.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAddPayment}>
              <div className="grid gap-3 sm:gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="customer">Customer Name</Label>
                  <Input
                    id="customer"
                    placeholder="Customer or company name"
                    value={formData.customer}
                    onChange={handleInputChange}
                    required
                    disabled={isLoading}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="service">Service Description</Label>
                  <Input
                    id="service"
                    placeholder="Description of service provided"
                    value={formData.service}
                    onChange={handleInputChange}
                    required
                    disabled={isLoading}
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="amount">Amount ($)</Label>
                    <Input
                      id="amount"
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      value={formData.amount}
                      onChange={handleInputChange}
                      required
                      disabled={isLoading}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="method">Payment Method</Label>
                    <Select 
                      value={formData.method} 
                      onValueChange={(value) => handleSelectChange("method", value)}
                      disabled={isLoading}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Credit Card">Credit Card</SelectItem>
                        <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                        <SelectItem value="Check">Check</SelectItem>
                        <SelectItem value="ACH">ACH</SelectItem>
                        <SelectItem value="Cash">Cash</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="invoiceId">Invoice ID (optional)</Label>
                  <Input
                    id="invoiceId"
                    placeholder="INV-001"
                    value={formData.invoiceId}
                    onChange={handleInputChange}
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
                      Recording...
                    </>
                  ) : (
                    "Record Payment"
                  )}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
    </Layout>
  )
}