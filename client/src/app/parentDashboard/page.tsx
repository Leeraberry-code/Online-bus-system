"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { PlusCircle } from "lucide-react";

export default function ParentDashboard() {
  const baseUrl = "http://localhost:5000";
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [newLearner, setNewLearner] = useState({
    Learner_Name: "",
    Learner_Surname: "",
    Learner_CellNo: "",
    Learner_Grade: "",
  });

  // Fetch learners from the server
  const fetchStudents = async (refresh = false) => {
    try {
      const user_id = localStorage.getItem("user_id");
      if (!user_id) throw new Error("Parent ID not found. Please log in again.");

      if (refresh) setLoading(true);

      const response = await axios.get(`${baseUrl}/learner/learners/parent/${user_id}`);
      if (response.status === 200) {
        setStudents(response.data);  
      } else {
        setError("Failed to fetch learners.");
        console.log("Error fetching learners:", response.status, response.data);
        setStudents([]);
      }
    } catch (err: any) {
      setError(err?.response?.data?.message || err.message || "Failed to fetch learners."); // Show specific error from server if available
    } finally {
      setLoading(false);
    }
  };

  // Handle learner deletion
  const handleDeleteLearner = async (learnerId: number) => {
    if (!window.confirm("Are you sure you want to withdraw this application?")) return;

    try {
      const response = await axios.delete(`${baseUrl}/learner/learners/${learnerId}`);
      if (response.status === 200) {
        setStudents((prev) => prev.filter((learner) => learner.Learner_ID !== learnerId));
        alert("Application withdrawn successfully.");
      }
    } catch (err: any) {
      setError(err.message || "Failed to withdraw application.");
    }
  };

  // Handle new learner form submission
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const user_id = localStorage.getItem("user_id");
    if (!user_id) {
      setError("Parent ID not found. Please log in again.");
      return;
    }

    const newLearnerOptimistic = {
      ...newLearner,
      Learner_ID: null, // No temporary ID
      Parent_ID: parseInt(user_id, 10),
      Status: "Waitlisted",
      pending: true, // Visual indicator for a pending state
    };

    // Optimistically add the learner to the state
    setStudents((prev) => [...prev, newLearnerOptimistic]);
    setShowForm(false);
    setNewLearner({
      Learner_Name: "",
      Learner_Surname: "",
      Learner_CellNo: "",
      Learner_Grade: "",
    });

    try {
      const response = await axios.post(`${baseUrl}/learner/learners`, {
        ...newLearner,
        Parent_ID: parseInt(user_id, 10),
        Status: "Waitlisted",
      });

      if (response.status === 201) {
        // Refresh the entire list after receiving backend data
        fetchStudents(true);
      }
    } catch (err: any) {
      setError(err.message || "Failed to create learner.");
      setStudents((prev) =>
        prev.filter((s) => s.Learner_Name !== newLearnerOptimistic.Learner_Name)
      );
    }
  };

  // Fetch learners on component mount and set up interval polling
  useEffect(() => {
    fetchStudents();
    const interval = setInterval(() => {
      fetchStudents(); // Fetch updated learners every 30 seconds
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6">
      <div className="rounded-xl bg-white shadow-sm mb-6">
        <div className="p-6 flex justify-between items-center">
          <h2 className="text-lg font-semibold mb-4">Learner List</h2>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-indigo-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-indigo-600"
          >
            <PlusCircle className="h-5 w-5" />
            <span>Add Learner</span>
          </button>
        </div>

        {showForm && (
          <div className="mb-6 p-4 bg-gray-100 rounded-lg shadow-sm">
            <h3 className="text-md font-semibold mb-4">Create New Learner</h3>
            <form onSubmit={handleFormSubmit} className="grid gap-4">
              <input
                type="text"
                placeholder="Learner Name"
                value={newLearner.Learner_Name}
                onChange={(e) =>
                  setNewLearner({ ...newLearner, Learner_Name: e.target.value })
                }
                required
                className="rounded-lg border px-4 py-2"
              />
              <input
                type="text"
                placeholder="Learner Surname"
                value={newLearner.Learner_Surname}
                onChange={(e) =>
                  setNewLearner({ ...newLearner, Learner_Surname: e.target.value })
                }
                required
                className="rounded-lg border px-4 py-2"
              />
              <input
                type="tel"
                placeholder="Learner Cell No"
                value={newLearner.Learner_CellNo}
                onChange={(e) =>
                  setNewLearner({ ...newLearner, Learner_CellNo: e.target.value })
                }
                required
                className="rounded-lg border px-4 py-2"
              />
              <input
                type="text"
                placeholder="Learner Grade"
                value={newLearner.Learner_Grade}
                onChange={(e) =>
                  setNewLearner({ ...newLearner, Learner_Grade: e.target.value })
                }
                required
                className="rounded-lg border px-4 py-2"
              />
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
              >
                Save Learner
              </button>
            </form>
          </div>
        )}

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
              {loading ? (
                <tr>
                  <td colSpan={6} className="text-center py-4">Loading...</td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan={6} className="text-center text-red-500 py-4">{error}</td>
                </tr>
              ) : students.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-4">No learners found.</td>
                </tr>
              ) : (
                students.map((student) => (
                  <tr
                    key={student.Learner_ID || student.Learner_Name}
                    className={`border-b hover:bg-gray-100 ${student.pending ? "opacity-50" : ""}`}
                  >
                    <td className="py-3">{student.Learner_ID || "Pending..."}</td>
                    <td className="py-3">{student.Learner_Name}</td>
                    <td className="py-3">{student.Learner_Surname}</td>
                    <td className="py-3">{student.Learner_CellNo}</td>
                    <td className="py-3">{student.Learner_Grade}</td>
                    <td className="py-3">{student.Status}</td>
                    <td className="py-3">
                      <button
                        onClick={() => handleDeleteLearner(student.Learner_ID)}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
