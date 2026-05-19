// src/pages/AuthCallback.jsx

import React from "react";
import "./AuthCallback.css";
const AuthCallback = () => {
  return (
    <div className="auth-callback-page">
      <div className="auth-card">
        <div className="mb-6">
          <h1 className="text-4xl font-bold mb-3">
            CampusCopilot AI
          </h1>

          <p className="text-gray-400 text-lg leading-relaxed">
            Swiggy MCP OAuth Callback Endpoint
          </p>
        </div>

        <div className="bg-[#181818] border border-[#2a2a2a] rounded-2xl p-6">
          <h2 className="text-2xl font-semibold mb-4">
            Integration Status
          </h2>

          <p className="text-gray-300 leading-relaxed mb-4">
            This route is reserved for secure OAuth authentication
            and MCP integration workflows.
          </p>

          <p className="text-gray-500 text-sm">
            Backend authentication services are currently under development.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap gap-4">
          <a
            href="/"
            className="px-6 py-3 rounded-xl bg-white text-black font-semibold hover:scale-105 transition"
          >
            Back to Portfolio
          </a>

          <a
            href="https://github.com/"
            target="_blank"
            rel="noreferrer"
            className="px-6 py-3 rounded-xl border border-gray-700 hover:border-white transition"
          >
            GitHub
          </a>
        </div>
      </div>
    </div>
  );
};

export default AuthCallback;
