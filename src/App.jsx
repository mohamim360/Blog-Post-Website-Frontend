import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./auth/LoginPage";
import SignUpPage from "./auth/SignUpPage";
import Dashboard from "./Dashboard";
import ContentManagerDashboard from "./components/content/ContentManagerDashboard";
import ProtectedRoute from "./auth/ProtectedRoute";
import BlogListingPage from "./components/Home/BlogListingPage";
import RecentBlogs from "./components/Home/RecentBlogs";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/content-manager"
            element={
              <ProtectedRoute>
                <ContentManagerDashboard />
              </ProtectedRoute>
            }
          />

          {/* Public routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />

          <Route path="/blog-list" element={<BlogListingPage />} />
          <Route path="/recent-blogs" element={<RecentBlogs />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
