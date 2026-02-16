import React from "react";

const Dashboard = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 px-4">
      <div className="bg-white shadow-xl rounded-xl p-10 max-w-lg w-full text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Welcome to the Dashboard
        </h1>
        <p className="text-gray-600 text-lg">
          This is a protected area. Only authenticated users can access this page.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
