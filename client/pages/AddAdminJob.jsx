import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import Footer from "../src/components/Footer";
import NavBar from "../src/components/NavBar";
import { FiUpload } from "react-icons/fi";

const AdminAddJob = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();

  const [skills, setSkills] = useState([]);
  const [skillInput, setSkillInput] = useState("");

  const onSubmit = async (data) => {
    data.skillsRequired = skills;
    try {
      const res = await axios.post("http://localhost:3000/admin/job", data, {
        withCredentials: true,
      });
      alert("Job Posted Successfully");
      reset();
      setSkills([]);
    } catch (err) {
      alert("Error while posting job");
      console.error(err);
    }
  };

  const handleSkillAdd = () => {
    if (skillInput.trim()) {
      setSkills([...skills, skillInput.trim()]);
      setSkillInput("");
    }
  };

  const [imagePreview, setImagePreview] = useState(null);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setValue("companyLogo", file); // update form data
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      {/* Top Navbar */}
      <NavBar />

      {/* Main Content */}
      <main className="flex-grow py-10 px-4 flex justify-center items-start">
        <div className="w-full max-w-3xl bg-white dark:bg-gray-800 rounded-xl shadow-md p-8">
          <h2 className="text-2xl font-bold text-center text-indigo-600 dark:text-indigo-400 mb-6">
            Post a New Job
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Job Title */}
            <div>
              <label className="block font-medium">Job Title</label>
              <input
                {...register("title", { required: true })}
                className="w-full px-4 py-2 mt-1 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-700 placeholder:text-gray-400"
                placeholder="e.g. Frontend Developer"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block font-medium">Description</label>
              <textarea
                {...register("description")}
                className="w-full px-4 py-2 mt-1 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-700 placeholder:text-gray-400"
                placeholder="Describe the job in detail"
                rows={4}
              ></textarea>
            </div>

            {/* Company Name */}
            <div>
              <label className="block font-medium">Company Name</label>
              <input
                {...register("companyName", { required: true })}
                className="w-full px-4 py-2 mt-1 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-700 placeholder:text-gray-400"
                placeholder="e.g. JobNesty"
              />
            </div>

            {/* Company Logo Upload */}
            <div>
              <label className="block font-medium mb-1">Company Logo</label>
              <div className="flex gap-4 flex-wrap items-center">
                <label
                  htmlFor="companyLogo"
                  className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-gray-400 dark:border-gray-600 rounded cursor-pointer text-gray-600 dark:text-gray-300 hover:border-indigo-600 hover:text-indigo-600 transition"
                >
                  <FiUpload className="text-xl" />
                  <span>Click to upload image</span>
                  <input
                    type="file"
                    id="companyLogo"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>

                {imagePreview && (
                  <a
                    href={imagePreview}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-20 h-20 object-cover rounded border hover:scale-105 transition"
                    />
                  </a>
                )}
              </div>
            </div>

            {/* Location */}
            <div>
              <label className="block font-medium">Location</label>
              <input
                {...register("location")}
                className="w-full px-4 py-2 mt-1 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-700 placeholder:text-gray-400"
                placeholder="e.g. Mumbai, India"
              />
            </div>

            {/* Job Type */}
            <div>
              <label className="block font-medium">Job Type</label>
              <select
                {...register("jobType")}
                className="w-full px-4 py-2 mt-1 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-700"
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
                {...register("salaryRange")}
                className="w-full px-4 py-2 mt-1 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-700 placeholder:text-gray-400"
                placeholder="e.g. ₹50,000 - ₹80,000/month"
              />
            </div>

            {/* Deadline */}
            <div>
              <label className="block font-medium">Deadline</label>
              <input
                type="date"
                {...register("deadline")}
                className="w-full px-4 py-2 mt-1 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-700"
              />
            </div>

            {/* Skills Required */}
            <div>
              <label className="block font-medium">Skills Required</label>
              <div className="flex gap-2 mt-2">
                <input
                  type="text"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-700 placeholder:text-gray-400"
                  placeholder="e.g. React"
                />
                <button
                  type="button"
                  onClick={handleSkillAdd}
                  className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm"
                  >
                    {skill}
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
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AdminAddJob;
