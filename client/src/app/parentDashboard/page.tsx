"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Bus, Route, Student } from "../../lib/types";
import axios from "axios";
import { User, Bus as BusIcon, MapPin, Clock } from "lucide-react"; // Import icons

export default function ParentDashboard() {
  const baseUrl = "http://localhost:5000";
  const [students, setStudents] = useState<Student[]>([]);
  const [busData, setBusData] = useState<{ [key: number]: Bus }>({});
  const [routes, setRoutes] = useState<{ [key: number]: Route }>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const router = useRouter();

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

  const handleStudentClick = (student: Student) => {
    setSelectedStudent(student);
  };

  return (
    <div className="p-6">
      <div className="rounded-xl bg-white shadow-sm mb-6">
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-4">Learner List</h2>
          <div className="flex space-x-2 mb-4">
            <input
              type="text"
              placeholder="Search learner...."
              className="rounded-lg border px-4 py-2 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
            <select className="rounded-lg border px-4 py-2">
              <option value="all">All learners</option>
              <option value="accepted">Accepted</option>
              <option value="waitlisted">Waitlisted</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b text-left text-sm font-medium text-gray-500">
                  <th className="pb-3">Learner ID</th>
                  <th className="pb-3">Name</th>
                  <th className="pb-3">Surname</th>
                  <th className="pb-3">Cell Number</th>
                  <th className="pb-3">Grade</th>
                  <th className="pb-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr
                    key={student.Learner_ID}
                    className="border-b cursor-pointer hover:bg-gray-100"
                    onClick={() => handleStudentClick(student)}
                  >
                    <td className="py-3">{student.Learner_ID}</td>
                    <td className="py-3">{student.Learner_Name}</td>
                    <td className="py-3">{student.Learner_Surname}</td>
                    <td className="py-3">{student.Learner_CellNo}</td>
                    <td className="py-3">{student.Learner_Grade}</td>
                    <td className="py-3">{student.Status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {selectedStudent && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-lg border bg-white p-4 shadow-sm flex items-center space-x-2">
            <User className="text-indigo-500" />
            <div>
              <h3 className="text-lg font-semibold">Child Status</h3>
              <p className="text-xl mt-2">{selectedStudent.Learner_Name} {selectedStudent.Learner_Surname}</p>
              <span className={`inline-block mt-1 px-2 py-1 text-sm rounded ${selectedStudent.Status === "Accepted" ? "bg-green-200 text-green-800" :
                selectedStudent.Status === "Waitlisted" ? "bg-yellow-200 text-yellow-800" :
                  "bg-red-200 text-red-800"
                }`}>
                {selectedStudent.Status}
              </span>
            </div>
          </div>

          {/* Bus Information Card */}
          {selectedStudent.Bus_ID && busData[selectedStudent.Bus_ID] && routes[busData[selectedStudent.Bus_ID].Route_ID] ? (
            <div className="rounded-lg border bg-white p-4 shadow-sm flex items-center space-x-2">
              <div className="flex items-start">
                <BusIcon className="text-indigo-500 h-5 w-5 mt-4" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Bus Information</h3>
                <p className="text-md mt-2">Bus {busData[selectedStudent.Bus_ID].Bus_ID}</p>
                <p className="text-sm text-gray-600">Route: {routes[busData[selectedStudent.Bus_ID].Route_ID].Route_Name}</p>
              </div>
            </div>
          ) : (
            <div className="rounded-lg border bg-white p-4 shadow-sm">
              <p className="text-md text-gray-500">No bus information available.</p>
            </div>
          )}

          {/* Pickup Information */}
          {selectedStudent.Bus_ID && busData[selectedStudent.Bus_ID] && routes[busData[selectedStudent.Bus_ID].Route_ID] ? (
            <>
              <div className="rounded-lg border bg-white p-4 shadow-sm flex items-center space-x-2">
                <div className="flex items-start">
                  <MapPin className="text-green-500 h-5 w-5 mt-4 stick" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Pickup Information</h3>
                  <p className="text-md mt-2">Pickup Point: {routes[busData[selectedStudent.Bus_ID].Route_ID].PickUp_No}</p>
                  <p className="text-sm text-gray-600">Pickup Time: {busData[selectedStudent.Bus_ID].PickUp_time}</p>
                </div>
              </div>

              <div className="rounded-lg border bg-white p-4 shadow-sm flex items-center space-x-2">
                <div className="flex items-start">
                  <MapPin className="text-red-500 h-5 w-5 mt-4" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Drop-off Information</h3>
                  <p className="text-md mt-2">Drop-off Point: {routes[busData[selectedStudent.Bus_ID].Route_ID].DropOff_No}</p>
                  <p className="text-sm text-gray-600">Drop-off Time: {busData[selectedStudent.Bus_ID].DropOff_time}</p>
                </div>
              </div>
            </>
          ) : (
            <div className="rounded-lg border bg-white p-4 shadow-sm">
              <p className="text-md text-gray-500">No route information available.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
