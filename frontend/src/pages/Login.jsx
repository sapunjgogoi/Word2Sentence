import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const res = await login(email, password);
    setLoading(false);

    if (res.success) {
      navigate('/');
    } else {
      setError(res.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background Blurs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cobaltBlue/10 rounded-full blur-[100px] pointer-events-none animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emeraldNeon/10 rounded-full blur-[100px] pointer-events-none animate-pulse"></div>

      <div className="glass-panel w-full max-w-md p-8 rounded-2xl shadow-xl relative z-10">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-cobaltBlue-light via-white to-emeraldNeon-light bg-clip-text text-transparent">
            Word2Sentence
          </h2>
          <p className="text-textMuted mt-2">Log in to continue your vocabulary journey</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-3 rounded-lg mb-6 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold text-textMuted uppercase tracking-wider mb-2">
              Username or Email
            </label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="username or email"
              className="w-full px-4 py-3 bg-customInput border border-borderSlate rounded-lg focus:outline-none focus:border-cobaltBlue text-textMain transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-textMuted uppercase tracking-wider mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              className="w-full px-4 py-3 bg-customInput border border-borderSlate rounded-lg focus:outline-none focus:border-cobaltBlue text-textMain transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-cobaltBlue hover:bg-cobaltBlue-dark text-white font-semibold rounded-lg shadow-glowCobalt hover:shadow-none transition-all flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Logging in...' : 'Log In'}
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-textMuted">
          Don't have an account?{' '}
          <Link to="/register" className="text-cobaltBlue-light hover:underline font-medium">
            Create account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
