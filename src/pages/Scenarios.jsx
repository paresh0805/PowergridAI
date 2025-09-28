import { useState } from "react";

export default function Scenarios() {
  const initialScenarios = [
    { name: "Optimistic", materialInflation: 5, weatherRisk: 5, vendorPerformance: 95 },
    { name: "Realistic", materialInflation: 10, weatherRisk: 15, vendorPerformance: 85 },
    { name: "Pessimistic", materialInflation: 20, weatherRisk: 45, vendorPerformance: 60 },
  ];

  const [scenarios, setScenarios] = useState(initialScenarios);
  const [activeScenario, setActiveScenario] = useState("Optimistic");
  const [activeTab, setActiveTab] = useState("Adjust Parameters");

  // Handle slider changes
  const handleParameterChange = (scenarioName, field, value) => {
    setScenarios((prev) =>
      prev.map((sc) =>
        sc.name === scenarioName ? { ...sc, [field]: parseFloat(value) } : sc
      )
    );
  };

  // Compute Analysis Results
  const computeResults = (sc) => {
    const costImpact = (sc.materialInflation * 1.5 + (100 - sc.vendorPerformance) * 1.2).toFixed(1);
    const timelineImpact = (sc.weatherRisk * 2 + (100 - sc.vendorPerformance) * 0.8).toFixed(1);
    const finalCost = `₹${(5000 * (1 + costImpact / 100)).toFixed(0)} Cr`;
    const completion = (100 + parseFloat(timelineImpact)).toFixed(0);
    return { costImpact, timelineImpact, finalCost, completion };
  };

  const currentScenario = scenarios.find((sc) => sc.name === activeScenario);
  const analysisResults = computeResults(currentScenario);

  const impactColor = (value) => {
    const num = parseFloat(value);
    if (num < 50) return "text-green-600";
    if (num < 100) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="p-6 space-y-8 bg-gradient-to-r from-blue-50 via-white to-pink-50 min-h-screen">
      {/* Scenario Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {scenarios.map((sc, idx) => (
          <div
            key={idx}
            onClick={() => setActiveScenario(sc.name)}
            className={`p-6 rounded-2xl border cursor-pointer shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-1 ${
              activeScenario === sc.name
                ? "border-blue-500 bg-blue-100 scale-105"
                : "border-gray-300 bg-white"
            }`}
          >
            <h3 className="font-bold text-2xl mb-4">{sc.name}</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-700 font-medium">Material Inflation:</span>
                <span className="font-semibold">{sc.materialInflation}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700 font-medium">Weather Risk:</span>
                <span className="font-semibold">{sc.weatherRisk} days</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700 font-medium">Vendor Performance:</span>
                <span className="font-semibold">{sc.vendorPerformance}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-3 justify-center">
        {["Adjust Parameters", "Analysis Results", "Multi-Scenario Comparison"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2 rounded-full text-sm font-medium transition ${
              activeTab === tab
                ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="bg-white shadow-2xl rounded-2xl p-8">
        {/* Adjust Parameters */}
        {activeTab === "Adjust Parameters" && (
          <div>
            <h3 className="font-bold text-gray-700 mb-8 text-2xl text-center">
              Adjust Scenario Parameters
            </h3>
            <div className="space-y-6">
              {scenarios.map((sc, idx) => (
                <div key={idx} className="p-6 border rounded-2xl bg-gradient-to-r from-purple-50 via-white to-pink-50 shadow-inner">
                  <h4 className="font-semibold text-lg mb-4">{sc.name}</h4>

                  {/* Material Inflation */}
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2 font-medium">
                      Material Inflation: {sc.materialInflation}%
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="50"
                      value={sc.materialInflation}
                      onChange={(e) =>
                        handleParameterChange(sc.name, "materialInflation", e.target.value)
                      }
                      className="w-full h-2 rounded-lg accent-red-500"
                    />
                  </div>

                  {/* Weather Risk */}
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2 font-medium">
                      Weather Risk: {sc.weatherRisk} days
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="60"
                      value={sc.weatherRisk}
                      onChange={(e) =>
                        handleParameterChange(sc.name, "weatherRisk", e.target.value)
                      }
                      className="w-full h-2 rounded-lg accent-yellow-400"
                    />
                  </div>

                  {/* Vendor Performance */}
                  <div className="mb-2">
                    <label className="block text-gray-700 mb-2 font-medium">
                      Vendor Performance: {sc.vendorPerformance}%
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={sc.vendorPerformance}
                      onChange={(e) =>
                        handleParameterChange(sc.name, "vendorPerformance", e.target.value)
                      }
                      className="w-full h-2 rounded-lg accent-green-500"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Analysis Results */}
        {activeTab === "Analysis Results" && (
          <div>
            <h3 className="font-bold text-gray-700 mb-8 text-2xl text-center">
              Analysis Results for {activeScenario}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl shadow-md text-center">
                <h4 className="font-semibold mb-2">Cost Impact</h4>
                <p className={`${impactColor(analysisResults.costImpact)} font-bold text-xl`}>
                  {analysisResults.costImpact}%
                </p>
              </div>
              <div className="p-6 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-2xl shadow-md text-center">
                <h4 className="font-semibold mb-2">Timeline Impact</h4>
                <p className={`${impactColor(analysisResults.timelineImpact)} font-bold text-xl`}>
                  {analysisResults.timelineImpact}%
                </p>
              </div>
              <div className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl shadow-md text-center">
                <h4 className="font-semibold mb-2">Final Cost</h4>
                <p className="font-bold text-xl">{analysisResults.finalCost}</p>
              </div>
              <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl shadow-md text-center">
                <h4 className="font-semibold mb-2">Completion</h4>
                <p className="font-bold text-xl">{analysisResults.completion}%</p>
              </div>
            </div>
          </div>
        )}

        {/* Multi-Scenario Comparison */}
        {activeTab === "Multi-Scenario Comparison" && (
          <div>
            <h3 className="font-bold mb-6 text-gray-700 text-2xl text-center">
              Multi-Scenario Comparison
            </h3>
            <div className="space-y-4">
              {scenarios.map((sc, idx) => {
                const results = computeResults(sc);
                return (
                  <div
                    key={idx}
                    className={`grid grid-cols-1 md:grid-cols-5 gap-4 p-4 rounded-2xl border transition-all items-center ${
                      sc.name === activeScenario ? "bg-blue-50 border-blue-400 shadow-lg" : "bg-white border-gray-300 hover:shadow-md"
                    }`}
                  >
                    <div className="font-semibold">{sc.name}</div>
                    <div className={`${impactColor(results.costImpact)} font-semibold`}>
                      Cost Impact: {results.costImpact}%
                    </div>
                    <div className={`${impactColor(results.timelineImpact)} font-semibold`}>
                      Timeline Impact: {results.timelineImpact}%
                    </div>
                    <div className="font-medium">Final Cost: {results.finalCost}</div>
                    <div className="space-y-1">
                      <div className="font-medium">Completion: {results.completion}%</div>
                      <div className="w-full bg-gray-200 h-2 rounded-full">
                        <div
                          className="bg-blue-500 h-2 rounded-full transition-all"
                          style={{ width: `${Math.min(parseFloat(results.completion), 100)}%` }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
