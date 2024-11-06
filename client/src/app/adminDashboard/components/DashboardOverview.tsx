"use client"

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, CartesianGrid, Legend, ResponsiveContainer
} from 'recharts';

type DataType = {
  admins: any[];
  buses: any[];
  learners: any[];
  parents: any[];
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF6384', '#9966FF'];

export default function DashboardOverview() {
  const [data, setData] = useState<DataType>({
    admins: [],
    buses: [],
    learners: [],
    parents: [],
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [adminsRes, busesRes, learnersRes, parentsRes] = await Promise.all([
        axios.get('http://localhost:5000/admin/admins'),
        axios.get('http://localhost:5000/bus/buses'),
        axios.get('http://localhost:5000/learner/learners'),
        axios.get('http://localhost:5000/parent/parents'),
        
      ]);

      setData({
        admins:adminsRes.data,
        buses: busesRes.data,
        learners: learnersRes.data,
        parents:parentsRes.data,
       });
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Error loading data');
    } finally {
      setLoading(false);
    }
  };

  const pieData = [
    { name: 'Admins', value: data.admins.length},
    { name: 'buses', value: data.buses.length },
    { name: 'learners', value: data.learners.length },
    { name: 'parents', value: data.parents.length },
    ];

  const barData = [
    { name: 'Admins', count: data.admins.length},
    { name: 'buses', count: data.buses.length },
    { name: 'learners', count: data.learners.length },
    { name: 'parents', count: data.parents.length },
    ];
9
  const userCount = data.admins.length + data.buses.length + data.learners.length + data.parents.length;
//   const activeUsers = data.learners.filter(user => user.status === 'active').length;
//   const restrictedUsers = data.users.filter(user => user.status === 'restricted').length;

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">Dashboard Overview</h1>
      <button
        onClick={fetchData}
        className="mb-4 px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 transition"
      >
        Refresh Data
      </button>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="loader"></div>
        </div>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="transform transition duration-300 hover:scale-105 hover:shadow-lg p-4 border rounded-lg">
            <h2 className="text-lg font-semibold mb-2">Data Overview (Pie Chart)</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="transform transition duration-300 hover:scale-105 hover:shadow-lg p-4 border rounded-lg">
            <h2 className="text-lg font-semibold mb-2">Data Overview (Bar Chart)</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
}
