import { Link } from "react-router-dom";

const UnauthorizedPage = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-10 text-center max-w-md w-full">
        <h1 className="text-3xl font-bold text-red-500 mb-4">Unauthorized</h1>
        <p className="text-gray-700 mb-6">
          You are not authorized to access this page.
          <br />
          Please login or create a new account.
        </p>
    
      </div>
    </div>
  );
};

export default UnauthorizedPage;
