import React, { useEffect, useState } from "react";
import NavBar from "../src/components/NavBar";
import Footer from "../src/components/Footer";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const SingleJobDetails = () => {
  const navigate = useNavigate();

  // Protect Route from Unauthorized Access
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/user/singleJob/${jobId}`,
          {
            withCredentials: true,
          }
        );
        if (!res.data.success) {
          navigate("/login", {
            state: { message: "You need to login first", fromProtected: true },
          });
        }
      } catch (error) {
        navigate("/login", { state: { message: "You need to login first" } });
      }
    };

    checkAuth();
  }, [navigate]);

  const jobId = useParams().jobId;
  const [jobDetails, setJobDetails] = useState({});
  useEffect(() => {
    const fetchJobDetails = async () => {
      const res = await axios.get(
        `http://localhost:3000/user/singleJob/${jobId}`,
        { withCredentials: true }
      );
      setJobDetails(res.data.jobDetails);
    };
    fetchJobDetails();
  }, [jobId]);

  console.log(jobDetails);
  return (
   <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800 dark:bg-gray-900 dark:text-gray-100">
  <NavBar />

  <main className="flex-grow">
    <div className="max-w-4xl mx-auto px-6 py-10 mt-10 bg-white dark:bg-gray-800 shadow-md rounded-lg">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-indigo-700 dark:text-indigo-400 mb-1">
            {jobDetails.title}
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 font-medium">CodeSmith Ltd</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">Remote</p>
        </div>
        <img
          src={jobDetails?.companyLogo}
          alt="Company Logo"
          className="w-20 h-20 object-contain rounded"
        />
      </div>

      {/* Meta Info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 text-sm sm:text-base">
        <p><strong>Job Type:</strong> {jobDetails.jobType}</p>
        <p><strong>Salary:</strong> {jobDetails.salaryRange}</p>
        <p>
          <strong>Deadline: </strong>
          {new Date(jobDetails.deadline).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
        <p>
          <strong>Posted on: </strong>
          {new Date(jobDetails.createdAt).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
      </div>

      {/* Description */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Job Description</h2>
        <p className="text-gray-700 dark:text-gray-300">{jobDetails.description}</p>
      </div>

      {/* Skills */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Required Skills</h2>
        <div className="flex flex-wrap gap-2">
          {jobDetails.skillsRequired?.map((skill, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 rounded-full text-sm"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Apply Button */}
      <div className="mt-8">
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-md font-semibold w-full sm:w-auto">
          Apply for this Job
        </button>
      </div>
    </div>
  </main>

  <Footer />
</div>

  );
};

export default SingleJobDetails;
