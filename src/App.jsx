import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './auth/LoginPage';
import SignUpPage from './auth/SignUpPage';
import Sidebar from './components/Sidebar';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
        
          <Route path="/" element={<Sidebar/>} />
          
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