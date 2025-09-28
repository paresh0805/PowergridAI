// LiveMonitor.jsx
import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Label,
} from "recharts";
import {
  RefreshCw,
  PauseCircle,
  PlayCircle,
  AlertTriangle,
  Activity,
  Wind,
  Droplet,
} from "lucide-react";

export default function LiveMonitor() {
  const [isLive, setIsLive] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(new Date().toLocaleTimeString());
  const [sensorData, setSensorData] = useState({
    temperature: 34,
    humidity: 78,
    windSpeed: 12,
    equipmentTemp: 89,
    vibration: 2.3,
    powerQuality: 99.2,
  });

  const [riskData, setRiskData] = useState(
    Array.from({ length: 12 }, (_, i) => ({ time: `${i + 1}h`, value: Math.random() * 100 }))
  );
  const [costData, setCostData] = useState(
    Array.from({ length: 12 }, (_, i) => ({ time: `${i + 1}h`, value: (Math.random() * 10 - 5).toFixed(2) }))
  );

  // Live updates
  useEffect(() => {
    if (!isLive) return;
    const interval = setInterval(() => {
      setSensorData({
        temperature: 30 + Math.floor(Math.random() * 10),
        humidity: 70 + Math.floor(Math.random() * 10),
        windSpeed: 10 + Math.floor(Math.random() * 5),
        equipmentTemp: 85 + Math.floor(Math.random() * 10),
        vibration: (Math.random() * 3).toFixed(1),
        powerQuality: 98 + Math.random(),
      });
      setLastUpdated(new Date().toLocaleTimeString());
    }, 5000);

    return () => clearInterval(interval);
  }, [isLive]);

  return (
    <div className="h-screen overflow-y-auto bg-gray-100 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 sticky mt-0 bg-gray-100 z-10 py-2">
        <div className="flex items-center gap-3">
          {/* Pulsing dot */}
          <span
            className={`h-3 w-3 rounded-full ${isLive ? "bg-green-500 animate-pulse" : "bg-red-500"}`}
          ></span>
          <h1 className="text-xl font-bold text-gray-700 flex items-center gap-2">
            Live Updates Active
            <span
              key={lastUpdated}
              className="text-sm font-normal text-gray-500 transition-all duration-500"
            >
              Last updated: {lastUpdated}
            </span>
          </h1>
        </div>
        <div className="space-x-2 flex">
          <button
            onClick={() => setLastUpdated(new Date().toLocaleTimeString())}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 shadow"
          >
            <RefreshCw size={16} /> Refresh
          </button>
          <button
            onClick={() => setIsLive(!isLive)}
            className={`flex items-center gap-2 px-4 py-2 rounded shadow text-white ${
              isLive ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"
            }`}
          >
            {isLive ? <PauseCircle size={16} /> : <PlayCircle size={16} />}
            {isLive ? "Pause Live" : "Resume Live"}
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatCard
          title="Active Monitoring"
          value="95%"
          color="text-green-600"
          icon={<Activity size={20} />}
          subtitle="↑ 5% since yesterday"
        />
        <StatCard
          title="Avg Risk Score"
          value="98.9"
          color="text-red-600"
          icon={<AlertTriangle size={20} />}
          subtitle="High risk detected in 3 projects"
        />
        <StatCard
          title="Cost Variance"
          value="-7.8%"
          color="text-blue-600"
          icon={<RefreshCw size={20} />}
          subtitle="↓ 2.1% improvement in 24h"
        />
        <StatCard
          title="Critical Alerts"
          value="7"
          color="text-red-600"
          icon={<PauseCircle size={20} />}
          subtitle="2 new alerts today"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        <ChartCard title="Risk Score Trend (24h)">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={riskData} margin={{ top: 20, right: 30, left: 20, bottom: 30 }}>
              <defs>
                <linearGradient id="colorRisk" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#EF4444" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="time" tick={{ fontSize: 12, fill: "#6B7280" }}>
                <Label value="Time (hours)" offset={-5} position="insideBottom" />
              </XAxis>
              <YAxis tick={{ fontSize: 12, fill: "#6B7280" }}>
                <Label value="Risk Score" angle={-90} position="insideLeft" />
              </YAxis>
              <Tooltip
                contentStyle={{ backgroundColor: "#fff", borderRadius: "8px", border: "1px solid #E5E7EB" }}
                labelStyle={{ color: "#374151", fontWeight: "bold" }}
              />
              <Legend verticalAlign="top" height={36} />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#EF4444"
                strokeWidth={3}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
                fillOpacity={1}
                fill="url(#colorRisk)"
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Cost Variance (24h)">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={costData} margin={{ top: 20, right: 30, left: 20, bottom: 30 }}>
              <defs>
                <linearGradient id="colorCost" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="time" tick={{ fontSize: 12, fill: "#6B7280" }}>
                <Label value="Time (hours)" offset={-5} position="insideBottom" />
              </XAxis>
              <YAxis tick={{ fontSize: 12, fill: "#6B7280" }}>
                <Label value="Cost Variance %" angle={-90} position="insideLeft" />
              </YAxis>
              <Tooltip
                contentStyle={{ backgroundColor: "#fff", borderRadius: "8px", border: "1px solid #E5E7EB" }}
                labelStyle={{ color: "#374151", fontWeight: "bold" }}
              />
              <Legend verticalAlign="top" height={36} />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#3B82F6"
                strokeWidth={3}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
                fillOpacity={1}
                fill="url(#colorCost)"
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Projects */}
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h2 className="text-lg font-semibold mb-4 text-gray-700">Active Project Status</h2>
        <ProjectCard
          name="Mumbai Substation Phase II"
          location="Mumbai, Maharashtra"
          progress={66}
          budget="₹520 Cr / ₹780 Cr"
          timeline="8/12 months"
          alert="Material delivery delayed, Weather warning"
          severity="HIGH"
        />
        <ProjectCard
          name="Delhi-Agra Transmission Line"
          location="Delhi-Agra Corridor"
          progress={45}
          budget="₹320 Cr / ₹700 Cr"
          timeline="6/15 months"
          alert="Permit pending"
          severity="MEDIUM"
        />
        <ProjectCard
          name="Bangalore Underground Cable"
          location="Bangalore, Karnataka"
          progress={82}
          budget="₹142 Cr / ₹190 Cr"
          timeline="11/14 months"
          alert="Minor cable inspection pending"
          severity="LOW"
        />
      </div>

      {/* IoT Sensor Data */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4 text-gray-700">Live IoT Sensor Data</h2>
        <div className="grid grid-cols-3 gap-4">
          <SensorCard title="Temperature" value={sensorData.temperature + "°C"} status="normal" icon={<Activity />} />
          <SensorCard title="Humidity" value={sensorData.humidity + "%"} status="warning" icon={<Droplet />} />
          <SensorCard title="Wind Speed" value={sensorData.windSpeed + " km/h"} status="normal" icon={<Wind />} />
          <SensorCard title="Equipment Temp" value={sensorData.equipmentTemp + "°C"} status="critical" icon={<Activity />} />
          <SensorCard title="Vibration" value={sensorData.vibration + " mm/s"} status="warning" icon={<Activity />} />
          <SensorCard title="Power Quality" value={sensorData.powerQuality.toFixed(1) + "%"} status="normal" icon={<Activity />} />
        </div>
      </div>
    </div>
  );
}

