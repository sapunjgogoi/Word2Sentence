import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import API from '../services/api';

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const [healthStatus, setHealthStatus] = useState(null);
  const [loadingHealth, setLoadingHealth] = useState(false);

  const checkHealth = async () => {
    setLoadingHealth(true);
    setHealthStatus(null);
    try {
      const res = await API.get('/health');
      if (res.data?.success) {
        setHealthStatus(`Connected! Server Status: ${res.data.data.status}`);
      } else {
        setHealthStatus('Failed: Unexpected response shape.');
      }
    } catch (err) {
      console.error(err);
      setHealthStatus(`Failed to connect to API: ${err.message}`);
    } finally {
      setLoadingHealth(false);
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 relative overflow-hidden">
      {/* Background Blurs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cobaltBlue/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emeraldNeon/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-4xl mx-auto space-y-6 relative z-10">
        {/* Header */}
        <div className="glass-panel p-6 rounded-2xl flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-textMuted bg-clip-text text-transparent">
              Word2Sentence Dashboard
            </h1>
            <p className="text-textMuted text-sm">Welcome back, {user?.username}!</p>
          </div>
          <button
            onClick={logout}
            className="px-4 py-2 bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors text-sm font-semibold"
          >
            Log Out
          </button>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-panel p-6 rounded-2xl flex flex-col justify-between">
            <h3 className="text-textMuted text-xs font-semibold uppercase tracking-wider">Level Track</h3>
            <span className="text-3xl font-extrabold text-cobaltBlue-light mt-2">{user?.level}</span>
          </div>

          <div className="glass-panel p-6 rounded-2xl flex flex-col justify-between">
            <h3 className="text-textMuted text-xs font-semibold uppercase tracking-wider">Experience Points</h3>
            <span className="text-3xl font-extrabold text-emeraldNeon mt-2">{user?.xp} XP</span>
          </div>

          <div className="glass-panel p-6 rounded-2xl flex flex-col justify-between">
            <h3 className="text-textMuted text-xs font-semibold uppercase tracking-wider">Daily Streak</h3>
            <span className="text-3xl font-extrabold text-orange-400 mt-2">🔥 {user?.streak} Days</span>
          </div>
        </div>

        {/* Integration Test Box */}
        <div className="glass-panel p-6 rounded-2xl space-y-4">
          <h2 className="text-lg font-bold text-textMain">API Integration Check</h2>
          <p className="text-textMuted text-sm">
            Verify that your frontend application is successfully communicating with the Express API and Mongoose backend services.
          </p>
          <div className="flex items-center space-x-4">
            <button
              onClick={checkHealth}
              disabled={loadingHealth}
              className="px-5 py-2.5 bg-emeraldNeon hover:bg-emeraldNeon-dark text-white rounded-lg transition-colors font-semibold text-sm disabled:opacity-50"
            >
              {loadingHealth ? 'Checking...' : 'Check API Status'}
            </button>
            {healthStatus && (
              <span
                className={`text-sm font-semibold ${
                  healthStatus.startsWith('Connected') ? 'text-emeraldNeon-light' : 'text-red-400'
                }`}
              >
                {healthStatus}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
