"use client";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";
import { Badge } from "../../ui/badge";
import { Progress } from "../../ui/progress";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { useEffect, useState } from "react";
import axios from "axios";
import { Bus, Student, Route } from "../../lib/types";
const stats = {
  totalStudents: 150,
  acceptedStudents: 120,
  waitlistedStudents: 30,
};
import EditLearnerModal from "./components/EditLearnerModal";


const COLORS = ["#4CAF50", "#FFC107", "#F44336"];


export default function AdminDashboard() {
  const baseUrl = "http://localhost:5000";
  const [students, setStudents] = useState<Student[]>([]);
  const [busData, setBusData] = useState<{ [key: number]: Bus }>({});
  const [routes, setRoutes] = useState<{ [key: number]: Route }>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedLearner, setSelectedLearner] = useState<Student | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchBusData = async () => {
    try {
      const response = await axios.get(`${baseUrl}/bus/buses`);
      if (response.status !== 200) {
        throw new Error("Failed to fetch bus data");
      }
      const buses: Bus[] = response.data;
      const busMap: { [key: number]: Bus } = {};
      buses.forEach((bus) => {
        busMap[bus.Bus_ID] = bus;
      });
      setBusData(busMap);
      console.log(busMap);
    } catch (error) {
      setError("Failed to fetch bus data.");
    }
  };

  const fetchRoutes = async () => {
    try {
      const response = await axios.get(`${baseUrl}/route/routes`);
      if (response.status !== 200) {
        throw new Error("Failed to fetch route data");
      }
      const routeList: Route[] = response.data;
      const routeMap: { [key: number]: Route } = {};
      routeList.forEach((route) => {
        routeMap[route.Route_ID] = route;
      });
      setRoutes(routeMap);
    } catch (error) {
      setError("Failed to fetch route data.");
    }
  };

  const fetchStudents = async () => {
    try {
      const response = await axios.get(`${baseUrl}/learner/learners`);
      if (response.status !== 200) {
        throw new Error("Failed to fetch student data");
      }
      setStudents(response.data || []);
      console.log(response.data);
    } catch (error) {
      setError("Failed to fetch students data.");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await Promise.all([fetchStudents(), fetchBusData(), fetchRoutes()]);
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleRowClick = (student: Student) => {
    setSelectedLearner(student);
    setIsModalOpen(true);
  };

  const handleUpdate = (updatedLearner: Student) => {
    setStudents((prev) =>
      prev.map((student) => (student.Learner_ID === updatedLearner.Learner_ID ? updatedLearner : student))
    );
  };

  // Calculate the status counts for the pie chart
  const statusCounts = students.reduce(
    (acc, student) => {
      acc[student.Status] = (acc[student.Status] || 0) + 1;
      return acc;
    },
    { Accepted: 0, Waitlisted: 0, Rejected: 0 } // Adjust statuses as needed
  );

  const pieChartData = [
    { name: "Accepted", value: statusCounts.Accepted },
    { name: "Waitlisted", value: statusCounts.Waitlisted },
    { name: "Rejected", value: statusCounts.Rejected },
  ];

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
        <p className="text-gray-600">
          Strive High Secondary School Transportation Management
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Total Students</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{students.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Accepted Students</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-green-600">
            {statusCounts.Accepted}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Waitlisted Students</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-yellow-600">
            {statusCounts.Waitlisted}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Student Status Distribution</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px] flex flex-col justify-center items-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieChartData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                >
                  {pieChartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center mb-16">
              {pieChartData.map((entry, index) => (
                <div key={`legend-${index}`} className="flex items-center mx-4">
                  <div
                    className="w-4 h-4 mr-2"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  ></div>
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
                  {/* <TableHead>Capacity</TableHead> */}
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Object.values(busData).map((bus) => (
                  <TableRow key={bus.Bus_ID}>
                    <TableCell>{bus.Bus_ID}</TableCell>
                    <TableCell>{routes[bus.Route_ID]
                        ? routes[bus.Route_ID].Route_Name
                        : "Loading..."}</TableCell>
                    {/* <TableCell>
                      {bus.occupied}/{bus.capacity}
                    </TableCell> */}
                    <TableCell>
                      {/* <Progress
                        value={(bus.occupied / bus.capacity) * 100}
                        className="w-[60px]"
                      /> */}
                      {bus.Bus_SpaceStatus}
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
                <TableHead>Surname</TableHead>
                <TableHead>Cell Number</TableHead>
                <TableHead>Grade</TableHead>
                <TableHead>Bus Number</TableHead>
                <TableHead>Pickup Time</TableHead>
                <TableHead>Drop-off Time</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map((student) => {
                const busInfo = busData[student.Bus_ID];
                return (
                  <TableRow className="cursor-pointer hover:bg-slate-100" key={student.Learner_ID} onClick={() => handleRowClick(student)}>
                    <TableCell>{student.Learner_Name}</TableCell>
                    <TableCell>{student.Learner_Surname}</TableCell>
                    <TableCell>{student.Learner_CellNo}</TableCell>
                    <TableCell>{student.Learner_Grade}</TableCell>
                    <TableCell>
                      {busInfo ? busInfo.Bus_ID : "Loading..."}
                    </TableCell>
                    <TableCell>
                      {busInfo ? busInfo.PickUp_time : "Loading..."}
                    </TableCell>
                    <TableCell>
                      {busInfo ? busInfo.DropOff_time : "Loading..."}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          student.Status === "Accepted"
                            ? "success"
                            : "destructive"
                        }
                        className={
                          student.Status === "Waitlisted"
                            ? "bg-yellow-500 hover:bg-yellow-600 p-2 text-center"
                            : student.Status === "Rejected"
                              ? "bg-red-500 hover:bg-red-600 p-2 text-center"
                              : "bg-green-500 hover:bg-green-600 p-2 text-center"
                        }
                      >
                        {student.Status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {selectedLearner && (
        <EditLearnerModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          learner={selectedLearner}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
}
