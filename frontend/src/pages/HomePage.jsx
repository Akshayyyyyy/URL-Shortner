// components/HomePage.jsx
import React from "react";
import ShortenForm from "../comonents/ShortnerForm";

function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-lg transition-all duration-300 hover:shadow-blue-300">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
          🔗 Modern URL Shortener
        </h1>
        <ShortenForm />
      </div>
    </div>
  );
}

export default HomePage;
