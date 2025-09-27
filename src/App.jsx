import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import NewProject from "./pages/NewProject";
import RiskAnalysis from "./pages/RiskAnalysis";
import Predictions from "./pages/Predictions";
import Scenarios from "./pages/Scenarios";
import LiveMonitor from "./pages/LiveMonitor";



// Layout wrapper
const AppLayout = ({ children }) => {
  const location = useLocation();
  // Only show sidebar if not on login or signup pages
  const showSidebar = location.pathname !== "/" && location.pathname !== "/signup";

  return (
    <div className={`flex min-h-screen ${!showSidebar ? "bg-gray-100" : ""}`}>
      {showSidebar && <Sidebar />}
      <div className="flex-1">
        {children}
      </div>
    </div>
  );
};


function App() {
  return (
    <Router>
      <AppLayout>
        <Routes>
          {/* Login and Signup */}
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/new-project" element={<NewProject/>} />
          <Route path="/risk-analysis" element={<RiskAnalysis />} />
          <Route path="/predictions" element={<Predictions />} />
          <Route path="/scenarios" element={<Scenarios/>} />
          <Route path="/live-monitor" element={<LiveMonitor/>} />
        </Routes>
      </AppLayout>
    </Router>
  );
}

export default App;
