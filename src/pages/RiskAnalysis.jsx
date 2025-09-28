import React, { useState, useEffect } from "react";

// Top 3 summary cards
const topCards = [
  { title: "Overall Risk Score", value: "6.8", label: "Medium Risk" },
  { title: "High Risk Projects", value: "23", label: "Require immediate attention" },
  { title: "Risk Trend", value: "+12%", label: "vs last quarter" },
];

// Bottom section data for India-focused projects
const bottomData = {
  "Risk Factors": [
    {
      title: "Financial Risks",
      risks: [
        { name: "Material Price Volatility", value: 75, level: "High" },
        { name: "Labour Cost Variation", value: 60, level: "Medium" },
        { name: "Budget Overrun History", value: 40, level: "Low" },
        { name: "Demand-Supply Scenario Impact", value: 55, level: "Medium" },
      ],
    },
    {
      title: "Environmental Risks",
      risks: [
        { name: "Monsoon Delays", value: 85, level: "High" },
        { name: "Flood/Seismic Zones", value: 50, level: "Medium" },
        { name: "Extreme Weather Events", value: 60, level: "Medium" },
        { name: "Terrain Challenges", value: 35, level: "Low" },
      ],
    },
    {
      title: "Operational Risks",
      risks: [
        { name: "Skilled Manpower Shortage", value: 70, level: "High" },
        { name: "Equipment Availability", value: 55, level: "Medium" },
        { name: "Vendor Performance", value: 50, level: "Medium" },
        { name: "Resource Allocation Issues", value: 35, level: "Low" },
      ],
    },
    {
      title: "Regulatory Risks",
      risks: [
        { name: "Permit Delays", value: 65, level: "Medium" },
        { name: "Environmental Clearance", value: 55, level: "Medium" },
        { name: "Policy Changes", value: 80, level: "High" },
        { name: "Land Acquisition Issues", value: 45, level: "Medium" },
      ],
    },
  ],
  "Geographic Risk Map": [
    {
      title: "Northern India",
      risks: [
        { name: "Monsoon Floods", value: 70, level: "High" },
        { name: "Seismic Zones", value: 50, level: "Medium" },
        { name: "Labour Availability", value: 55, level: "Medium" },
        { name: "Equipment Shortage", value: 40, level: "Low" },
      ],
    },
    {
      title: "Southern India",
      risks: [
        { name: "Heavy Rainfall", value: 65, level: "Medium" },
        { name: "Material Transport Delay", value: 60, level: "Medium" },
        { name: "Vendor Performance", value: 50, level: "Medium" },
        { name: "Regulatory Clearance", value: 45, level: "Medium" },
      ],
    },
    {
      title: "Eastern India",
      risks: [
        { name: "Flood Risk", value: 75, level: "High" },
        { name: "Labour Shortage", value: 55, level: "Medium" },
        { name: "Budget Overruns", value: 50, level: "Medium" },
        { name: "Equipment Availability", value: 40, level: "Low" },
      ],
    },
    {
      title: "Western India",
      risks: [
        { name: "Material Price Volatility", value: 70, level: "High" },
        { name: "Extreme Heat Events", value: 55, level: "Medium" },
        { name: "Vendor Delays", value: 50, level: "Medium" },
        { name: "Land Acquisition Issues", value: 45, level: "Medium" },
      ],
    },
  ],
  "Scenario Analysis": [
    {
      title: "Best Case",
      risks: [
        { name: "Financial Risk", value: 25, level: "Low" },
        { name: "Environmental Risk", value: 20, level: "Low" },
        { name: "Operational Risk", value: 30, level: "Low" },
        { name: "Regulatory Risk", value: 15, level: "Low" },
      ],
    },
    {
      title: "Most Likely Case",
      risks: [
        { name: "Financial Risk", value: 55, level: "Medium" },
        { name: "Environmental Risk", value: 50, level: "Medium" },
        { name: "Operational Risk", value: 60, level: "Medium" },
        { name: "Regulatory Risk", value: 45, level: "Medium" },
      ],
    },
    {
      title: "Worst Case",
      risks: [
        { name: "Financial Risk", value: 85, level: "High" },
        { name: "Environmental Risk", value: 80, level: "High" },
        { name: "Operational Risk", value: 90, level: "High" },
        { name: "Regulatory Risk", value: 75, level: "High" },
      ],
    },
    {
      title: "Extreme Case",
      risks: [
        { name: "Financial Risk", value: 95, level: "High" },
        { name: "Environmental Risk", value: 90, level: "High" },
        { name: "Operational Risk", value: 95, level: "High" },
        { name: "Regulatory Risk", value: 85, level: "High" },
      ],
    },
  ],
};

