import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const MockAuth = () => {
  const [searchParams] = useSearchParams();
  const provider = searchParams.get('provider') || 'google';

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);

  // Set default details based on selected social provider
  useEffect(() => {
    if (provider === 'google') {
      setEmail('google_student@gmail.com');
      setUsername('Google Student');
    } else if (provider === 'github') {
      setEmail('github_coder@github.com');
      setUsername('github_coder');
    } else if (provider === 'apple') {
      setEmail('apple_user@icloud.com');
      setUsername('Apple User');
    }
  }, [provider]);

  const handleAuthorize = () => {
    setLoading(true);
    setTimeout(() => {
      // Send data back to the main app window
      if (window.opener) {
        window.opener.postMessage(
          {
            type: 'MOCK_SOCIAL_AUTH',
            email,
            username,
            provider,
            providerId: `${provider}_id_${Math.floor(100000 + Math.random() * 900000)}`,
          },
          window.location.origin
        );
      }
      window.close();
    }, 800);
  };

  const getProviderTheme = () => {
    switch (provider) {
      case 'github':
        return {
          title: 'GitHub Developer Portal',
          logoColor: 'text-white',
          bgColor: 'bg-[#181C22]',
          btnBg: 'bg-white hover:bg-neutral-200 text-[#090D16]',
          icon: (
            <svg className="w-10 h-10 fill-current" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
          ),
        };
      case 'apple':
        return {
          title: 'Sign in with Apple',
          logoColor: 'text-white',
          bgColor: 'bg-black',
          btnBg: 'bg-white hover:bg-neutral-200 text-black',
          icon: (
            <svg className="w-10 h-10 fill-current" viewBox="0 0 24 24">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-1 .04-2.21.67-2.93 1.49-.62.69-1.16 1.84-1.01 2.96 1.12.09 2.27-.57 2.95-1.39z" />
            </svg>
          ),
        };
      default: // google
        return {
          title: 'Sign in with Google',
          logoColor: '',
          bgColor: 'bg-[#0F141E]',
          btnBg: 'bg-blue-600 hover:bg-blue-700 text-white',
          icon: (
            <svg className="w-10 h-10" viewBox="0 0 24 24">
              <path
                fill="#EA4335"
                d="M5.266 9.765A7.077 7.077 0 0 1 12 4.909c1.69 0 3.218.6 4.418 1.582L19.91 3C17.782 1.145 15.055 0 12 0 7.33 0 3.33 2.69 1.386 6.614l3.88 3.151z"
              />
              <path
                fill="#34A853"
                d="M16.04 15.345c-1.07.727-2.454 1.164-4.04 1.164-2.727 0-5.045-1.845-5.868-4.327l-3.895 3.02C4.195 19.382 7.786 22 12 22c3.123 0 5.964-1.096 8.03-3l-3.99-3.655z"
              />
              <path
                fill="#4285F4"
                d="M23.49 12.273c0-.818-.082-1.609-.227-2.373H12v4.582h6.486c-.29 1.537-1.145 2.837-2.445 3.7l3.99 3.655c2.328-2.155 3.673-5.327 3.673-9.564z"
              />
              <path
                fill="#FBBC05"
                d="M6.173 11.236A7.054 7.054 0 0 1 6.173 8.79l-3.896-3.02C1.464 7.373 1 9.636 1 12s.464 4.627 1.277 6.23l3.896-3.02c-.373-.591-.59-1.282-.59-1.973z"
              />
            </svg>
          ),
        };
    }
  };

  const theme = getProviderTheme();

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 bg-neutral-950 font-sans`}>
      <div
        className={`w-full max-w-sm rounded-xl border border-neutral-800 p-6 ${theme.bgColor} text-neutral-200 shadow-2xl relative overflow-hidden`}
      >
        {/* Glow Header */}
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500"></div>

        <div className="flex flex-col items-center text-center mt-4">
          {theme.icon}
          <h2 className="text-xl font-bold mt-4 text-white">{theme.title}</h2>
          <p className="text-xs text-neutral-400 mt-1">Simulated Authorization Sandbox</p>
        </div>

        <div className="border-t border-neutral-800 my-6"></div>

        <div className="space-y-4">
          <p className="text-sm text-neutral-300">
            <strong>Word2Sentence</strong> wants to access your public profile and email address.
          </p>

          <div className="bg-neutral-900/60 border border-neutral-800 p-4 rounded-lg space-y-3">
            <div>
              <label className="block text-[10px] uppercase tracking-wider text-neutral-400 font-semibold mb-1">
                Authorized Name
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-800 px-3 py-2 rounded text-sm text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-wider text-neutral-400 font-semibold mb-1">
                Authorized Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-800 px-3 py-2 rounded text-sm text-white focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col space-y-2">
          <button
            onClick={handleAuthorize}
            disabled={loading}
            className={`w-full py-2.5 rounded font-semibold text-sm transition-all flex items-center justify-center space-x-2 ${theme.btnBg} disabled:opacity-50`}
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
            ) : (
              'Authorize & Continue'
            )}
          </button>
          <button
            onClick={() => window.close()}
            className="w-full py-2.5 bg-transparent hover:bg-white/5 border border-neutral-800 rounded font-semibold text-sm text-neutral-400 hover:text-white transition-all"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default MockAuth;
