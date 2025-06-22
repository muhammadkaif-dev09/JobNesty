import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaCamera, FaPlus, FaTimes } from "react-icons/fa";
import Footer from "../src/components/Footer";
import NavBar from "../src/components/NavBar";

const UserProfile = () => {
  const [profileData, setProfileData] = useState({});
  const [loading, setLoading] = useState(true);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [formData, setFormData] = useState({});
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [originalPassword, setOriginalPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [skillInput, setSkillInput] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://localhost:3000/user/profile", {
          withCredentials: true,
        });
        const user = res.data.user;
        setProfileData(user);
        setFormData({
          fullName: user.fullName,
          phone: user.phone || "",
          bio: user.bio || "",
          location: user.location || "",
          role: user.role,
          skills: user.skills || [],
          socialLinks: user.socialLinks || {},
          profilePic: user.profilePic || "",
        });
        setPreviewImage(user.profilePic || "");
      } catch (err) {
        console.error("Failed to load profile.", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("socialLinks.")) {
      const field = name.split(".")[1];
      setFormData({
        ...formData,
        socialLinks: {
          ...formData.socialLinks,
          [field]: value,
        },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
      setFormData({ ...formData, profilePic: file });
    }
  };

  const handleSkillAdd = () => {
    if (skillInput.trim() !== "") {
      setFormData({
        ...formData,
        skills: [...formData.skills, skillInput.trim()],
      });
      setSkillInput("");
    }
  };

  const handleSkillRemove = (index) => {
    const updatedSkills = formData.skills.filter((_, idx) => idx !== index);
    setFormData({ ...formData, skills: updatedSkills });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const updatedForm = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === "socialLinks" || key === "skills") {
        updatedForm.append(key, JSON.stringify(value));
      } else {
        updatedForm.append(key, value);
      }
    });
    try {
      const res = await axios.put(
        "http://localhost:3000/user/update",
        updatedForm,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      if (res.data.success) {
        alert("Profile updated successfully");
        setShowUpdateForm(false);
      }
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }
    try {
      const res = await axios.post(
        "http://localhost:3000/user/change-password",
        { originalPassword, newPassword },
        { withCredentials: true }
      );
      if (res.data.success) {
        alert("Password changed successfully");
        setShowPasswordForm(false);
        setOriginalPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setPasswordError("");
      }
    } catch (err) {
      setPasswordError("Current password is incorrect");
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
        <div className="w-full max-w-3xl bg-white dark:bg-gray-800 shadow-lg rounded-xl p-8">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <img
              src={profileData.profilePic}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover border-2 border-indigo-400"
            />
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                {profileData.fullName}
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
              <p className="text-sm text-gray-500 dark:text-gray-300">
                <strong>Joined:</strong>{" "}
                {new Date(profileData.createdAt).toLocaleDateString("en-IN")}
              </p>
            </div>
          </div>

          {profileData.bio && (
            <div className="mt-6">
              <h3 className="font-semibold">Bio</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                {profileData.bio}
              </p>
            </div>
          )}

          {profileData.skills?.length > 0 && (
            <div className="mt-6">
              <h3 className="font-semibold">Skills</h3>
              <div className="flex flex-wrap gap-2 mt-2">
                {profileData.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 text-sm bg-indigo-100 dark:bg-indigo-700 text-indigo-700 dark:text-white rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {profileData.socialLinks && (
            <div className="mt-6">
              <h3 className="font-semibold">Social Links</h3>
              <ul className="mt-2 space-y-1 text-blue-600 dark:text-blue-400 text-sm">
                {Object.entries(profileData.socialLinks).map(
                  ([key, url], idx) => (
                    <li key={idx}>
                      <a
                        href={url}
                        target="_blank"
                        rel="noreferrer"
                        className="hover:text-blue-800 dark:hover:text-blue-300"
                      >
                        🔗 {key.charAt(0).toUpperCase() + key.slice(1)}
                      </a>
                    </li>
                  )
                )}
              </ul>
            </div>
          )}

          <div className="mt-6 text-center space-x-4 flex flex-col gap-2 md:flex-row mb-5">
            <button
              onClick={toggleUpdateForm}
              className="px-4 py-2 bg-indigo-600 text-white rounded cursor-pointer w-[10rem]"
            >
              Update Profile
            </button>
            <button
              onClick={togglePasswordForm}
              className="px-4 py-2 bg-red-600 text-white rounded cursor-pointer w-[10rem]"
            >
              Change Password
            </button>
          </div>

          {showUpdateForm && (
            <form onSubmit={handleUpdate} className="mt-6 space-y-4">
              <div className="flex items-center gap-4">
                <div className="relative w-20 h-20">
                  <img
                    src={previewImage}
                    className="w-20 h-20 rounded-full object-cover border-2 border-indigo-400"
                    alt="Preview"
                  />
                  <label className="absolute bottom-0 right-0 bg-indigo-600 p-1 rounded-full cursor-pointer">
                    <FaCamera className="text-white" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
              <input
                name="fullName"
                placeholder={formData.fullName || "Enter Your Full Name"}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded border dark:bg-gray-700"
              />
              <input
                name="phone"
                placeholder={formData.phone || "Enter Your Phone"}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded border dark:bg-gray-700"
              />
              <input
                name="location"
                placeholder={formData.location || "Enter Your Location"}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded border dark:bg-gray-700"
              />
              <textarea
                name="bio"
                placeholder={formData.bio || "Enter Your Bio"}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded border dark:bg-gray-700"
              />
              <div className="flex gap-2">
                <input
                  type="text"
                  value={skillInput}
                  placeholder="Add Skills"
                  onChange={(e) => setSkillInput(e.target.value)}
                  className="flex-1 px-4 py-2 rounded border dark:bg-gray-700"
                />
                <button
                  type="button"
                  onClick={handleSkillAdd}
                  className="px-4 py-2 bg-green-600 text-white rounded flex items-center gap-2"
                >
                  <FaPlus /> Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="flex items-center gap-1 px-3 py-1 text-sm bg-indigo-200 dark:bg-indigo-700 text-indigo-800 dark:text-white rounded-full"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => handleSkillRemove(idx)}
                      className="ml-1 text-xs text-red-500"
                    >
                      <FaTimes />
                    </button>
                  </span>
                ))}
              </div>
              <label className="dark:text-white text-black">
                Add Your Social Links
              </label>
              <input
                name="socialLinks.linkedin"
                placeholder={formData.socialLinks.linkedin || "LinkedIn URL"}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded border dark:bg-gray-700"
              />
              <input
                name="socialLinks.github"
                placeholder={formData.socialLinks.github || "GitHub URL"}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded border dark:bg-gray-700"
              />
              <input
                name="socialLinks.portfolio"
                placeholder={formData.socialLinks.portfolio || "Portfolio URL"}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded border dark:bg-gray-700"
              />
              <button
                type="submit"
                className="w-full py-2 bg-indigo-600 text-white rounded"
              >
                Save Changes
              </button>
            </form>
          )}

          {showPasswordForm && (
            <form
              onSubmit={handlePasswordChange}
              className="mt-6 space-y-4 border-t pt-6"
            >
              <input
                type="password"
                value={originalPassword}
                onChange={(e) => setOriginalPassword(e.target.value)}
                placeholder="Current Password"
                className="w-full px-4 py-2 rounded border dark:bg-gray-700"
              />
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="New Password"
                className="w-full px-4 py-2 rounded border dark:bg-gray-700"
              />
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm New Password"
                className="w-full px-4 py-2 rounded border dark:bg-gray-700"
              />
              {passwordError && (
                <p className="text-red-500 text-sm">{passwordError}</p>
              )}
              <button
                type="submit"
                className="w-full py-2 bg-red-600 text-white rounded"
              >
                Update Password
              </button>
            </form>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default UserProfile;
