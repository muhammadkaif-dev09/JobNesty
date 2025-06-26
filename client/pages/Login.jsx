import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import AuthNavbar from "../src/components/AuthNavbar";
import Footer from "../src/components/Footer";

const Login = () => {
  const location = useLocation();

  const navigate = useNavigate();
  const [flash, setFlash] = useState("");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const state = location.state;
    if (state?.message) {
      setFlash(state.message);

      // Clear flash after 2 seconds
      setTimeout(() => {
        setFlash("");
      }, 2000);
      // Clear the state so it doesn't show on reload
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const handleCheckBox = () => {
    setVisible((prevVisible) => !prevVisible);
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Must be at least 8 characters"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (loginData) => {
    try {
      const res = await axios.post(
        "http://localhost:3000/auth/login",
        loginData,
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        setTimeout(() => {
          setFlash("");
          navigate("/home", {
            state: { message: "Welcome Back to JobNesty..." },
          });
        });
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setFlash("❌ " + error.response.data.message);
      } else {
        setFlash("❌ Something went wrong. Please try again.");
      }

      // Clear error flash message after 3 seconds
      setTimeout(() => {
        setFlash("");
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300">
      {/* Navbar stays at top */}
      <AuthNavbar />

      {/* Flash Message */}
      {flash && (
        <div className="bg-yellow-100 text-yellow-800 dark:bg-yellow-200 dark:text-yellow-900 px-4 py-2 text-center">
          {flash}
        </div>
      )}

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-indigo-600 dark:text-indigo-400 mb-6">
            Welcome Back to JobNesty
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block mb-1 font-medium">Email</label>
              <input
                {...register("email")}
                type="email"
                placeholder="you@example.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500
             dark:bg-gray-700 dark:border-gray-600
             placeholder-gray-500 dark:placeholder-gray-300"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block mb-1 font-medium">Password</label>
              <input
                {...register("password")}
                type={visible ? "text" : "password"}
                placeholder="••••••••"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500
             dark:bg-gray-700 dark:border-gray-600
             placeholder-gray-500 dark:placeholder-gray-300"
              />
              <div className="flex items-center mt-2">
                <input
                  type="checkbox"
                  onClick={handleCheckBox}
                  className="mr-2 cursor-pointer"
                />
                <label className="text-sm cursor-pointer">Show Password</label>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
            >
              Login
            </button>
          </form>

          {/* Redirect Link */}
          <div className="mt-6 text-center">
            <p className="text-sm">
              Don’t have an account?
              <Link
                to="/"
                className="text-indigo-600 hover:underline font-medium pl-2"
              >
                Register
              </Link>
            </p>
          </div>
        </div>
      </main>

      {/* Footer stays at bottom */}
      <Footer />
    </div>
  );
};

export default Login;
