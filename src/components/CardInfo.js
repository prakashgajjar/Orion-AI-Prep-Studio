import React from "react";

export const CardInfo = ({ icon, title, description }) => {
  return (
    <div className="bg-blue-50 hover:bg-blue-100 transition-all duration-300 ease-in-out p-6 rounded-2xl shadow-sm border border-blue-100 hover:shadow-md">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-blue-800 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
};

