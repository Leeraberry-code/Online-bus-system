'use client'

import { useState } from "react"
import { redirect, useRouter } from 'next/navigation'
import Link from "next/link"
import axios from 'axios'
import { Button } from "../../ui/button"
import { Input } from "../../ui/input"
import { Label } from "../../ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../../ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select"
import { toast } from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "", userType: "" });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUserTypeChange = (value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      userType: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
  
    try {
      const response = await axios.post("http://localhost:5000/login/login", formData);
      console.log(response.data);
  
      const userType = response.data.role || response.data.userType;
      
      if (!userType) {
        throw new Error("User type not returned from server."); // Important check
     }

      if (userType === "admin") {
        router.push("/adminDashboard");
      } else if (userType === "parent") {
        router.push("/parentDashboard");
      } else {
        console.error("Unexpected user type:", userType);
        toast.error("Login failed.  Unexpected user type.");
      }
  
      toast.success(`Welcome back, ${userType}!`);
    } catch (err) {
      console.log("Login failed:", err);
      toast.error(err.response?.data?.message || "Please check your credentials and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-center">Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* <div className="space-y-2">
              <Label htmlFor="userType">User Type</Label>
              <Select onValueChange={handleUserTypeChange} required>
                <SelectTrigger id="userType">
                  <SelectValue placeholder="Select user type" />
                </SelectTrigger>
                <SelectContent className="absolute z-10 bg-white shadow-lg rounded-md">
                  <SelectItem 
                    value="parent" 
                    className="p-2 hover:bg-blue-100 hover:text-blue-700 cursor-pointer rounded-md"
                  >
                    Parent
                  </SelectItem>
                  <SelectItem 
                    value="admin" 
                    className="p-2 hover:bg-green-100 hover:text-green-700 cursor-pointer rounded-md"
                  >
                    Admin
                  </SelectItem>
                </SelectContent>
              </Select>
            </div> */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                onChange={handleChange}
                placeholder="Enter your password"
                required
              />
            </div>
            <Button className="w-full" type="submit" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Link href="/forgot-password" className="w-full">
            <Button variant="outline" className="w-full">
              Forgot Password
            </Button>
          </Link>
          <Link href="/register" className="w-full">
            <Button variant="outline" className="w-full">
              Register New Account
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}