import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import LoginPage from "./auth/LoginPage";
import SignUpPage from "./auth/SignUpPage";
import Dashboard from "./Dashboard";
import ContentManagerDashboard from "./components/content/ContentManagerDashboard";


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Dashboard />} />

          <Route
            path="/content-manager"
            element={<ContentManagerDashboard />}
          />
       

          {/* Login route */}
          <Route path="/login" element={<LoginPage />} />

          {/* Signup route */}
          <Route path="/signup" element={<SignUpPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
