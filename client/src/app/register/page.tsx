'use client'

import { useRouter } from 'next/navigation' // Import Next.js router
import { useState } from "react"
import axios from 'axios'
import Link from "next/link"
import { Button } from "../../ui/button"
import { Input } from "../../ui/input"
import { Label } from "../../ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../../ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select"

type FormData = {
  username: string;
  initials: string;
  surname: string;
  email: string;
  password: string;
  confirmPassword: string;
  cellNo: string;
  parentId: string;
  learnerId: string;
}

type Errors = {
  username?: string;
  initials?: string;
  surname?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  cellNo?: string;
  parentId?: string;
  learnerId?: string;
};

export default function RegisterPage() {

  const router = useRouter(); // Initialize the router
  const [userType, setUserType] = useState<"parent" | "admin">("parent");

  const [formData, setFormData] = useState<FormData>({
    username: "",
    initials: "",
    surname: "", 
    email: "",
    password: "",
    confirmPassword: "",
    cellNo: "", 
    parentId: "", 
    learnerId: "",
  });
  const [errors, setErrors] = useState<Errors>({});
    const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors: Errors = {};
    if (!formData.username) newErrors.username = "Username is required";
    if (!formData.initials) newErrors.initials = "Initials are required";
    if (!formData.surname) newErrors.surname = "Surname is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (!formData.confirmPassword) newErrors.confirmPassword = "Confirm password is required";
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match";
    setErrors(newErrors); // Update the errors state with validation messages
    return Object.keys(newErrors).length === 0; // Return whether form is valid
  };;

  const handleSubmit = async (e) => {
    e.preventDefault();
    //console.log("Form submitted!");
    if (validateForm()) {
      //console.log("Form is valid!");
        try{
          if(userType==='admin'){

            const response = await axios.post('http://localhost:5000/admin/admins',{
                      Parent_ID: formData.parentId || null, 
                      Learner_ID: formData.learnerId || null, 
                      Admin_Initials: formData.initials, 
                      Admin_Surname: formData.surname, 
                      Admin_Passcode: formData.password,
                      Admin_Email: formData.email
                    });

                    console.log(response.data)
  
        setSnackbar({
          open: true,
          message: "Registration successful!",
          severity: "success",
        })

        router.push("/adminDashboard");
      }else{
            const response = await axios.post('http://localhost:5000/parent/parents',{
                      Parent_Name: formData.username, 
                      Parent_Surname: formData.surname, 
                      Parent_Passcode: formData.password,
                      Parent_CellNo: formData.cellNo, 
                      Parent_Email: formData.email
                    });

                    console.log(response.data)
  
        setSnackbar({
          open: true,
          message: "Registration successful!",
          severity: "success",
        })

        router.push("/parentDashboard");

          }
        }catch(err){
          console.log(errors);
          alert("Server error")
        }
      // try {
      //   console.log("Sending request...")
      //   // Determine endpoint and request data based on user type
      //   const endpoint = userType === "admin" 
      //     ? "http://localhost:5000/admin/admins" 
      //     : "http://localhost:5000/parent/parents";
          
      //   const requestData = userType === "admin" 
      //     ? {
      //         Parent_ID: formData.parentId || null, // Include Parent_ID if applicable or null
      //         Learner_ID: formData.learnerId || null, // Include Learner_ID if applicable or null
      //         Admin_Initials: formData.initials, // Map the frontend username to Admin_Initials
      //         Admin_Surname: formData.surname, // Assuming surname is an additional field in the form
      //         Admin_Passcode: formData.password, // Map password to Admin_Passcode
      //         Admin_Email: formData.email
      //       } 
      //     : {
      //         Parent_Name: formData.username, // Map the frontend username to Parent_Name
      //         Parent_Surname: formData.surname, // Assuming surname is an additional field in the form
      //         Parent_Passcode: formData.password, // Map password to Parent_Passcode
      //         Parent_CellNo: formData.cellNo, // Assuming cellNo is an additional field in the form
      //         Parent_Email: formData.email
      //       };
  
      //   const response = await axios.post(endpoint, requestData);
      //   console.log(response.data)
  
      //   setSnackbar({
      //     open: true,
      //     message: "Registration successful!",
      //     severity: "success",
      //   });
  
      //   // Redirect based on the role after successful registration
      //   if (userType === "admin") {
      //     router.push("/admin/dashboard");
      //   } else {
      //     router.push("/parent/dashboard");
      //   }
      // } catch (error) {
      //   setSnackbar({
      //     open: true,
      //     message: error.response?.data?.message || "Registration failed",
      //     severity: "error",
      //   });
      // }
    }else{
      console.log(errors);
    }
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white shadow-md rounded-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-center text-gray-800">Register</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="userType">I am registering as a:</Label>
              <Select onValueChange={(value: "parent" | "admin") => setUserType(value)}>
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
            </div>

            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input id="username" name = "username" type="username" onChange={handleChange} placeholder="Enter your Username" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="initials">Initials</Label>
              <Input id="initials" name = "initials" type="intials" onChange={handleChange} placeholder="Enter your intials" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="surname">Surname</Label>
              <Input id="surname" name="surname" type="surname" onChange={handleChange} placeholder="Enter your surname" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cellNo">Cell number</Label>
              <Input id="cellNo" name="cellNo" type="cellNo" onChange={handleChange} placeholder="Enter your cell number" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" onChange={handleChange} placeholder="Enter your email" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" onChange={handleChange} placeholder="Create a password" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input id="confirmPassword" name="confirmPassword" type="password" onChange={handleChange} placeholder="Confirm your password" required />
            </div>
        <CardFooter className="flex flex-col space-y-4">
          <Button className="w-full bg-black text-white" type="submit">
            Register
          </Button>
          <div className="text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-600 hover:underline">
              Login here
            </Link>
          </div>
        </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
