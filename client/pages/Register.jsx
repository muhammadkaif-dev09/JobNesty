import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../src/components/Footer";
import NavBar from "../src/components/NavBar";
import AuthNavbar from "../src/components/AuthNavBar";

const Register = () => {
  const navigate = useNavigate();

  // State to manage password checkbox
  const [visible, setVisible] = useState(false);

  // State to manage flash message
  const [flash, setFlash] = useState("");

  const handleCheckBox = () => {
    setVisible((prevVisible) => !prevVisible);
  };

  // ✅ Yup Schema
  const validationSchema = Yup.object({
    fullName: Yup.string().required("Full Name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Must be at least 8 characters")
      .matches(
        /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d])/,
        "Must contain uppercase, number, and special character"
      ),
    role: Yup.string()
      .oneOf(["job_seeker", "recruiter"], "Invalid role")
      .required("Role is required"),
  });

  // ✅ React Hook Form Setup
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  // Handle Registration submit via Axios
  const onSubmit = async (data) => {
    try {
      const res = await axios.post(
        "http://localhost:3000/auth/register",
        data,
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        setFlash("✅ Registration Successful! Redirecting to login...");

        // Wait 2 seconds before navigating to login
        setTimeout(() => {
          setFlash(""); // Clear message before navigation
          navigate("/login");
        }, 2000);
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
      {/* Navbar */}
      <AuthNavbar />

      {/* Flash Message */}
      {flash && (
        <div className="bg-yellow-100 text-yellow-800 dark:bg-yellow-200 dark:text-yellow-900 px-4 py-2 text-center">
          {flash}
        </div>
      )}

      {/* Register Form Section */}
      <main className="flex-grow flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-indigo-600 dark:text-indigo-400 mb-6">
            Create JobNesty Account
          </h2>

          <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
            {/* Full Name */}
            <div>
              <label className="block mb-1 font-medium">Full Name</label>
              <input
                {...register("fullName")}
                type="text"
                placeholder="E.g: John Smith"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500
             dark:bg-gray-700 dark:border-gray-600
             placeholder-gray-500 dark:placeholder-gray-300"
              />
              {errors.fullName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.fullName.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block mb-1 font-medium">Email</label>
              <input
                {...register("email")}
                type="email"
                placeholder="example@gmail.com"
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
                  id="togglePassword"
                  className="mr-2 cursor-pointer"
                  onChange={handleCheckBox}
                />
                <label
                  htmlFor="togglePassword"
                  className="text-sm cursor-pointer"
                >
                  Show Password
                </label>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Role */}
            <div>
              <label className="block mb-1 font-medium">Role</label>
              <select
                {...register("role")}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Select Role</option>
                <option value="job_seeker">Job Seeker</option>
                <option value="recruiter">Recruiter</option>
              </select>
              {errors.role && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.role.message}
                </p>
              )}
            </div>

            {/* Register Button */}
            <div>
              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
              >
                Register
              </button>
            </div>
          </form>

          {/* Redirect */}
          <p className="text-center text-sm text-gray-600 dark:text-gray-300 mt-6">
            Already have an account?
            <Link
              to="/login"
              className="text-indigo-600 hover:underline font-medium pl-2"
            >
              Login
            </Link>
          </p>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Register;
