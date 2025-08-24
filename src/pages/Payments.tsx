import { Header } from "@/components/layout/header"
import { Sidebar } from "@/components/layout/sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Plus, Download, Filter, DollarSign, CreditCard, Clock, TrendingUp } from "lucide-react"

const payments = [
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
                <h1 className="text-3xl font-bold font-heading">Payment Management</h1>
                <p className="text-muted-foreground">Track payments, invoices, and financial transactions</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="lg">
                  <Download className="h-4 w-4" />
                  Export
                </Button>
                <Button variant="hero" size="lg">
                  <Plus className="h-4 w-4" />
                  New Payment
                </Button>
              </div>
            </div>

            {/* Search and Filters */}
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Search payments by customer, invoice, or amount..."
                      className="pl-10"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline">
                      <Filter className="h-4 w-4" />
                      All Status
                    </Button>
                    <Button variant="outline">All Methods</Button>
                    <Button variant="outline">This Month</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <DollarSign className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Total Revenue</p>
                      <p className="text-2xl font-bold">$24,850</p>
                      <p className="text-xs text-success flex items-center gap-1">
                        <TrendingUp className="h-3 w-3" />
                        +12% from last month
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-success/10 rounded-lg">
                      <CreditCard className="h-5 w-5 text-success" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Paid This Month</p>
                      <p className="text-2xl font-bold">$18,450</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-warning/10 rounded-lg">
                      <Clock className="h-5 w-5 text-warning" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Pending</p>
                      <p className="text-2xl font-bold">$3,200</p>
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
                      <p className="text-2xl font-bold">$3,200</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Payment List */}
            <Tabs defaultValue="all" className="space-y-6">
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
                        {payments.map((payment) => (
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
                              <div className="flex gap-2">
                                <Button variant="outline" size="sm">View</Button>
                                {payment.status !== "Paid" && (
                                  <Button variant="outline" size="sm">Record Payment</Button>
                                )}
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
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
                            <div className="flex gap-2 mt-2">
                              <Button variant="outline" size="sm">Send Reminder</Button>
                              <Button variant="outline" size="sm">Record Payment</Button>
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
                            <div className="flex gap-2 mt-2">
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
        </main>
      </div>
    </div>
  )
}