import { Bell, UserCircle } from "lucide-react";
import { useState } from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer
} from "recharts";

export default function Dashboard() {
  const [showAlert, setShowAlert] = useState(true);

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
      <div className="flex justify-between items-center bg-white shadow-md px-6 py-3 sticky top-0 z-50">
        <div className="font-semibold text-lg text-gray-700">
          Project Cost & Timeline Prediction System
        </div>
        <div className="flex items-center gap-4">
          <button className="relative p-2 rounded-full hover:bg-gray-100 transition">
            <Bell size={22} className="text-gray-600" />
            <span className="absolute top-1 right-1 bg-red-500 text-white text-xs px-1 rounded-full">2</span>
          </button>
          <button className="flex items-center gap-2 hover:bg-gray-100 px-3 py-2 rounded-lg transition">
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
        <div className="bg-orange-100 border-l-4 border-orange-500 text-orange-800 p-4 m-4 rounded-lg flex justify-between items-center shadow-md transition">
          <span className="text-sm font-medium">⚠️ High Risk Alert: 1 project showing potential cost overrun above 15%.</span>
          <div className="flex items-center gap-4 ml-auto">
            <a href="#" className="text-blue-600 font-medium hover:underline text-sm">View details</a>
            <button onClick={() => setShowAlert(false)} className="text-sm text-gray-500 hover:text-gray-700">✖</button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="grid grid-cols-4 gap-6 p-4 flex-1 overflow-y-auto">
        {/* Summary Cards */}
        {[
          { 
            label: "Active Projects", 
            value: "95", 
            color: "bg-blue-50", 
            textColor: "text-blue-600",
            change: "+5", 
            trend: "up"
          },
          { 
            label: "Average Cost Accuracy", 
            value: "87.3%", 
            color: "bg-green-50", 
            textColor: "text-green-600",
            change: "-2%", 
            trend: "down"
          },
          { 
            label: "Timeline Accuracy", 
            value: "82.7%", 
            color: "bg-purple-50", 
            textColor: "text-purple-600",
            change: "+3%", 
            trend: "up"
          },
          { 
            label: "Risk Score", 
            value: "6.8", 
            color: "bg-orange-50", 
            textColor: "text-orange-600",
            change: "⚠", 
            trend: "neutral"
          },
        ].map((card, idx) => (
          <div key={idx} className={`col-span-1 ${card.color} shadow-md rounded-lg p-4 hover:scale-105 transition transform relative`}>
            <p className="text-sm text-gray-500">{card.label}</p>
            <div className="flex items-center gap-2 mt-1">
              <h2 className={`text-2xl font-semibold ${card.textColor}`}>{card.value}</h2>
              {card.trend === "up" && <span className="text-green-500 font-bold">▲ {card.change}</span>}
              {card.trend === "down" && <span className="text-red-500 font-bold">▼ {card.change}</span>}
              {card.trend === "neutral" && <span className="text-gray-500 font-semibold">{card.change}</span>}
            </div>
            <p className="text-xs text-gray-400 mt-1">vs last month</p>
          </div>
        ))}

        {/* Cost Prediction Line Chart */}
        <div className="col-span-2 bg-white shadow-md rounded-lg p-4">
          <h3 className="font-medium mb-2 text-gray-700 text-center">Cost Prediction vs Actual</h3>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={costData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend verticalAlign="top" height={36} />
              <Line type="monotone" dataKey="predicted" stroke="#8884d8" strokeWidth={2} name="Predicted" />
              <Line type="monotone" dataKey="actual" stroke="#82ca9d" strokeWidth={2} name="Actual" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Projects Horizontal Bar Chart */}
        <div className="col-span-2 bg-white shadow-md rounded-lg p-4 flex flex-col items-center">
          <h3 className="font-medium mb-2 text-gray-700 text-center">Projects by Type</h3>
          <div className="w-full max-w-xl h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                layout="vertical"
                data={projectsData}
                margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis type="number" tick={{ fill: '#4B5563', fontSize: 12 }} label={{ value: 'Number of Projects', position: 'insideBottom', offset: -5 }} />
                <YAxis
                  type="category"
                  dataKey="type"
                  tick={{ fill: '#4B5563', fontSize: 12, fontWeight: 500 }}
                  width={180}
                />
                <Tooltip cursor={{ fill: 'rgba(0,0,0,0.05)' }} formatter={(value) => [`${value} projects`, 'Count']} />
                <Bar dataKey="count" barSize={28} radius={[5,5,5,5]}>
                  {projectsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={['#8884d8', '#82ca9d', '#ffc658', '#ff7f50'][index % 4]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Risk Alerts */}
        <div className="col-span-2 bg-white shadow-md rounded-lg p-4">
          <h3 className="font-medium mb-2 text-gray-700 text-center">Recent Risk Alerts</h3>
          <ul className="space-y-2">
            {[
              { text: "Manual Substation Phase II – Cost Overrun", bg: "bg-red-50", border: "border-red-500" },
              { text: "Delhi Apex Transmission Line – Timeline Delay", bg: "bg-yellow-50", border: "border-yellow-500" },
              { text: "Bangalore Underground Cable – Material Shortage", bg: "bg-blue-50", border: "border-blue-500" },
              { text: "Pune Grid Expansion – Weather Impact", bg: "bg-green-50", border: "border-green-500" },
            ].map((alert, idx) => (
              <li key={idx} className={`p-2 ${alert.bg} border-l-4 ${alert.border} rounded-md`}>
                {alert.text}
              </li>
            ))}
          </ul>
        </div>

        {/* Risk Distribution Pie Chart */}
        <div className="col-span-2 bg-white shadow-md rounded-lg p-4">
          <h3 className="font-medium mb-2 text-gray-700 text-center">Risk Distribution</h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={riskData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={70}
                label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
              >
                {riskData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value, name) => [`${value}`, `${name}`]} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