export default function RiskAnalysis() {
  const [activeTab, setActiveTab] = useState("Risk Factors");
  const [animatedValues, setAnimatedValues] = useState({});
  const [forecastTime, setForecastTime] = useState(6);
  const [riskThreshold, setRiskThreshold] = useState(60);

  const levelColors = {
    High: "bg-red-500",
    Medium: "bg-orange-500",
    Low: "bg-green-500",
  };

  useEffect(() => {
    // Animate progress bars
    const newValues = {};
    bottomData[activeTab].forEach((card) => {
      card.risks.forEach((risk) => {
        newValues[risk.name] = 0;
      });
    });
    setAnimatedValues(newValues);

    const interval = setInterval(() => {
      setAnimatedValues((prev) => {
        const updated = { ...prev };
        let done = true;
        bottomData[activeTab].forEach((card) => {
          card.risks.forEach((risk) => {
            if (updated[risk.name] < risk.value) {
              updated[risk.name] += 2;
              if (updated[risk.name] > risk.value) updated[risk.name] = risk.value;
              done = false;
            }
          });
        });
        if (done) clearInterval(interval);
        return updated;
      });
    }, 20);

    return () => clearInterval(interval);
  }, [activeTab]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Top Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {topCards.map((card) => (
          <div
            key={card.title}
            className="bg-white shadow-lg rounded-xl p-5 hover:shadow-2xl transition-shadow duration-300"
          >
            <h3 className="text-gray-500 text-sm">{card.title}</h3>
            <p className="text-2xl font-bold">{card.value}</p>
            <span className="text-gray-400 text-sm">{card.label}</span>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="mb-6">
        <div className="flex space-x-4">
          {Object.keys(bottomData).map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                activeTab === tab
                  ? "bg-blue-600 text-white shadow"
                  : "bg-white text-gray-700 shadow hover:bg-gray-100"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Bottom Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {bottomData[activeTab].map((card) => (
          <div
            key={card.title}
            className="bg-white shadow-lg rounded-xl p-5 hover:shadow-2xl transition-shadow duration-300"
          >
            <h3 className="text-gray-700 font-semibold mb-4">{card.title}</h3>
            {card.risks.map((risk) => (
              <div key={risk.name} className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span>{risk.name}</span>
                  <span className={`font-semibold text-${risk.level.toLowerCase()}-500`}>
                    {risk.level}
                  </span>
                </div>
                <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                  <div
                    className={`${levelColors[risk.level]} h-2 rounded-full transition-all duration-500`}
                    style={{ width: `${animatedValues[risk.name] || 0}%` }}
                  ></div>
                </div>
                <div className="text-right text-xs text-gray-500 mt-1">
                  {animatedValues[risk.name] ? Math.round(animatedValues[risk.name]) : 0}%
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Scenario Analysis Panel */}
      {activeTab === "Scenario Analysis" && (
        <div className="bg-white shadow-lg rounded-xl p-6 mt-6">
          <h3 className="text-gray-700 font-semibold mb-4">Risk Scenario Modeling</h3>
          <p className="text-gray-500 text-sm mb-4">
            Adjust parameters to see potential impact across India projects
          </p>

          {/* Forecast Timeframe */}
          <div className="mb-4">
            <label className="text-gray-600 text-sm">Forecast Timeframe (months)</label>
            <input
              type="range"
              min="1"
              max="12"
              value={forecastTime}
              onChange={(e) => setForecastTime(Number(e.target.value))}
              className="w-full mt-2"
            />
            <div className="text-sm text-gray-500 mt-1">{forecastTime} months</div>
          </div>

          {/* Risk Threshold */}
          <div className="mb-4">
            <label className="text-gray-600 text-sm">Risk Threshold (%)</label>
            <input
              type="range"
              min="0"
              max="100"
              value={riskThreshold}
              onChange={(e) => setRiskThreshold(Number(e.target.value))}
              className="w-full mt-2"
            />
            <div className="text-sm text-gray-500 mt-1">{riskThreshold}%</div>
          </div>

          {/* Scenario Impact */}
          <div className="mb-4 p-4 bg-gray-50 border rounded text-sm text-gray-700">
            <strong>Scenario Impact:</strong> With current parameters,{" "}
            <span className="font-semibold text-red-500">18 projects</span> are likely to
            exceed the risk threshold in the next {forecastTime} months.
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-3 gap-4 text-sm mb-4">
            <div>
              <p className="text-gray-500">Projected Cost Impact:</p>
              <p className="text-red-500 font-semibold">+12.5%</p>
            </div>
            <div>
              <p className="text-gray-500">Timeline Impact:</p>
              <p className="text-red-500 font-semibold">+8.2%</p>
            </div>
            <div>
              <p className="text-gray-500">Confidence Level:</p>
              <p className="text-green-500 font-semibold">87%</p>
            </div>
          </div>

          {/* Button */}
          <button className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-900 transition-colors">
            Generate Detailed Risk Report
          </button>
        </div>
      )}
    </div>
  );
}
