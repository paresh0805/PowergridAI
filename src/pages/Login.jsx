import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Login = () => {
  const navigate = useNavigate();
  const [loginMethod, setLoginMethod] = useState("email");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    console.log({ loginMethod, email, phone, password });
    navigate("/dashboard");
  };

  const formVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.5, ease: "easeOut" },
    }),
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-gradient-to-r from-blue-100 via-white to-green-100">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        whileHover={{ scale: 1.01 }}
        className="flex flex-col md:flex-row w-full max-w-4xl rounded-3xl shadow-xl overflow-hidden"
      >
        {/* Left side - Logo */}
    <div className="md:w-1/2 w-full bg-gradient-to-br from-blue-900 to-green-700 flex flex-col items-center justify-center p-6">
      <motion.img
        src="/assets/logo.png"
        alt="Logo"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
        className="w-24 h-24 md:w-60 md:h-60 object-contain drop-shadow-lg"
      />
          <motion.h2
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.5 }}
      className="mt-4 text-xl md:text-3xl font-bold text-white"
    >
      Powergrid AI
    </motion.h2>
    </div>

        {/* Right side - Login form */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="md:w-1/2 w-full p-6 flex flex-col justify-center bg-white"
        >
          <h1 className="text-2xl font-bold mb-2 text-gray-900 text-center">
            Get started now
          </h1>
          <p className="text-gray-600 mb-6 text-sm md:text-base text-center">
            Login access to your account
          </p>

          {/* Toggle Email / Phone */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="flex border border-green-500 rounded-full mb-6 overflow-hidden shadow-sm"
          >
            <button
              type="button"
              onClick={() => setLoginMethod("email")}
              className={`w-1/2 py-2 font-medium transition ${
                loginMethod === "email"
                  ? "bg-blue-900 text-white"
                  : "bg-white text-gray-500"
              }`}
            >
              Email
            </button>
            <button
              type="button"
              onClick={() => setLoginMethod("phone")}
              className={`w-1/2 py-2 font-medium transition ${
                loginMethod === "phone"
                  ? "bg-blue-900 text-white"
                  : "bg-white text-gray-500"
              }`}
            >
              Phone Number
            </button>
          </motion.div>

          {/* Form */}
          <motion.form
            onSubmit={handleLogin}
            className="space-y-4"
            initial="hidden"
            animate="visible"
          >
            {/* Email or Phone Input */}
            {loginMethod === "email" ? (
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
                  className="w-full border border-green-500 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-400 text-sm"
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
                  className="w-full border border-green-500 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-400 text-sm"
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
                  className="w-full border border-green-500 rounded-md p-2 pr-12 focus:outline-none focus:ring-2 focus:ring-green-400 text-sm"
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

            {/* Login Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full bg-blue-900 text-white py-2 rounded-md hover:bg-blue-800 transition text-sm font-semibold shadow-md"
            >
              Login
            </motion.button>

            {/* Forgot password */}
            <motion.p
              whileHover={{ scale: 1.05 }}
              className="text-green-500 text-center cursor-pointer hover:underline mt-1 text-xs"
              onClick={() => console.log("Forgot password clicked")}
            >
              Forgot your password?
            </motion.p>

            {/* Signup */}
            <p className="text-gray-500 text-center mt-1 text-xs">
              Don't have an account?{" "}
              <motion.span
                whileHover={{ scale: 1.05, color: "#2563eb" }}
                className="text-blue-900 cursor-pointer hover:underline"
                onClick={() => navigate("/signup")}
              >
                Sign up
              </motion.span>
            </p>

            {/* Divider */}
            <div className="flex items-center my-2">
              <hr className="flex-grow border-gray-300" />
              <span className="px-2 text-gray-500 text-xs">Or sign in with</span>
              <hr className="flex-grow border-gray-300" />
            </div>

            {/* Social Buttons */}
            <div className="flex flex-col sm:flex-row sm:space-x-2 space-y-2 sm:space-y-0 text-sm">
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: "#f9fafb" }}
                whileTap={{ scale: 0.95 }}
                className="flex-1 border border-green-500 rounded-md py-2 flex items-center justify-center"
              >
                <img src="/assets/google.png" alt="Google" className="w-4 h-4 mr-1" />
                Google
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: "#f9fafb" }}
                whileTap={{ scale: 0.95 }}
                className="flex-1 border border-green-500 rounded-md py-2 flex items-center justify-center"
              >
                <img src="/assets/facebook.png" alt="Facebook" className="w-4 h-4 mr-1" />
                Facebook
              </motion.button>
            </div>
          </motion.form>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;
