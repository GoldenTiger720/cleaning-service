import { useState } from "react"
import { Layout } from "@/components/layout/layout"
import { Button } from "@/components/ui/button"
import { HeroSection } from "@/components/ui/hero-section"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { Search, Plus, Download, Send, Eye, Edit, FileText, DollarSign, Clock, CheckCircle, Loader2, Trash2 } from "lucide-react"

const initialInvoices = [
  {
    id: 1,
    number: "INV-001",
    customer: "ABC Corporation",
    service: "Office Cleaning - January",
    amount: 850.00,
    status: "Paid",
    issueDate: "2024-01-01",
    dueDate: "2024-01-15",
    paidDate: "2024-01-15",
    items: [
      { description: "Office cleaning - 3rd floor", hours: 20, rate: 25.00, total: 500.00 },
      { description: "Restroom deep clean", hours: 8, rate: 30.00, total: 240.00 },
      { description: "Window cleaning", hours: 4, rate: 27.50, total: 110.00 }
    ]
  },
  {
    id: 2,
    number: "INV-002",
    customer: "The Johnson Family",
    service: "House Cleaning - Weekly",
    amount: 120.00,
    status: "Sent",
    issueDate: "2024-01-10",
    dueDate: "2024-01-20",
    paidDate: null,
    items: [
      { description: "Weekly house cleaning", hours: 4, rate: 30.00, total: 120.00 }
    ]
  },
  {
    id: 3,
    number: "INV-003",
    customer: "Metro Office Complex",
    service: "Commercial Cleaning - Monthly",
    amount: 1200.00,
    status: "Overdue",
    issueDate: "2024-01-05",
    dueDate: "2024-01-12",
    paidDate: null,
    items: [
      { description: "Commercial cleaning - Full building", hours: 40, rate: 28.00, total: 1120.00 },
      { description: "Carpet cleaning", hours: 4, rate: 20.00, total: 80.00 }
    ]
  },
  {
    id: 4,
    number: "INV-004",
    customer: "Green Valley Apartments",
    service: "Apartment Cleaning - Bi-weekly",
    amount: 650.00,
    status: "Draft",
    issueDate: "2024-01-15",
    dueDate: "2024-01-25",
    paidDate: null,
    items: [
      { description: "Apartment common areas", hours: 16, rate: 25.00, total: 400.00 },
      { description: "Elevator cleaning", hours: 6, rate: 30.00, total: 180.00 },
      { description: "Stairwell cleaning", hours: 7, rate: 10.00, total: 70.00 }
    ]
  }
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "Paid": return "default"
    case "Sent": return "secondary" 
    case "Overdue": return "destructive"
    case "Draft": return "outline"
    default: return "secondary"
  }
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case "Paid": return CheckCircle
    case "Sent": return Send
    case "Overdue": return Clock
    case "Draft": return FileText
    default: return FileText
  }
}

