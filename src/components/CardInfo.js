import React from "react";

export const CardInfo = ({ icon, title, description }) => {
  return (
    <div className="bg-white hover:shadow-md transition-all duration-300 ease-in-out p-6 rounded-2xl shadow-sm border border-gray-200 hover:border-gray-300">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-zinc-900 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
};

