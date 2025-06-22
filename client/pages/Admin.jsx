import React from "react";
import NavBar from "../src/components/NavBar";
import Footer from "../src/components/Footer";
import { NavLink } from "react-router-dom";

const Admin = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <NavBar />

      {/* Middle: Job Listings */}
      <main className="flex-grow mt-10">
        <div className="max-w-4xl mx-auto py-12 px-4 bg-white dark:bg-gray-800 rounded-xl shadow space-y-6">
          {/* Header + Add Job Button */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-10">
            <h2 className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
              Your Job Listings
            </h2>
            <NavLink
              to={"/admin/addJob"}
              className="text-center mt-3 sm:mt-0 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              + Add Job
            </NavLink>
          </div>

          {/* Job Card 1 */}
          <div className="border border-gray-300 dark:border-gray-700 rounded p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Frontend Developer
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                TechNova • Mumbai, India • Full-time
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <button className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
                Delete
              </button>
              <NavLink
                to={"/admin/allapplicantlist"}
                className="text-center px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
              >
                View Applicants
              </NavLink>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Admin;