export default function Invoices() {
  const [invoices, setInvoices] = useState(initialInvoices)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleExport = () => {
    toast({ title: "Export completed", description: "Invoice data exported successfully." })
  }

  const handleNewInvoice = () => {
    toast({ title: "New Invoice", description: "Opening invoice creation form." })
  }

  const handleSendInvoice = (invoiceNumber: string) => {
    toast({ title: "Invoice Sent", description: `${invoiceNumber} has been sent to customer.` })
  }

  const handleDownloadInvoice = (invoiceNumber: string) => {
    toast({ title: "Downloading", description: `${invoiceNumber} is being downloaded.` })
  }

  return (
    <Layout>
      <div className="p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Hero Section */}
            <HeroSection
              title="Invoice Management"
              description="Create, send, and track invoices with ease. Manage your billing process and ensure timely payments from clients."
              imageUrl="https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=1600&h=400&fit=crop"
              imageAlt="Documents and paperwork"
            >
              <div className="flex gap-2">
                <Button variant="outline" size="lg" onClick={handleExport}>
                  <Download className="h-4 w-4" />
                  Export
                </Button>
                <Button variant="hero" size="lg" onClick={handleNewInvoice}>
                  <Plus className="h-4 w-4" />
                  New Invoice
                </Button>
              </div>
            </HeroSection>

            {/* Search and Filters */}
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Search invoices by number, customer, or service..."
                      className="pl-10"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline">All Status</Button>
                    <Button variant="outline">This Month</Button>
                    <Button variant="outline">All Customers</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Invoice Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Total Invoices</p>
                      <p className="text-2xl font-bold">247</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-success/10 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-success" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Paid</p>
                      <p className="text-2xl font-bold">189</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-warning/10 rounded-lg">
                      <Send className="h-5 w-5 text-warning" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Sent</p>
                      <p className="text-2xl font-bold">45</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-destructive/10 rounded-lg">
                      <Clock className="h-5 w-5 text-destructive" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Overdue</p>
                      <p className="text-2xl font-bold">13</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Invoice List */}
            <Tabs defaultValue="all" className="space-y-6">
              <TabsList>
                <TabsTrigger value="all">All Invoices</TabsTrigger>
                <TabsTrigger value="draft">Drafts</TabsTrigger>
                <TabsTrigger value="sent">Sent</TabsTrigger>
                <TabsTrigger value="paid">Paid</TabsTrigger>
                <TabsTrigger value="overdue">Overdue</TabsTrigger>
              </TabsList>

              <TabsContent value="all">
                <Card>
                  <CardHeader>
                    <CardTitle>All Invoices</CardTitle>
                    <CardDescription>Complete list of all invoices</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Invoice #</TableHead>
                          <TableHead>Customer</TableHead>
                          <TableHead>Service</TableHead>
                          <TableHead>Amount</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Issue Date</TableHead>
                          <TableHead>Due Date</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {invoices.map((invoice) => {
                          const StatusIcon = getStatusIcon(invoice.status)
                          return (
                            <TableRow key={invoice.id}>
                              <TableCell>
                                <Button variant="link" className="p-0 h-auto font-medium">
                                  {invoice.number}
                                </Button>
                              </TableCell>
                              <TableCell>
                                <div>
                                  <p className="font-medium">{invoice.customer}</p>
                                </div>
                              </TableCell>
                              <TableCell>
                                <p className="text-sm">{invoice.service}</p>
                              </TableCell>
                              <TableCell>
                                <p className="font-medium">${invoice.amount.toFixed(2)}</p>
                              </TableCell>
                              <TableCell>
                                <Badge variant={getStatusColor(invoice.status)} className="flex items-center gap-1 w-fit">
                                  <StatusIcon className="h-3 w-3" />
                                  {invoice.status}
                                </Badge>
                              </TableCell>
                              <TableCell>{invoice.issueDate}</TableCell>
                              <TableCell>
                                <span className={invoice.status === "Overdue" ? "text-destructive" : ""}>
                                  {invoice.dueDate}
                                </span>
                              </TableCell>
                              <TableCell>
                                <div className="flex gap-2">
                                  <Button variant="ghost" size="icon">
                                    <Eye className="h-4 w-4" />
                                  </Button>
                                  <Button variant="ghost" size="icon">
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                  <Button variant="ghost" size="icon">
                                    <Download className="h-4 w-4" />
                                  </Button>
                                  {invoice.status !== "Paid" && (
                                    <Button variant="ghost" size="icon">
                                      <Send className="h-4 w-4" />
                                    </Button>
                                  )}
                                </div>
                              </TableCell>
                            </TableRow>
                          )
                        })}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="draft">
                <Card>
                  <CardHeader>
                    <CardTitle>Draft Invoices</CardTitle>
                    <CardDescription>Invoices not yet sent to customers</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {invoices.filter(inv => inv.status === "Draft").map((invoice) => (
                        <div key={invoice.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center gap-4">
                            <div className="p-2 bg-muted/50 rounded-lg">
                              <FileText className="h-4 w-4 text-muted-foreground" />
                            </div>
                            <div>
                              <p className="font-medium">{invoice.number} - {invoice.customer}</p>
                              <p className="text-sm text-muted-foreground">{invoice.service}</p>
                              <p className="text-sm text-muted-foreground">Due: {invoice.dueDate}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <p className="font-medium">${invoice.amount.toFixed(2)}</p>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                <Edit className="h-3 w-3" />
                                Edit
                              </Button>
                              <Button variant="outline" size="sm">
                                <Send className="h-3 w-3" />
                                Send
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="sent">
                <Card>
                  <CardHeader>
                    <CardTitle>Sent Invoices</CardTitle>
                    <CardDescription>Invoices sent and awaiting payment</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {invoices.filter(inv => inv.status === "Sent").map((invoice) => (
                        <div key={invoice.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center gap-4">
                            <div className="p-2 bg-warning/10 rounded-lg">
                              <Send className="h-4 w-4 text-warning" />
                            </div>
                            <div>
                              <p className="font-medium">{invoice.number} - {invoice.customer}</p>
                              <p className="text-sm text-muted-foreground">{invoice.service}</p>
                              <p className="text-sm text-muted-foreground">Due: {invoice.dueDate}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <p className="font-medium">${invoice.amount.toFixed(2)}</p>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">View</Button>
                              <Button variant="outline" size="sm">Resend</Button>
                              <Button variant="outline" size="sm">Record Payment</Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="paid">
                <Card>
                  <CardHeader>
                    <CardTitle>Paid Invoices</CardTitle>
                    <CardDescription>Successfully paid invoices</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {invoices.filter(inv => inv.status === "Paid").map((invoice) => (
                        <div key={invoice.id} className="flex items-center justify-between p-4 border rounded-lg bg-success/5">
                          <div className="flex items-center gap-4">
                            <div className="p-2 bg-success/10 rounded-lg">
                              <CheckCircle className="h-4 w-4 text-success" />
                            </div>
                            <div>
                              <p className="font-medium">{invoice.number} - {invoice.customer}</p>
                              <p className="text-sm text-muted-foreground">{invoice.service}</p>
                              <p className="text-sm text-success">Paid on: {invoice.paidDate}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <p className="font-medium">${invoice.amount.toFixed(2)}</p>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                <Eye className="h-3 w-3" />
                                View
                              </Button>
                              <Button variant="outline" size="sm">
                                <Download className="h-3 w-3" />
                                Download
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
                    <CardTitle>Overdue Invoices</CardTitle>
                    <CardDescription>Invoices past their due date</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {invoices.filter(inv => inv.status === "Overdue").map((invoice) => (
                        <div key={invoice.id} className="flex items-center justify-between p-4 border border-destructive/20 rounded-lg bg-destructive/5">
                          <div className="flex items-center gap-4">
                            <div className="p-2 bg-destructive/10 rounded-lg">
                              <Clock className="h-4 w-4 text-destructive" />
                            </div>
                            <div>
                              <p className="font-medium">{invoice.number} - {invoice.customer}</p>
                              <p className="text-sm text-muted-foreground">{invoice.service}</p>
                              <p className="text-sm text-destructive">Overdue since: {invoice.dueDate}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <p className="font-medium text-destructive">${invoice.amount.toFixed(2)}</p>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">Send Reminder</Button>
                              <Button variant="outline" size="sm">Contact Customer</Button>
                              <Button variant="outline" size="sm">Record Payment</Button>
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
    </Layout>
  )
}