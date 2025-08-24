import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"
import { Loader2 } from "lucide-react"

// Mock user data for demonstration
const MOCK_USERS = [
  {
    email: "admin@cleanpro.com",
    password: "password123",
    firstName: "Admin",
    lastName: "User",
    company: "CleanPro Demo"
  },
  {
    email: "john@example.com",
    password: "demo1234",
    firstName: "John",
    lastName: "Doe",
    company: "Sparkle Cleaning"
  }
]

export default function SignIn() {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false
  })
  const { toast } = useToast()
  const navigate = useNavigate()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [id]: type === "checkbox" ? checked : value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      // Check against mock users
      const user = MOCK_USERS.find(
        u => u.email === formData.email && u.password === formData.password
      )

      if (user) {
        // Successful login
        const userData = {
          id: Date.now(),
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          company: user.company,
          lastLogin: new Date().toISOString()
        }
        
        localStorage.setItem("currentUser", JSON.stringify(userData))
        localStorage.setItem("isAuthenticated", "true")
        
        if (formData.rememberMe) {
          localStorage.setItem("rememberMe", "true")
        }

        toast({
          title: "Welcome back!",
          description: `Logged in as ${user.firstName} ${user.lastName}`,
        })

        setIsLoading(false)
        navigate("/")
      } else {
        // Failed login
        toast({
          title: "Invalid credentials",
          description: "Please check your email and password.",
          variant: "destructive"
        })
        setIsLoading(false)
      }
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-primary mb-4">
            <span className="text-xl font-bold text-white">CP</span>
          </div>
          <h1 className="text-2xl font-bold font-heading">CleanPro</h1>
          <p className="text-sm text-muted-foreground">Management System</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Welcome back</CardTitle>
            <CardDescription>
              Sign in to your account to continue
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link 
                    to="/forgot-password" 
                    className="text-sm text-primary hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  disabled={isLoading}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="rememberMe"
                  checked={formData.rememberMe}
                  onCheckedChange={(checked) => 
                    setFormData(prev => ({ ...prev, rememberMe: checked as boolean }))
                  }
                  disabled={isLoading}
                />
                <Label 
                  htmlFor="rememberMe" 
                  className="text-sm font-normal cursor-pointer"
                >
                  Remember me
                </Label>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button 
                type="submit" 
                className="w-full" 
                variant="hero"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  "Sign in"
                )}
              </Button>
              <div className="text-sm text-center text-muted-foreground">
                <p className="mb-2">Demo credentials:</p>
                <p className="font-mono text-xs">admin@cleanpro.com / password123</p>
                <p className="font-mono text-xs">john@example.com / demo1234</p>
              </div>
              <p className="text-sm text-center text-muted-foreground">
                Don't have an account?{" "}
                <Link to="/signup" className="text-primary hover:underline">
                  Sign up
                </Link>
              </p>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  )
}