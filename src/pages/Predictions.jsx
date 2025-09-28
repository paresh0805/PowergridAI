import React from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Label,
} from "recharts";
import {
  TrendingUp,
  Clock,
  DollarSign,
  FileText,
  AlertTriangle,
  CalendarDays,
} from "lucide-react";

const timelineData = [
  { month: "Month 1", planned: 0, predicted: 0 },
  { month: "Month 3", planned: 15, predicted: 20 },
  { month: "Month 6", planned: 35, predicted: 40 },
  { month: "Month 9", planned: 55, predicted: 60 },
  { month: "Month 12", planned: 75, predicted: 80 },
  { month: "Month 15", planned: 90, predicted: 95 },
  { month: "Month 18", planned: 100, predicted: 100 },
];

const costBreakdown = [
  { category: "Materials", planned: 1200, actual: 1400 },
  { category: "Labor", planned: 800, actual: 950 },
  { category: "Equipment", planned: 500, actual: 600 },
  { category: "Permits", planned: 200, actual: 250 },
  { category: "Contingency", planned: 300, actual: 350 },
];

const riskImpact = [
  { factor: "Material Costs", impact: 90 },
  { factor: "Labor", impact: 70 },
  { factor: "Vendor", impact: 60 },
  { factor: "Equipment", impact: 65 },
  { factor: "Permits", impact: 50 },
  { factor: "Weather", impact: 80 },
];

const risks = [
  { label: "Material price volatility", level: "High" },
  { label: "Monsoon season delays", level: "High" },
  { label: "Regulatory approvals", level: "Medium" },
  { label: "Vendor performance", level: "Medium" },
];

const Predictions = () => {
  return (
    <div className="h-screen overflow-y-auto bg-gray-50 p-6 space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl shadow-md border">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center space-x-2">
          <CalendarDays className="text-blue-600 w-6 h-6" />
          <span>Project: Mumbai Pune Transmission Line</span>
        </h1>
        <p className="text-gray-600 mt-1">
          Overhead line • Maharashtra • ₹1657 Cr
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Duration: <span className="font-semibold">12 months</span> | Team Size:{" "}
          <span className="font-semibold">100 members</span>
        </p>
        <p className="text-sm mt-1 text-yellow-600 font-semibold">
          Risk Level: MEDIUM
        </p>
      </div>

      {/* Cards Section */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-green-50 border rounded-2xl p-6 shadow flex items-center space-x-4">
          <DollarSign className="text-green-600 w-8 h-8" />
          <div>
            <h3 className="font-bold text-gray-700">Cost Prediction</h3>
            <p className="text-lg font-semibold text-green-700">+9.9%</p>
            <p className="text-sm text-gray-500">
              Estimated overrun ₹1819 Cr
            </p>
          </div>
        </div>

        <div className="bg-blue-50 border rounded-2xl p-6 shadow flex items-center space-x-4">
          <Clock className="text-blue-600 w-8 h-8" />
          <div>
            <h3 className="font-bold text-gray-700">Timeline Prediction</h3>
            <p className="text-lg font-semibold text-blue-700">+4.7%</p>
            <p className="text-sm text-gray-500">Additional 0.6 months</p>
          </div>
        </div>

        <div className="bg-yellow-50 border rounded-2xl p-6 shadow flex items-center space-x-4">
          <TrendingUp className="text-yellow-600 w-8 h-8" />
          <div>
            <h3 className="font-bold text-gray-700">AI Insights</h3>
            <p className="text-sm text-gray-600">
              Based on 50+ projects (87% confidence)
            </p>
          </div>
        </div>
      </div>

      {/* Graphs */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Timeline Forecast */}
        <div className="bg-white p-6 rounded-2xl shadow-md border">
          <h2 className="font-bold text-lg text-gray-800 mb-4">
            Timeline Forecast (Planned vs Predicted)
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={timelineData}>
              <CartesianGrid stroke="#e5e7eb" />
              <XAxis dataKey="month">
                <Label value="Project Duration" offset={-5} position="insideBottom" />
              </XAxis>
              <YAxis>
                <Label
                  value="Completion (%)"
                  angle={-90}
                  position="insideLeft"
                  style={{ textAnchor: "middle" }}
                />
              </YAxis>
              <Tooltip />
              <Line
                type="monotone"
                dataKey="planned"
                stroke="#3b82f6"
                strokeWidth={2}
                name="Planned"
              />
              <Line
                type="monotone"
                dataKey="predicted"
                stroke="#ef4444"
                strokeWidth={2}
                name="Predicted"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Cost Breakdown */}
        <div className="bg-white p-6 rounded-2xl shadow-md border">
          <h2 className="font-bold text-lg text-gray-800 mb-4">
            Cost Breakdown Analysis
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={costBreakdown}>
              <CartesianGrid stroke="#e5e7eb" />
              <XAxis dataKey="category">
                <Label value="Cost Categories" offset={-5} position="insideBottom" />
              </XAxis>
              <YAxis>
                <Label
                  value="Cost (₹ Cr)"
                  angle={-90}
                  position="insideLeft"
                  style={{ textAnchor: "middle" }}
                />
              </YAxis>
              <Tooltip />
              <Bar dataKey="planned" fill="#3b82f6" name="Planned Cost" />
              <Bar dataKey="actual" fill="#ef4444" name="Actual Cost" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Risk Analysis */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Radar Risk */}
        <div className="bg-white p-6 rounded-2xl shadow-md border">
          <h2 className="font-bold text-lg text-gray-800 mb-4">
            Risk Factor Impact
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart outerRadius={100} data={riskImpact}>
              <PolarGrid />
              <PolarAngleAxis dataKey="factor" />
              <PolarRadiusAxis />
              <Radar
                name="Impact Score"
                dataKey="impact"
                stroke="#ef4444"
                fill="#ef4444"
                fillOpacity={0.6}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Key Risks */}
        <div className="bg-white p-6 rounded-2xl shadow-md border">
          <h2 className="font-bold text-lg text-gray-800 mb-4 flex items-center space-x-2">
            <AlertTriangle className="text-red-600 w-5 h-5" />
            <span>Key Risk Factors</span>
          </h2>
          <ul className="space-y-3">
            {risks.map((risk, index) => (
              <li
                key={index}
                className={`p-3 rounded-lg border flex items-center justify-between ${
                  risk.level === "High"
                    ? "bg-red-50 border-red-200 text-red-700"
                    : "bg-yellow-50 border-yellow-200 text-yellow-700"
                }`}
              >
                <span className="font-medium">{risk.label}</span>
                <span className="px-3 py-1 rounded-full text-sm font-semibold bg-white shadow">
                  {risk.level}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-green-50 border rounded-2xl p-6 shadow-md">
        <h2 className="font-bold text-lg text-gray-800 mb-3 flex items-center space-x-2">
          <FileText className="text-green-600" />
          <span>AI Recommendations</span>
        </h2>
        <ul className="list-disc pl-6 space-y-1 text-gray-700">
          <li>Lock-in material prices early to avoid 15% volatility risk</li>
          <li>Consider alternative suppliers for high-risk components</li>
          <li>Implement phased procurement strategy</li>
          <li>Review contingency allocation for permit-related delays</li>
        </ul>
      </div>
    </div>
  );
};

export default Predictions;
