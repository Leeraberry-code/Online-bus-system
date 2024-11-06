import Link from "next/link"
import { Button } from "../../ui/button"
import { Input } from "../../ui/input"
import { Label } from "../../ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../../ui/card"

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white shadow-md rounded-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-center text-gray-800">Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="Enter your email" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" placeholder="Enter your password" required />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button className="w-full bg-black text-white" type="submit">
            Login
          </Button>
          <Link href="/forgot-password" className="w-full">
            <Button variant="outline" className="w-full bg-gray-200 text-gray-800 hover:bg-gray-300">
              Forgot Password
            </Button>
          </Link>
          <Link href="/register" className="w-full">
            <Button variant="outline" className="w-full bg-gray-100 text-gray-800 hover:bg-gray-200">
              Register New Account
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}
