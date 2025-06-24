import React, { useState } from "react";
import NavBar from "../src/components/NavBar";
import Footer from "../src/components/Footer";
import { FiUpload } from "react-icons/fi";
import uploadImage from "../src/assets/Upload.png";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PostJobPage = () => {
  const [logoPreview, setLogoPreview] = useState(null);
  const [skills, setSkills] = useState([]);
  const [skillInput, setSkillInput] = useState("");
  const [flast, setFlash] = useState("");

  //   create a navigate function
  const navigate = useNavigate();

  // Add skill to list
  const handleAddSkill = () => {
    const trimmed = skillInput.trim();
    if (trimmed && !skills.includes(trimmed)) {
      setSkills((prev) => [...prev, trimmed]);
      setSkillInput("");
    }
  };

  // Remove skill from list
  const handleRemoveSkill = (skillToRemove) => {
    setSkills((prev) => prev.filter((s) => s !== skillToRemove));
  };

  // React Hook Form
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ defaultValues: {} });

  // Final submit
  const onSubmit = async (data) => {
    const formData = new FormData();

    // Append text fields
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("companyName", data.companyName);
    formData.append("location", data.location);
    formData.append("jobType", data.jobType);
    formData.append("salaryRange", data.salaryRange);
    formData.append("deadline", data.deadline);
    skills.forEach((skill) => {
      formData.append("skillsRequired[]", skill);
    });

    // Append file
    if (data.companyLogo) {
      formData.append("companyLogo", data.companyLogo);
    }

    try {
      const res = await axios.post(
        "http://localhost:3000/admin/addjobs", // your backend route
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data", // 👈 required for files
          },
        }
      );

      if (res.data.success) {
        setFlash("✅ Job posted successfully. Redirecting...");
        setTimeout(() => {
          setFlash("");
          navigate("/admin");
        }, 2000);
      }
    } catch (error) {
      if (error.response?.data?.message) {
        setFlash("❌ " + error.response.data.message);
      } else {
        setFlash("❌ Something went wrong. Please try again.");
      }

      setTimeout(() => {
        setFlash("");
      }, 3000);
    }
  };
  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <NavBar />
      <main className="flex-grow flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-3xl bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-center text-indigo-600 dark:text-indigo-400 mb-6">
            Post a New Job
          </h2>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5"
            method="post"
            encType="multipart/form-data"
          >
            {/* Job Title */}
            <div>
              <label className="block font-medium">Job Title</label>
              <input
                {...register("title", { required: true })}
                className="w-full px-4 py-2 mt-1 border rounded bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                placeholder="e.g. Frontend Developer"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block font-medium">Description</label>
              <textarea
                {...register("description", { required: true })}
                rows={4}
                className="w-full px-4 py-2 mt-1 border rounded bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                placeholder="Describe the job in detail"
              ></textarea>
            </div>

            {/* Company Name */}
            <div>
              <label className="block font-medium">Company Name</label>
              <input
                {...register("companyName", { required: true })}
                className="w-full px-4 py-2 mt-1 border rounded bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                placeholder="e.g. JobNest"
              />
            </div>

            {/* Company Logo */}
            <div>
              <label className="block font-medium mb-1">Company Logo</label>
              <div className="flex gap-4 flex-wrap items-center">
                <label className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed rounded cursor-pointer text-gray-600 dark:text-gray-300 border-gray-400 dark:border-gray-600 hover:border-indigo-600 hover:text-indigo-600 transition">
                  <FiUpload className="text-xl" />
                  <span>Upload Image</span>
                  <input
                    type="file"
                    accept="image/*"
                    name="companyLogo"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        setLogoPreview(URL.createObjectURL(file));
                        setValue("companyLogo", file); // 👈 set actual File (not FileList!)
                      }
                    }}
                    className="hidden"
                  />
                </label>
                <img
                  src={logoPreview || uploadImage}
                  alt="Preview"
                  className="w-20 h-20 object-cover rounded hover:scale-105 transition"
                />
              </div>
            </div>

            {/* Location */}
            <div>
              <label className="block font-medium">Location</label>
              <input
                {...register("location", { required: true })}
                className="w-full px-4 py-2 mt-1 border rounded bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                placeholder="e.g. Surat, India"
              />
            </div>

            {/* Job Type */}
            <div>
              <label className="block font-medium">Job Type</label>
              <select
                {...register("jobType", { required: true })}
                className="w-full px-4 py-2 mt-1 border rounded bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
              >
                <option value="">Select Type</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Internship">Internship</option>
                <option value="Remote">Remote</option>
              </select>
            </div>

            {/* Salary Range */}
            <div>
              <label className="block font-medium">Salary Range</label>
              <input
                {...register("salaryRange", { required: true })}
                className="w-full px-4 py-2 mt-1 border rounded bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                placeholder="e.g. ₹50,000 - ₹80,000/month"
              />
            </div>

            {/* Deadline */}
            <div>
              <label className="block font-medium">Deadline</label>
              <input
                type="date"
                {...register("deadline", { required: true })}
                className="w-full px-4 py-2 mt-1 border rounded bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
              />
            </div>

            {/* Skills */}
            <div>
              <label className="block font-medium">Skills Required</label>
              <div className="flex gap-2 mt-2">
                <input
                  type="text"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  className="flex-1 px-4 py-2 border rounded bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                  placeholder="e.g. React"
                />
                <button
                  type="button"
                  onClick={handleAddSkill}
                  className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                >
                  Add
                </button>
              </div>

              <div className="flex flex-wrap gap-2 mt-2">
                {skills.map((skill, index) => (
                  <span
                    key={index}
                    onClick={() => handleRemoveSkill(skill)}
                    className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm cursor-pointer hover:bg-indigo-200 transition"
                    title="Click to remove"
                  >
                    {skill} &times;
                  </span>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-2 bg-indigo-600 text-white font-semibold rounded hover:bg-indigo-700"
            >
              Post Job
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PostJobPage;
