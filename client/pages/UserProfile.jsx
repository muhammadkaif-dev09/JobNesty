// UserProfile.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaCamera, FaPlus } from "react-icons/fa";
import Footer from "../src/components/Footer";
import NavBar from "../src/components/NavBar";

const UserProfile = () => {
  const [profileData, setProfileData] = useState({});
  const [loading, setLoading] = useState(true);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    location: "",
    bio: "",
    linkedin: "",
    github: "",
    portfolio: "",
  });

  const [skills, setSkills] = useState([]);
  const [skillInput, setSkillInput] = useState("");
  const [previewPic, setPreviewPic] = useState(null);
  const [profilePicFile, setProfilePicFile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://localhost:3000/user/profile", {
          withCredentials: true,
        });
        const user = res.data.user;
        setProfileData(user);
        setFormData({
          fullName: user.fullName || "",
          phone: user.phone || "",
          location: user.location || "",
          bio: user.bio || "",
          linkedin: user?.socialLinks?.linkedin || "",
          github: user?.socialLinks?.github || "",
          portfolio: user?.socialLinks?.portfolio || "",
        });
        setSkills(user.skills || []);
        setPreviewPic(user.profilePic || null);
      } catch (err) {
        console.error("Failed to load profile.", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePicFile(file);
      setPreviewPic(URL.createObjectURL(file));
    }
  };

  const handleAddSkill = () => {
    if (skillInput.trim() && !skills.includes(skillInput.trim())) {
      setSkills((prev) => [...prev, skillInput.trim()]);
      setSkillInput("");
    }
  };

  const handleRemoveSkill = (skill) => {
    setSkills((prev) => prev.filter((s) => s !== skill));
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => data.append(key, value));
    data.append("skills", JSON.stringify(skills));
    data.append(
      "socialLinks",
      JSON.stringify({
        linkedin: formData.linkedin,
        github: formData.github,
        portfolio: formData.portfolio,
      })
    );
    if (profilePicFile) data.append("profilePic", profilePicFile);

    try {
      const res = await axios.put("http://localhost:3000/user/update", data, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("✅ Profile Updated");
      setShowUpdateForm(false);
      setProfileData(res.data.user);
    } catch (err) {
      console.error("Update failed:", err);
      alert("❌ Update failed");
    }
  };

  const toggleUpdateForm = () => {
    setShowPasswordForm(false);
    setShowUpdateForm((prev) => !prev);
  };

  const togglePasswordForm = () => {
    setShowUpdateForm(false);
    setShowPasswordForm((prev) => !prev);
  };

  if (loading) return <p className="text-center">Loading...</p>;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
      <NavBar />
      <main className="flex-grow flex flex-col items-center px-4 py-10">
        <div className="w-full max-w-3xl bg-white dark:bg-gray-800 shadow-lg rounded-xl p-8 relative">
          {showUpdateForm ? (
            <form onSubmit={handleUpdateSubmit} className="space-y-4">
              <h2 className="text-xl font-semibold">Update Profile</h2>
              <div className="flex items-center gap-4">
                <div className="relative w-24 h-24">
                  <img
                    src={previewPic || "/default-avatar.png"}
                    alt="Preview"
                    className="w-full h-full rounded-md object-cover border-2 border-indigo-400"
                  />
                  <label className="absolute bottom-0 right-0 bg-indigo-600 p-1 rounded-full cursor-pointer">
                    <FaCamera className="text-white" />
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageChange}
                    />
                  </label>
                </div>
              </div>
              <input
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Full Name"
                className="w-full px-4 py-2 rounded border dark:bg-gray-700"
              />
              <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone Number"
                className="w-full px-4 py-2 rounded border dark:bg-gray-700"
              />
              <input
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Location"
                className="w-full px-4 py-2 rounded border dark:bg-gray-700"
              />
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                placeholder="Bio"
                className="w-full px-4 py-2 rounded border dark:bg-gray-700"
              />
              <div>
                <label className="block font-medium">Skills</label>
                <div className="flex gap-2 mt-2">
                  <input
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    className="flex-1 px-4 py-2 border rounded bg-white dark:bg-gray-700"
                    placeholder="e.g. React"
                  />
                  <button
                    type="button"
                    onClick={handleAddSkill}
                    className="px-4 py-2 bg-indigo-600 text-white rounded"
                  >
                    <FaPlus /> Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {skills.map((s, i) => (
                    <span
                      key={i}
                      onClick={() => handleRemoveSkill(s)}
                      className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm cursor-pointer hover:bg-indigo-200"
                    >
                      {s} &times;
                    </span>
                  ))}
                </div>
              </div>
              <input
                name="linkedin"
                value={formData.linkedin}
                onChange={handleChange}
                placeholder="LinkedIn URL"
                className="w-full px-4 py-2 rounded border dark:bg-gray-700"
              />
              <input
                name="github"
                value={formData.github}
                onChange={handleChange}
                placeholder="GitHub URL"
                className="w-full px-4 py-2 rounded border dark:bg-gray-700"
              />
              <input
                name="portfolio"
                value={formData.portfolio}
                onChange={handleChange}
                placeholder="Portfolio URL"
                className="w-full px-4 py-2 rounded border dark:bg-gray-700"
              />
              <div className="flex gap-3 justify-end">
                <button
                  type="submit"
                  className="px-6 py-2 bg-indigo-600 text-white rounded"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setShowUpdateForm(false)}
                  className="px-6 py-2 bg-gray-500 text-white rounded"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div>
              <div className="flex flex-col sm:flex-row gap-6 sm:items-center">
                <img
                  src={profileData?.profilePic || "/default-avatar.png"}
                  alt="Profile"
                  className="w-30 h-30 rounded-full object-cover border-2 border-indigo-400"
                />
                <div>
                  <h2 className="text-2xl font-bold text-indigo-600">
                    {profileData?.fullName}
                  </h2>
                  <p>
                    <strong>Email:</strong> {profileData.email}
                  </p>
                  <p>
                    <strong>Phone:</strong> {profileData.phone}
                  </p>
                  <p>
                    <strong>Location:</strong> {profileData.location}
                  </p>
                  <p>
                    <strong>Role:</strong> {profileData.role}
                  </p>
                </div>
              </div>
              {profileData.bio && (
                <>
                  <h3 className="mt-4 font-semibold">Bio</h3>
                  <p className="text-sm">{profileData.bio}</p>
                </>
              )}
              {skills.length > 0 && (
                <>
                  <h3 className="mt-4 font-semibold">Skills</h3>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {skills.map((skill, i) => (
                      <span
                        key={i}
                        className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </>
              )}
              {profileData.socialLinks && (
                <>
                  <h3 className="mt-4 font-semibold">Social Links</h3>
                  <ul className="text-blue-600 text-sm space-y-1">
                    {Object.entries(profileData.socialLinks).map(
                      ([k, v], i) => (
                        <li key={i}>
                          <a
                            href={v}
                            target="_blank"
                            rel="noreferrer"
                            className="hover:underline"
                          >
                            🔗 {k}
                          </a>
                        </li>
                      )
                    )}
                  </ul>
                </>
              )}
              <div className="mt-8 flex gap-4">
                <button
                  onClick={toggleUpdateForm}
                  className="px-4 py-2 bg-indigo-600 text-white rounded"
                >
                  Update Profile
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default UserProfile;
