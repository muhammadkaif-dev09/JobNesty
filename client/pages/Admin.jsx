import React, { useEffect, useState } from "react";
import NavBar from "../src/components/NavBar";
import Footer from "../src/components/Footer";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

const Admin = () => {
  const [jobPost, setJobPost] = useState([]);
  const [flash, setFlash] = useState("");
  const navigate = useNavigate();

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
    const fetchAllJobPost = async () => {
      try {
        const res = await axios.get("http://localhost:3000/admin/my-jobs", {
          withCredentials: true,
        });
        setJobPost(res.data.jobs);
      } catch (err) {
        console.error("Error fetching jobs:", err);
      }
    };

    fetchAllJobPost();
  }, []);

  const deleteJobPost = async (postId) => {
    if (!window.confirm("Are you sure you want to delete this job post?"))
      return;

    try {
      const res = await axios.delete(
        `http://localhost:3000/admin/delete-jobPost/${postId}`,
        { withCredentials: true }
      );

      if (res.data.success) {
        setFlash("Post successfully deleted");

        // ✅ Filter deleted job from state
        setJobPost((prevJobs) => prevJobs.filter((job) => job._id !== postId));

        // Optional: clear flash after a few seconds
        setTimeout(() => setFlash(""), 3000);
      }
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <NavBar />
      {flash && (
        <p className="text-green-600 text-center font-semibold">{flash}</p>
      )}

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
          {jobPost.map((jobData, index) => {
            return (
              <div
                key={index}
                className="border border-gray-300 dark:border-gray-700 rounded p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
              >
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {jobData.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {`${jobData.companyName} • ${jobData.jobType} • ${jobData.location}`}
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <button
                    onClick={() => deleteJobPost(jobData._id)}
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 text-center"
                  >
                    Delete POST
                  </button>
                  <NavLink
                    to={`/admin/allapplicantlist/${jobData._id}`}
                    className="text-center px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                  >
                    View Applicants
                  </NavLink>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Admin;
