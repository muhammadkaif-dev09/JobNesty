import React from "react";
import { Link } from "react-router-dom";

const AuthForm = ({
  isLogin = true,
  handleSubmit,
  register,
  errors,
  visible,
  handleCheckBox,
}) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      {/* Top Navbar (if any) */}
      {/* <AuthNavbar /> */}

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 transition-all duration-500 animate-fade-in">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-indigo-600 dark:text-indigo-400 mb-6">
            {isLogin ? "Welcome Back to JobNesty" : "Create JobNesty Account"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <div>
                <label className="block mb-1 font-medium">Full Name</label>
                <input
                  {...register("fullName")}
                  type="text"
                  placeholder="Jhon Smith"
                  className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                />
                {errors.fullName && (
                  <p className="text-red-500 text-sm">
                    {errors.fullName.message}
                  </p>
                )}
              </div>
            )}

            <div>
              <label className="block mb-1 font-medium">Email</label>
              <input
                {...register("email")}
                type="email"
                placeholder="you@example.com"
                className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="block mb-1 font-medium">Password</label>
              <input
                {...register("password")}
                type={visible ? "text" : "password"}
                placeholder="••••••••"
                className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
              />
              <div className="flex items-center mt-2">
                <input
                  type="checkbox"
                  onClick={handleCheckBox}
                  className="mr-2"
                />
                <label className="text-sm">Show Password</label>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>

            {!isLogin && (
              <div>
                <label className="block mb-1 font-medium">Role</label>
                <select
                  {...register("role")}
                  className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                >
                  <option value="">Select Role</option>
                  <option value="job_seeker">Job Seeker</option>
                  <option value="recruiter">Recruiter</option>
                </select>
                {errors.role && (
                  <p className="text-red-500 text-sm">{errors.role.message}</p>
                )}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white font-semibold py-2 rounded-lg hover:bg-indigo-700 transition"
            >
              {isLogin ? "Login" : "Register"}
            </button>
          </form>

          <p className="text-center text-sm mt-6">
            {isLogin ? "Don’t have an account?" : "Already have an account?"}{" "}
            <Link
              to={isLogin ? "/" : "/login"}
              className="text-indigo-600 font-medium hover:underline"
            >
              {isLogin ? "Register" : "Login"}
            </Link>
          </p>
        </div>
      </main>

      {/* Footer (if needed) */}
      {/* <Footer /> */}
    </div>
  );
};

export default AuthForm;
