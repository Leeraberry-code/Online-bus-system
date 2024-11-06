"use client"
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../ui/table"
import { Badge } from "../../ui/badge"
import { Progress } from "../../ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs"
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'

// Mock data (replace with actual data fetching in a real application)
const stats = {
  totalStudents: 150,
  acceptedStudents: 120,
  waitlistedStudents: 30,
}

const busStatus = [
  { id: 1, number: "Bus 42", capacity: 50, occupied: 45, route: "North Route" },
  { id: 2, number: "Bus 57", capacity: 50, occupied: 38, route: "South Route" },
  { id: 3, number: "Bus 23", capacity: 40, occupied: 40, route: "East Route" },
]

const students = [
  { id: 1, name: "John Doe", grade: 9, busNumber: "Bus 42", pickupTime: "7:30 AM", dropoffTime: "3:45 PM", address: "123 Elm St, Springfield", status: "Accepted" },
  { id: 2, name: "Jane Smith", grade: 10, busNumber: "Bus 57", pickupTime: "7:45 AM", dropoffTime: "4:00 PM", address: "456 Oak Ave, Springfield", status: "Accepted" },
  { id: 3, name: "Mike Johnson", grade: 11, busNumber: "Bus 23", pickupTime: "7:15 AM", dropoffTime: "3:30 PM", address: "789 Pine Rd, Springfield", status: "Waitlisted" },
]

export default function AdminDashboard() {
  const pieChartData = [
    { name: 'Accepted', value: stats.acceptedStudents },
    { name: 'Waitlisted', value: stats.waitlistedStudents },
  ]
  const COLORS = ['#4CAF50', '#FFC107']

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
        <p className="text-gray-600">Strive High Secondary School Transportation Management</p>
      </header>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Total Students</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{stats.totalStudents}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Accepted Students</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-green-600">{stats.acceptedStudents}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Waitlisted Students</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-yellow-600">{stats.waitlistedStudents}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Student Status Distribution</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center mt-4">
              {pieChartData.map((entry, index) => (
                <div key={`legend-${index}`} className="flex items-center mx-4">
                  <div className="w-4 h-4 mr-2" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                  <span>{entry.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Bus Status</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Bus Number</TableHead>
                  <TableHead>Route</TableHead>
                  <TableHead>Capacity</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {busStatus.map((bus) => (
                  <TableRow key={bus.id}>
                    <TableCell>{bus.number}</TableCell>
                    <TableCell>{bus.route}</TableCell>
                    <TableCell>{bus.occupied}/{bus.capacity}</TableCell>
                    <TableCell>
                      <Progress value={(bus.occupied / bus.capacity) * 100} className="w-[60px]" />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Student Details</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Grade</TableHead>
                <TableHead>Bus Number</TableHead>
                <TableHead>Pickup Time</TableHead>
                <TableHead>Drop-off Time</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>{student.grade}</TableCell>
                  <TableCell>{student.busNumber}</TableCell>
                  <TableCell>{student.pickupTime}</TableCell>
                  <TableCell>{student.dropoffTime}</TableCell>
                  <TableCell>{student.address}</TableCell>
                  <TableCell>
                  <Badge 
                        variant={student.status === "Accepted" ? "success" : "destructive"}
                          className={student.status === "Waitlisted" ? "bg-yellow-500 hover:bg-yellow-600" : ""}
                        >
                          {student.status}
                        </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}