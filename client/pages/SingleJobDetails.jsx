import React, { useEffect, useState } from "react";
import NavBar from "../src/components/NavBar";
import Footer from "../src/components/Footer";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const SingleJobDetails = () => {
  const { jobId } = useParams(); // ✅ Move this to top
  const navigate = useNavigate();
  const [jobDetails, setJobDetails] = useState({});
  const [hasApplied, setHasApplied] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get("http://localhost:3000/user/profile", {
          withCredentials: true,
        });
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
  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/user/singleJob/${jobId}`,
          { withCredentials: true }
        );

        if (!res.data.success) {
          navigate("/login", {
            state: { message: "You need to login first", fromProtected: true },
          });
        } else {
          const job = res.data.jobDetails;
          setJobDetails(job);

          // ✅ Check if logged-in user is already in applicants
          const currentUserId = res.data.currentUserId; // <-- make sure to return this from backend
          if (job.applicants?.includes(currentUserId)) {
            setHasApplied(true);
          }
        }
      } catch (error) {
        navigate("/login", {
          state: { message: "You need to login first" },
        });
      }
    };

    if (jobId) fetchJobDetails();
  }, [jobId, navigate]);

  const applyJob = async () => {
    const JobId = jobDetails._id;

    try {
      const res = await axios.put(
        `http://localhost:3000/user/apply/${JobId}`,
        {},
        { withCredentials: true }
      );

      if (res.data.success) {
        alert("✅ Thank you for applying!");
        setHasApplied(true); // ✅ mark as applied
      } else {
        alert("❗ You already applied to this job.");
      }
    } catch (error) {
      if (error.response?.data?.message === "Already applied") {
        setHasApplied(true); // ✅ mark as applied if server says already applied
        alert("❗ You have already applied.");
      } else {
        alert("❌ Something went wrong while applying.");
        console.error(error.message);
      }
    }
  };

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
              <p className="text-lg text-gray-700 dark:text-gray-300 font-medium">
                {jobDetails.companyName}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {jobDetails.jobType}
              </p>
            </div>
            <img
              src={jobDetails?.companyLogo}
              alt="Company Logo"
              className="w-30 h-30 object-contain rounded-2xl"
            />
          </div>

          {/* Meta Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 text-sm sm:text-base">
            <p>
              <strong>Job Type:</strong> {jobDetails.jobType}
            </p>
            <p>
              <strong>Salary:</strong> {jobDetails.salaryRange}
            </p>
            <p>
              <strong>Posted on: </strong>
              {new Date(jobDetails.createdAt).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
            <p>
              <strong>Deadline: </strong>
              {new Date(jobDetails.deadline).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Job Description</h2>
            <p className="text-gray-700 dark:text-gray-300">
              {jobDetails.description}
            </p>
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
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Contact Details</h2>
            <p className="text-gray-700 dark:text-gray-300">
              <strong>Name:</strong> {jobDetails?.createdBy?.fullName}
            </p>
            <a
              href={`https://mail.google.com/mail/?view=cm&fs=1&to=${jobDetails?.createdBy?.email}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 dark:text-gray-300 hover:text-indigo-600"
            >
              {jobDetails?.createdBy?.email}
            </a>
          </div>

          {/* Apply Button */}
          <button
            onClick={applyJob}
            disabled={hasApplied}
            className={`px-6 py-3 font-semibold rounded-md w-full sm:w-auto transition-colors
    ${
      hasApplied
        ? "bg-green-600 text-white cursor-not-allowed"
        : "bg-indigo-600 hover:bg-indigo-700 text-white"
    }`}
          >
            {hasApplied ? "✅ Applied" : "Apply for this Job"}
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SingleJobDetails;
