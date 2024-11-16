"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Student } from "../../lib/types";
import axios from "axios";
export default function ParentDashboard() {
  const baseUrl = "http://localhost:5000";
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

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
    fetchStudents();
  }, []);

  return (
    <div>
      <div className="rounded-xl bg-white shadow-sm">
        <div className="p-6">
          <h2 className="text-lg font-semibold justify-between">
            Learner list
          </h2>
          <div className="flex space-x-2">
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
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b text-left text-sm font-medium text-gray-500">
                <th className="pb-3">Learner ID</th>
                <th className="pb-3">learner Name</th>
                <th className="pb-3">learner Surname</th>
                <th className="pb-3">learner Cell Number</th>
                <th className="pb-3">learner Grade</th>
                <th className="pb-3">learner Pickup Time</th>
                <th className="pb-3">learner Drop-off Time</th>
                <th className="pb-3">learner Status</th>
              </tr>
            </thead>
            <tbody>
                {students.map((student) => (
                    <tr key={student.Learner_ID} className="border-b">
                        <td className="py-3">{student.Learner_ID}</td>
                        <td className="py-3">{student.Learner_Name}</td>
                        <td className="py-3">{student.Learner_Surname}</td>
                        <td className="py-3">{student.Learner_CellNo}</td>
                        <td className="py-3">{student.Learner_Grade}</td>
                        <td className="py-3"></td>
                        <td className="py-3"></td>
                        <td className="py-3">{student.Status}</td>
                    </tr>
))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
