import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login, socialLogin } = useContext(AuthContext);
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

  const handleSocialLogin = (provider) => {
    setError('');
    
    // Popup window sizes and centering
    const width = 500;
    const height = 600;
    const left = window.screen.width / 2 - width / 2;
    const top = window.screen.height / 2 - height / 2;
    
    const popup = window.open(
      `/mock-auth?provider=${provider}`,
      'MockSocialAuthPopup',
      `width=${width},height=${height},top=${top},left=${left},status=no,resizable=yes`
    );

    if (!popup) {
      setError('Popup blocked! Please allow popups in your browser settings.');
      return;
    }

    const messageListener = async (event) => {
      // Security check: ensure event matches our origin
      if (event.origin !== window.location.origin) return;
      
      const { data } = event;
      if (data && data.type === 'MOCK_SOCIAL_AUTH') {
        window.removeEventListener('message', messageListener);
        
        setLoading(true);
        const res = await socialLogin(data.email, data.username, data.provider, data.providerId);
        setLoading(false);
        
        if (res.success) {
          navigate('/');
        } else {
          setError(res.message);
        }
      }
    };

    window.addEventListener('message', messageListener);
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

          <div className="relative flex py-2 items-center">
            <div className="flex-grow border-t border-borderSlate"></div>
            <span className="flex-shrink mx-4 text-textMuted text-xs font-semibold uppercase tracking-wider">Or continue with</span>
            <div className="flex-grow border-t border-borderSlate"></div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {/* Google Button */}
            <button
              type="button"
              onClick={() => handleSocialLogin('google')}
              disabled={loading}
              className="flex items-center justify-center py-2.5 bg-customInput border border-borderSlate hover:border-borderSlate/80 rounded-lg transition-colors cursor-pointer"
              title="Google"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#EA4335" d="M5.266 9.765A7.077 7.077 0 0 1 12 4.909c1.69 0 3.218.6 4.418 1.582L19.91 3C17.782 1.145 15.055 0 12 0 7.33 0 3.33 2.69 1.386 6.614l3.88 3.151z"/>
                <path fill="#34A853" d="M16.04 15.345c-1.07.727-2.454 1.164-4.04 1.164-2.727 0-5.045-1.845-5.868-4.327l-3.895 3.02C4.195 19.382 7.786 22 12 22c3.123 0 5.964-1.096 8.03-3l-3.99-3.655z"/>
                <path fill="#4285F4" d="M23.49 12.273c0-.818-.082-1.609-.227-2.373H12v4.582h6.486c-.29 1.537-1.145 2.837-2.445 3.7l3.99 3.655c2.328-2.155 3.673-5.327 3.673-9.564z"/>
                <path fill="#FBBC05" d="M6.173 11.236A7.054 7.054 0 0 1 6.173 8.79l-3.896-3.02C1.464 7.373 1 9.636 1 12s.464 4.627 1.277 6.23l3.896-3.02c-.373-.591-.59-1.282-.59-1.973z"/>
              </svg>
            </button>

            {/* GitHub Button */}
            <button
              type="button"
              onClick={() => handleSocialLogin('github')}
              disabled={loading}
              className="flex items-center justify-center py-2.5 bg-customInput border border-borderSlate hover:border-borderSlate/80 rounded-lg transition-colors cursor-pointer"
              title="GitHub"
            >
              <svg className="w-5 h-5 fill-current text-textMain" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </button>

            {/* Apple Button */}
            <button
              type="button"
              onClick={() => handleSocialLogin('apple')}
              disabled={loading}
              className="flex items-center justify-center py-2.5 bg-customInput border border-borderSlate hover:border-borderSlate/80 rounded-lg transition-colors cursor-pointer"
              title="Apple"
            >
              <svg className="w-5 h-5 fill-current text-textMain" viewBox="0 0 24 24">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-1 .04-2.21.67-2.93 1.49-.62.69-1.16 1.84-1.01 2.96 1.12.09 2.27-.57 2.95-1.39z" />
              </svg>
            </button>
          </div>
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
