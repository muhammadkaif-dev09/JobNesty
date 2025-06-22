import React from "react";
import NavBar from "../src/components/NavBar";
import Footer from "../src/components/Footer";

const ApplicantList = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <NavBar />

      {/* Middle: Applicants List */}
      <main className="flex-grow">
        <div className="max-w-4xl mx-auto py-12 px-4 bg-white dark:bg-gray-800 rounded-xl shadow space-y-6">
          {/* Header */}
          <h2 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mb-6">
            Applicants for:{" "}
            <span className="text-gray-900 dark:text-white">
              Frontend Developer
            </span>
          </h2>

          {/* Applicant Card 1 */}
          <div className="border border-gray-300 dark:border-gray-700 rounded p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Aman Verma
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Email: aman@example.com • Phone: +91 98765 43210
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                Select Candidate
              </button>
              <button className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
                Delete Applicant
              </button>
            </div>
          </div>

          {/* Applicant Card 2 */}
          <div className="border border-gray-300 dark:border-gray-700 rounded p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Priya Shah
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Email: priya@example.com • Phone: +91 91234 56789
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                Select Candidate
              </button>
              <button className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
                Delete Applicant
              </button>
            </div>
          </div>

          {/* Applicant Card 3 */}
          <div className="border border-gray-300 dark:border-gray-700 rounded p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Rahul Mehta
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Email: rahul@example.com • Phone: +91 99887 77665
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                Select Candidate
              </button>
              <button className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
                Delete Applicant
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ApplicantList;
