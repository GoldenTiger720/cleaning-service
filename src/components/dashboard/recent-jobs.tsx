import { Clock, MapPin, User } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const recentJobs = [
  {
    id: 1,
    customer: "ABC Corporation",
    location: "Downtown Office",
    employee: "Sarah Johnson",
    time: "2:00 PM - 6:00 PM",
    status: "In Progress",
    type: "Office Cleaning"
  },
  {
    id: 2,
    customer: "Smith Residence",
    location: "Maple Street 123",
    employee: "Mike Chen",
    time: "9:00 AM - 12:00 PM",
    status: "Completed",
    type: "Residential"
  },
  {
    id: 3,
    customer: "Tech Hub Co.",
    location: "Silicon Valley",
    employee: "Emma Wilson",
    time: "6:00 PM - 10:00 PM",
    status: "Scheduled",
    type: "Deep Cleaning"
  },
  {
    id: 4,
    customer: "Green Mall",
    location: "Shopping Center",
    employee: "David Kim",
    time: "11:00 PM - 5:00 AM",
    status: "Scheduled",
    type: "Commercial"
  }
]

export function RecentJobs() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-heading">Recent Jobs</CardTitle>
        <CardDescription>Latest cleaning assignments and their status</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3 sm:space-y-4 px-4 sm:px-6 pb-4 sm:pb-6">
        {recentJobs.map((job) => (
          <div key={job.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 sm:p-4 rounded-lg border border-border/50 bg-muted/20 hover:bg-muted/40 transition-smooth">
            <div className="flex-1 space-y-1.5 sm:space-y-2">
              <div className="flex items-center gap-2">
                <h4 className="font-semibold">{job.customer}</h4>
                <Badge variant={
                  job.status === "Completed" ? "default" :
                  job.status === "In Progress" ? "secondary" : "outline"
                } className="text-xs">
                  {job.status}
                </Badge>
              </div>
              
              <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <MapPin className="h-3 w-3 flex-shrink-0" />
                  <span className="truncate max-w-[120px] sm:max-w-none">{job.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <User className="h-3 w-3 flex-shrink-0" />
                  <span className="truncate max-w-[120px] sm:max-w-none">{job.employee}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3 flex-shrink-0" />
                  <span className="whitespace-nowrap">{job.time}</span>
                </div>
              </div>
              
              <div className="text-xs text-primary font-medium">{job.type}</div>
            </div>
            
            <Button variant="outline" size="sm" className="w-full sm:w-auto">
              View Details
            </Button>
          </div>
        ))}
        
        <Button variant="ghost" className="w-full mt-4">
          View All Jobs
        </Button>
      </CardContent>
    </Card>
  )
}