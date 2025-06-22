import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import Footer from "../src/components/Footer";
import NavBar from "../src/components/NavBar";


const Home = () => {
  const navigate = useNavigate();
  const [flash, setFlash] = useState("");

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

  const location = useLocation();
  useEffect(() => {
    const state = location.state;
    if (state?.message) {
      setFlash(state.message);
      setTimeout(() => {
        setFlash("");
      }, 2000);
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const [jobs, setJobs] = useState([]);
  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        const res = await axios.get("http://localhost:3000/user/jobs", {
          withCredentials: true,
        });
        setJobs(res.data.jobs); // ✅ Set directly
      } catch (err) {
        console.error("Failed to fetch jobs:", err);
      }
    };

    fetchAllJobs();
  }, []);

  const [searchJob, setSearchJob] = useState("");
  const [jobType, setJobType] = useState("");

  const filteredData = jobs.filter((job) => {
    const matchesSearch = job.title
      .toLowerCase()
      .includes(searchJob.toLowerCase());

    const matchesType =
      jobType === "" || job.jobType.toLowerCase() === jobType.toLowerCase();

    return matchesSearch && matchesType;
  });

  const handleTypeChange = (e) => {
    setJobType(e.target.value);
  };


  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800 dark:bg-gray-900 dark:text-gray-100">
      <NavBar />

      {flash && (
        <div className="bg-yellow-100 text-yellow-800 px-4 py-2 text-center dark:bg-yellow-200 dark:text-yellow-900">
          {flash}
        </div>
      )}

      <main className="flex-grow">
        <section className="max-w-7xl mx-auto px-4 pt-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <input
              value={searchJob}
              onChange={(e) => setSearchJob(e.target.value)}
              type="text"
              placeholder="🔍 Search for jobs..."
              className="w-full md:w-2/3 px-4 py-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-md focus:ring-2 focus:ring-blue-500"
            />
            <select
              value={jobType}
              onChange={handleTypeChange}
              className="w-full md:w-1/3 px-4 py-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-md focus:ring-2 focus:ring-blue-500"
            >
              <option value="">🎯 Filter by Type</option>
              <option value="Full-Time">Full-Time</option>
              <option value="Part-Time">Part-Time</option>
              <option value="Internship">Internship</option>
              <option value="Remote">Remote</option>
            </select>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-20">
          {filteredData.length === 0 ? (
            <div className="col-span-full text-center text-gray-500 py-10 dark:text-gray-400">
              <p className="text-xl font-semibold">🚫 No jobs found</p>
              <p className="text-sm mt-1">
                Try adjusting your search or filter options.
              </p>
            </div>
          ) : (
            filteredData.map((data, index) => (
              <NavLink to={`/jobId/${data?._id}`} key={index}>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow hover:shadow-md transition duration-300">
                  <h3 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400 mb-1">
                    {data.title}
                  </h3>
                  <p>
                    <strong>Company:</strong> {data.companyName}
                  </p>
                  <p className="text-sm mt-1">
                    <strong>Type:</strong> {data.jobType}
                  </p>
                  <p className="text-sm">
                    <strong>Location:</strong> {data.location}
                  </p>
                  <p className="text-sm">
                    <strong>Description:</strong> {data.description}
                  </p>
                  <p className="text-sm text-gray-400 dark:text-gray-300 mt-2">
                    📅 Posted:{" "}
                    {new Date(data.createdAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </NavLink>
            ))
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
