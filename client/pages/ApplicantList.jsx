import React, { useEffect, useState } from "react";
import NavBar from "../src/components/NavBar";
import Footer from "../src/components/Footer";
import { useParams } from "react-router-dom";
import axios from "axios";

const ApplicantList = () => {
  const { jobId } = useParams();
  const [applicants, setApplicants] = useState([]);

  console.log(jobId)

  useEffect(() => {
    const fetchApplicants = async () => {
      const res = await axios.get(
        `http://localhost:3000/admin/job-applicants/${jobId}`,
        {
          withCredentials: true,
        }
      );
      setApplicants(res.data.applicants);
    };

    fetchApplicants();
  }, [jobId]);
  console.log(applicants);
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

          {applicants.length === 0 ? (
            <p className="text-gray-600 dark:text-gray-300">
              No one has applied yet.
            </p>
          ) : (
            <ul className="space-y-3">
              {applicants.map((applicant) => (
                <li
                  key={applicant._id}
                  className="bg-gray-100 dark:bg-gray-700 p-4 rounded"
                >
                  <p>
                    <strong>Name:</strong> {applicant.fullName}
                  </p>
                  <p>
                    <strong>Email:</strong>{" "}
                    <a
                      href={`mailto:${applicant.email}`}
                      className="text-blue-400"
                    >
                      {applicant.email}
                    </a>
                  </p>
                  <p>
                    <strong>Phone:</strong> {applicant.phone || "N/A"}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ApplicantList;