/* ---------- Reusable Components ---------- */

// Stats card
const StatCard = ({ title, value, color, icon, subtitle }) => (
  <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition flex flex-col">
    <div className="flex items-center justify-between mb-2">
      <h2 className="text-gray-500 font-medium">{title}</h2>
      <div className={`p-2 rounded-full bg-gray-100 ${color}`}>{icon}</div>
    </div>
    <p className={`text-3xl font-bold ${color}`}>{value}</p>
    <p className="text-sm text-gray-400 mt-1">{subtitle}</p>
  </div>
);

// Chart card
const ChartCard = ({ title, children }) => (
  <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
    <h2 className="text-gray-700 font-semibold mb-4">{title}</h2>
    {children}
  </div>
);

// Project card
const ProjectCard = ({ name, location, progress, budget, timeline, alert, severity }) => {
  const severityColors = { HIGH: "bg-red-100 text-red-600", MEDIUM: "bg-yellow-100 text-yellow-600", LOW: "bg-green-100 text-green-600" };
  return (
    <div className="mb-6 border-b pb-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-semibold text-gray-700">{name}</h3>
        <span className={`px-3 py-1 rounded-full text-sm ${severityColors[severity]}`}>{severity}</span>
      </div>
      <p className="text-sm text-gray-500">{location}</p>
      <p className="text-sm text-gray-500">Budget: {budget} | Timeline: {timeline}</p>
      <p className="text-sm mt-1 text-red-500 flex items-center gap-1">
        <AlertTriangle size={14} /> {alert}
      </p>
      <div className="w-full bg-gray-200 rounded h-2 mt-2">
        <div className="bg-blue-600 h-2 rounded" style={{ width: `${progress}%` }}></div>
      </div>
    </div>
  );
};

// Sensor card
const SensorCard = ({ title, value, status, icon }) => {
  const statusMap = { normal: { color: "text-green-600", badge: "Normal" }, warning: { color: "text-yellow-600", badge: "Warning" }, critical: { color: "text-red-600", badge: "Critical" } };
  return (
    <div className="p-4 border rounded-lg hover:shadow-md transition">
      <div className="flex justify-between items-center">
        <h3 className="text-gray-600 flex items-center gap-2">
          {icon} {title}
        </h3>
        <span className={`text-xs px-2 py-1 rounded-full ${statusMap[status].color} bg-gray-100`}>
          {statusMap[status].badge}
        </span>
      </div>
      <p className={`text-2xl font-bold mt-2 ${statusMap[status].color}`}>{value}</p>
    </div>
  );
};
