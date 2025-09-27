import React, { useState } from "react";
import { MapPin, Layers, IndianRupee, Calendar, Users } from "lucide-react";

function NewProject() {
  const [formData, setFormData] = useState({
    projectName: "",
    projectType: "",
    location: "",
    terrain: "",
    estimatedCost: "",
    duration: "",
    teamSize: "",
    keyMaterials: [],
    vendors: "",
    extremeWeather: false,
    environmentalFactors: "",
    regulatoryApprovals: ""
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox" && name === "keyMaterials") {
      setFormData((prev) => ({
        ...prev,
        keyMaterials: checked
          ? [...prev.keyMaterials, value]
          : prev.keyMaterials.filter((item) => item !== value)
      }));
    } else if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-md h-screen flex flex-col">
      <h2 className="text-xl font-semibold mb-2">📍 New Project Input</h2>
      <p className="text-sm text-gray-500 mb-4">
        Enter project details for AI-powered cost and timeline prediction
      </p>

      {/* Scrollable Form */}
      <div className="flex-1 overflow-y-auto pr-2">
        <form onSubmit={handleSubmit} className="space-y-4 pb-6">
          {/* Project Name & Type */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-1">Project Name</label>
              <input
                type="text"
                name="projectName"
                value={formData.projectName}
                onChange={handleChange}
                placeholder="e.g., Mumbai-Pune Transmission Line"
                className="w-full border rounded-lg p-2"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Project Type</label>
              <select
                name="projectType"
                value={formData.projectType}
                onChange={handleChange}
                className="w-full border rounded-lg p-2"
              >
                <option value="">Select project type</option>
                <option value="Transmission">Transmission</option>
                <option value="Substation">Substation</option>
                <option value="Distribution">Distribution</option>
              </select>
            </div>
          </div>

          {/* Location & Terrain */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-1 flex items-center gap-1">
                <MapPin size={16} /> Location/State
              </label>
              <select
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full border rounded-lg p-2"
              >
                <option value="">Select location</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Gujarat">Gujarat</option>
                <option value="Karnataka">Karnataka</option>
              </select>
            </div>
            <div>
              <label className="block text-sm mb-1 flex items-center gap-1">
                <Layers size={16} /> Terrain Type
              </label>
              <select
                name="terrain"
                value={formData.terrain}
                onChange={handleChange}
                className="w-full border rounded-lg p-2"
              >
                <option value="">Select terrain</option>
                <option value="Plain">Plain</option>
                <option value="Hilly">Hilly</option>
                <option value="Forest">Forest</option>
              </select>
            </div>
          </div>

          {/* Cost, Duration, Team Size */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm mb-1 flex items-center gap-1">
                <IndianRupee size={16} /> Estimated Cost (Crores)
              </label>
              <input
                type="number"
                name="estimatedCost"
                value={formData.estimatedCost}
                onChange={handleChange}
                placeholder="e.g., 250"
                className="w-full border rounded-lg p-2"
              />
            </div>
            <div>
              <label className="block text-sm mb-1 flex items-center gap-1">
                <Calendar size={16} /> Duration (Months)
              </label>
              <input
                type="number"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                placeholder="e.g., 18"
                className="w-full border rounded-lg p-2"
              />
            </div>
            <div>
              <label className="block text-sm mb-1 flex items-center gap-1">
                <Users size={16} /> Team Size
              </label>
              <input
                type="number"
                name="teamSize"
                value={formData.teamSize}
                onChange={handleChange}
                placeholder="e.g., 50"
                className="w-full border rounded-lg p-2"
              />
            </div>
          </div>

          {/* Materials */}
          <div>
            <label className="block text-sm mb-2">Key Materials Required</label>
            <div className="grid grid-cols-3 gap-2">
              {[
                "Steel",
                "Concrete",
                "Aluminum",
                "Copper",
                "Fiber Optic Cables",
                "Transformers",
                "Insulators",
                "Conductors"
              ].map((mat) => (
                <label
                  key={mat}
                  className="flex items-center gap-2 border p-2 rounded-md"
                >
                  <input
                    type="checkbox"
                    name="keyMaterials"
                    value={mat}
                    checked={formData.keyMaterials.includes(mat)}
                    onChange={handleChange}
                  />
                  {mat}
                </label>
              ))}
            </div>
          </div>

          {/* Vendors */}
          <div>
            <label className="block text-sm mb-1">Key Vendors/Suppliers</label>
            <input
              type="text"
              name="vendors"
              value={formData.vendors}
              onChange={handleChange}
              placeholder="e.g., Vendor A, Vendor B, Vendor C"
              className="w-full border rounded-lg p-2"
            />
          </div>

          {/* Extreme weather */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="extremeWeather"
              checked={formData.extremeWeather}
              onChange={handleChange}
            />
            <span>Project affected by monsoon/extreme weather</span>
          </div>

          {/* Environmental Factors */}
          <div>
            <label className="block text-sm mb-1">Environmental Factors</label>
            <input
              type="text"
              name="environmentalFactors"
              value={formData.environmentalFactors}
              onChange={handleChange}
              placeholder="e.g., Protected forest area, wildlife crossing, flood zone"
              className="w-full border rounded-lg p-2"
            />
          </div>

          {/* Regulatory Approvals */}
          <div>
            <label className="block text-sm mb-1">
              Regulatory Approvals Required
            </label>
            <input
              type="text"
              name="regulatoryApprovals"
              value={formData.regulatoryApprovals}
              onChange={handleChange}
              placeholder="e.g., Forest clearance, Land acquisition, Environmental clearance"
              className="w-full border rounded-lg p-2"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-lg mt-4"
          >
            Generate AI Prediction
          </button>
        </form>
      </div>
    </div>
  );
}

export default NewProject;
