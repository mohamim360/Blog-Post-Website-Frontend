import { useState } from "react";
import { Link } from "react-router-dom";
import union from "../assets/svg/Union.svg"; 

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
 
    email: "",
    password: "",
  
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
 
    // Add your signup logic here
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

 

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#6200EE] overflow-hidden">
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: `url(${union}), url(${union})`,
          backgroundRepeat: "repeat, repeat",
          backgroundSize: "300px 300px, 300px 300px",
          backgroundPosition: "0 0, 150px 150px",
          maskImage: "radial-gradient(circle, transparent 40%, black 41%)",
          WebkitMaskImage: "radial-gradient(circle, transparent 40%, black 41%)",
        }}
      />

      {/* Sign Up Card */}
      <div className="relative z-10 w-[400px] bg-white border border-gray-300 shadow-2xl rounded-xl p-8 flex flex-col gap-6">
        {/* Logo & Title */}
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#6200EE] rounded-md shadow-md" />
            <h1 className="text-2xl font-bold text-[#6200EE]">Newsx</h1>
          </div>
          <p className="text-center text-gray-900 font-medium">
            Create Your Newsx Account
          </p>
        </div>

        {/* Form */}
        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          {/* Full Name */}
        

          {/* Email */}
          <div className="flex flex-col gap-2">
            <label className="text-gray-900 text-base">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Abc123@Example.Com"
              className="w-full h-14 rounded-lg bg-gray-200 px-4 outline-none text-gray-900"
              required
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-2">
            <label className="text-gray-900 text-base">Password</label>
            <div className="flex items-center w-full h-14 rounded-lg bg-gray-200 px-4">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="flex-1 h-full bg-transparent outline-none text-gray-900"
                required
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="text-gray-600 hover:text-gray-800 focus:outline-none"
              >
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L6.59 6.59m9.02 9.02l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>

  
          {/* Sign Up Button */}
          <button
            type="submit"
            className="w-full h-14 bg-[#6200EE] text-white rounded-lg font-medium hover:bg-[#4D00BB] transition"
          >
            Sign Up
          </button>
        </form>

        <div className="relative flex items-center justify-center">
          <div className="flex-1 border-t border-gray-300"></div>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>

        {/* Login Link */}
        <p className="text-center text-gray-700 mt-2">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-[#6200EE] font-medium underline hover:text-[#4D00BB]"
          >
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}