import { Bell, UserCircle } from "lucide-react";
import { useState } from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer
} from "recharts";

export default function Dashboard() {
  const [showAlert, setShowAlert] = useState(true);

  // Sample data for dynamic charts
  const costData = [
    { month: 'Jan', predicted: 50, actual: 48 },
    { month: 'Feb', predicted: 55, actual: 60 },
    { month: 'Mar', predicted: 60, actual: 62 },
    { month: 'Apr', predicted: 65, actual: 63 },
    { month: 'May', predicted: 70, actual: 72 },
  ];

  const projectsData = [
    { type: 'Substation', count: 40 },
    { type: 'Overhead Line', count: 30 },
    { type: 'Underground Cable', count: 25 },
    { type: 'Renewable Integration', count: 10 },
  ];

  const riskData = [
    { name: 'High', value: 20 },
    { name: 'Medium', value: 50 },
    { name: 'Low', value: 30 },
  ];

  const COLORS = ['#FF4D4F', '#FFA500', '#4CAF50'];

  return (
    <div className="flex flex-col w-full h-screen bg-gray-50">
      {/* Top Navbar */}
      <div className="flex justify-between items-center bg-white shadow px-6 py-3">
        <div className="font-semibold text-lg text-gray-700">
          Project Cost & Timeline Prediction System
        </div>
        <div className="flex items-center gap-4">
          <button className="relative p-2 rounded-full hover:bg-gray-100">
            <Bell size={22} className="text-gray-600" />
            <span className="absolute top-1 right-1 bg-red-500 text-white text-xs px-1 rounded-full">2</span>
          </button>
          <button className="flex items-center gap-2 hover:bg-gray-100 px-3 py-2 rounded-lg">
            <UserCircle size={28} className="text-blue-600" />
            <div className="hidden md:block text-left">
              <p className="text-sm font-medium">POWERGRID Admin</p>
              <p className="text-xs text-gray-500">Project Manager</p>
            </div>
          </button>
        </div>
      </div>

      {/* High Risk Alert */}
      {showAlert && (
        <div className="bg-orange-100 border-l-4 border-orange-500 text-orange-800 p-4 m-4 rounded-lg flex justify-between items-center">
          <span>⚠️ High Risk Alert: 1 project showing potential cost overrun above 15%.</span>
          <div className="flex items-center gap-4 ml-auto">
            <a href="#" className="text-blue-600 font-medium hover:underline">View details</a>
            <button onClick={() => setShowAlert(false)} className="text-sm text-gray-500 hover:text-gray-700">✖</button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="grid grid-cols-4 gap-4 p-4 flex-1 overflow-y-auto">
        {/* Summary Cards */}
        <div className="col-span-1 bg-white shadow rounded-lg p-4">
          <p className="text-sm text-gray-500">Active Projects</p>
          <h2 className="text-2xl font-semibold">95</h2>
        </div>
        <div className="col-span-1 bg-white shadow rounded-lg p-4">
          <p className="text-sm text-gray-500">Average Cost Accuracy</p>
          <h2 className="text-2xl font-semibold">87.3%</h2>
        </div>
        <div className="col-span-1 bg-white shadow rounded-lg p-4">
          <p className="text-sm text-gray-500">Timeline Accuracy</p>
          <h2 className="text-2xl font-semibold">82.7%</h2>
        </div>
        <div className="col-span-1 bg-white shadow rounded-lg p-4">
          <p className="text-sm text-gray-500">Risk Score</p>
          <h2 className="text-2xl font-semibold text-orange-500">6.8</h2>
        </div>

        {/* Cost Prediction Line Chart */}
        <div className="col-span-2 bg-white shadow rounded-lg p-4">
          <h3 className="font-medium mb-2">Cost Prediction vs Actual</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={costData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="predicted" stroke="#8884d8" strokeWidth={2} />
              <Line type="monotone" dataKey="actual" stroke="#82ca9d" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Projects Horizontal Bar Chart */}
        <div className="col-span-2 bg-white shadow rounded-lg p-4">
        <h3 className="font-medium mb-2">Projects by Type</h3>
        <ResponsiveContainer width="100%" height={200}>
            <BarChart
            layout="vertical"   // Horizontal bars
            data={projectsData}
            margin={{ left: 50, right: 20 }}
            >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis type="category" dataKey="type" />
            <Tooltip />
            <Bar dataKey="count" fill="#8884d8" barSize={20} />
            </BarChart>
        </ResponsiveContainer>
        </div>


        {/* Recent Risk Alerts */}
        <div className="col-span-2 bg-white shadow rounded-lg p-4">
          <h3 className="font-medium mb-2">Recent Risk Alerts</h3>
          <ul className="space-y-2">
            <li className="p-2 bg-red-50 border-l-4 border-red-500">Manual Substation Phase II – Cost Overrun</li>
            <li className="p-2 bg-yellow-50 border-l-4 border-yellow-500">Delhi Apex Transmission Line – Timeline Delay</li>
            <li className="p-2 bg-blue-50 border-l-4 border-blue-500">Bangalore Underground Cable – Material Shortage</li>
            <li className="p-2 bg-green-50 border-l-4 border-green-500">Pune Grid Expansion – Weather Impact</li>
          </ul>
        </div>

        {/* Risk Distribution Pie Chart */}
        <div className="col-span-2 bg-white shadow rounded-lg p-4">
        <h3 className="font-medium mb-2">Risk Distribution</h3>
        <ResponsiveContainer width="100%" height={200}>
            <PieChart>
            <Pie
                data={riskData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={70}
                fill="#8884d8"
                label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`} 
            >
                {riskData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
            </Pie>
            <Tooltip 
                formatter={(value, name) => [`${value}`, `${name}`]} 
            />
            </PieChart>
        </ResponsiveContainer>
        </div>

      </div>
    </div>
  );
}
