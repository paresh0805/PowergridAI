import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Signup = () => {
  const navigate = useNavigate();
  const [signupMethod, setSignupMethod] = useState("email");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const payload = {
      signupMethod,
      email,
      phone,
      password,
    };

    try {
      const response = await fetch(
        "https://backendnewserver-production.up.railway.app/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Signup successful!");
        navigate("/"); // Redirect to login or home page
      } else {
        alert(data.success || "Signup failed.");
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  // Animation variants
  const formVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.5, ease: "easeOut" },
    }),
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gradient-to-r from-blue-100 via-white to-green-100">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        whileHover={{ scale: 1.01 }}
        className="w-full max-w-md bg-white/70 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden p-6"
      >
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="flex flex-col justify-center"
        >
          <h1 className="text-2xl font-bold mb-2 text-gray-900 text-center">
            Create an account
          </h1>
          <p className="text-gray-600 mb-6 text-sm md:text-base text-center">
            Sign up to get started
          </p>

          {/* Toggle Email/Phone */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="flex border border-green-500 rounded-full mb-6 overflow-hidden shadow-sm"
          >
            <button
              type="button"
              onClick={() => setSignupMethod("email")}
              className={`w-1/2 py-2 font-medium transition ${
                signupMethod === "email"
                  ? "bg-blue-900 text-white"
                  : "bg-white text-gray-500"
              }`}
            >
              Email
            </button>
            <button
              type="button"
              onClick={() => setSignupMethod("phone")}
              className={`w-1/2 py-2 font-medium transition ${
                signupMethod === "phone"
                  ? "bg-blue-900 text-white"
                  : "bg-white text-gray-500"
              }`}
            >
              Phone Number
            </button>
          </motion.div>

          {/* Form */}
          <motion.form
            onSubmit={handleSignup}
            className="space-y-4"
            initial="hidden"
            animate="visible"
          >
            {/* Email or Phone */}
            {signupMethod === "email" ? (
              <motion.div custom={1} variants={formVariant}>
                <label className="block text-gray-700 mb-1 text-sm">Email</label>
                <motion.input
                  whileFocus={{
                    scale: 1.02,
                    boxShadow: "0 0 8px rgba(0,200,100,0.4)",
                  }}
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-green-500 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-400 text-sm bg-white"
                  placeholder="Enter your email"
                  required
                />
              </motion.div>
            ) : (
              <motion.div custom={1} variants={formVariant}>
                <label className="block text-gray-700 mb-1 text-sm">Phone</label>
                <motion.input
                  whileFocus={{
                    scale: 1.02,
                    boxShadow: "0 0 8px rgba(0,200,100,0.4)",
                  }}
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full border border-green-500 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-400 text-sm bg-white"
                  placeholder="+91 9876543210"
                  required
                />
              </motion.div>
            )}

            {/* Password */}
            <motion.div custom={2} variants={formVariant}>
              <label className="block text-gray-700 mb-1 text-sm">Password</label>
              <div className="relative">
                <motion.input
                  whileFocus={{
                    scale: 1.02,
                    boxShadow: "0 0 8px rgba(0,200,100,0.4)",
                  }}
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-green-500 rounded-md p-2 pr-12 focus:outline-none focus:ring-2 focus:ring-green-400 text-sm bg-white"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-green-500 text-xs font-medium"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </motion.div>

            {/* Confirm Password */}
            <motion.div custom={3} variants={formVariant}>
              <label className="block text-gray-700 mb-1 text-sm">
                Confirm Password
              </label>
              <div className="relative">
                <motion.input
                  whileFocus={{
                    scale: 1.02,
                    boxShadow: "0 0 8px rgba(0,200,100,0.4)",
                  }}
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full border border-green-500 rounded-md p-2 pr-12 focus:outline-none focus:ring-2 focus:ring-green-400 text-sm bg-white"
                  placeholder="Confirm your password"
                  required
                />
                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-green-500 text-xs font-medium"
                >
                  {showConfirmPassword ? "Hide" : "Show"}
                </button>
              </div>
            </motion.div>

            {/* Signup Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full bg-blue-900 text-white py-2 rounded-md hover:bg-blue-800 transition text-sm font-semibold shadow-md"
            >
              Sign Up
            </motion.button>

            {/* Already have an account */}
            <p className="text-gray-500 text-center mt-1 text-xs">
              Already have an account?{" "}
              <motion.span
                whileHover={{ scale: 1.05, color: "#2563eb" }}
                className="text-blue-900 cursor-pointer hover:underline"
                onClick={() => navigate("/")}
              >
                Login
              </motion.span>
            </p>

            {/* Divider */}
            <div className="flex items-center my-2">
              <hr className="flex-grow border-gray-300" />
              <span className="px-2 text-gray-500 text-xs">Or sign up with</span>
              <hr className="flex-grow border-gray-300" />
            </div>

            {/* Social Buttons */}
            <div className="flex flex-col sm:flex-row sm:space-x-2 space-y-2 sm:space-y-0 text-sm">
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: "#f9fafb" }}
                whileTap={{ scale: 0.95 }}
                className="flex-1 border border-green-500 rounded-md py-2 flex items-center justify-center"
              >
                <img
                  src="/assets/google.png"
                  alt="Google"
                  className="w-4 h-4 mr-1"
                />
                Google
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: "#f9fafb" }}
                whileTap={{ scale: 0.95 }}
                className="flex-1 border border-green-500 rounded-md py-2 flex items-center justify-center"
              >
                <img
                  src="/assets/facebook.png"
                  alt="Facebook"
                  className="w-4 h-4 mr-1"
                />
                Facebook
              </motion.button>
            </div>
          </motion.form>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Signup;
