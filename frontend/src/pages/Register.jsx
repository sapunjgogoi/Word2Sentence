import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [level, setLevel] = useState('Beginner');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const res = await register(username, email, password, level);
    setLoading(false);

    if (res.success) {
      navigate('/');
    } else {
      setError(res.message);
    }
  };

  const tracks = [
    { name: 'Beginner', desc: 'Simple conversational words' },
    { name: 'Intermediate', desc: 'Standard business/daily words' },
    { name: 'Advanced', desc: 'Literary & complex words' },
    { name: 'IELTS', desc: 'Academic exam preparation' },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Background Blurs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cobaltBlue/10 rounded-full blur-[100px] pointer-events-none animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emeraldNeon/10 rounded-full blur-[100px] pointer-events-none animate-pulse"></div>

      <div className="glass-panel w-full max-w-lg p-8 rounded-2xl shadow-xl relative z-10">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-cobaltBlue-light via-white to-emeraldNeon-light bg-clip-text text-transparent">
            Start Learning
          </h2>
          <p className="text-textMuted mt-2">Create your account and select your vocabulary track</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-3 rounded-lg mb-6 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold text-textMuted uppercase tracking-wider mb-2">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="alex_smith"
              className="w-full px-4 py-3 bg-customInput border border-borderSlate rounded-lg focus:outline-none focus:border-cobaltBlue text-textMain transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-textMuted uppercase tracking-wider mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="name@domain.com"
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
              placeholder="Min 6 characters"
              className="w-full px-4 py-3 bg-customInput border border-borderSlate rounded-lg focus:outline-none focus:border-cobaltBlue text-textMain transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-textMuted uppercase tracking-wider mb-2">
              Learning Level Track
            </label>
            <div className="grid grid-cols-2 gap-3">
              {tracks.map((t) => (
                <button
                  key={t.name}
                  type="button"
                  onClick={() => setLevel(t.name)}
                  className={`p-3 rounded-lg border text-left transition-all ${
                    level === t.name
                      ? 'border-cobaltBlue bg-cobaltBlue/5 text-textMain'
                      : 'border-borderSlate bg-customInput/50 text-textMuted hover:border-borderSlate/80'
                  }`}
                >
                  <p className="font-semibold text-sm">{t.name}</p>
                  <p className="text-xs text-textMuted mt-1">{t.desc}</p>
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-cobaltBlue hover:bg-cobaltBlue-dark text-white font-semibold rounded-lg shadow-glowCobalt hover:shadow-none transition-all flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating Account...' : 'Get Started'}
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-textMuted">
          Already have an account?{' '}
          <Link to="/login" className="text-cobaltBlue-light hover:underline font-medium">
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
