import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { login } from '../api/api';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login: authLogin } = useAuth();
  const navigate = useNavigate();

  // Login //
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const user = await login(email, password);
      if (user) {
        authLogin(user);
        navigate('/');
      } else {
        setError('Invalid email or password');
      }
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page bg-surface min-h-[60vh] flex items-center justify-center py-12 px-4">
      <div className="login-page__card w-full max-w-md bg-white rounded-xl shadow-sm border border-gray-100 p-8">
        <h1 className="login-page__title text-3xl font-bold text-secondary text-center mb-6">Login</h1>

        {error && (
          <p className="login-page__error bg-red-50 text-red-600 text-sm px-4 py-2 rounded-lg mb-4">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="login-page__form flex flex-col gap-4">
          <div className="login-page__field">
            <label className="login-page__label block text-sm font-medium text-secondary mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="login-page__input w-full px-4 py-2 border border-gray-200 rounded-lg text-secondary focus:outline-none focus:border-primary"
              placeholder="Enter your email"
            />
          </div>

          <div className="login-page__field">
            <label className="login-page__label block text-sm font-medium text-secondary mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="login-page__input w-full px-4 py-2 border border-gray-200 rounded-lg text-secondary focus:outline-none focus:border-primary"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`login-page__submit bg-primary text-white px-6 py-3 rounded-lg font-semibold transition w-full ${
              loading ? 'opacity-60 cursor-not-allowed' : 'hover:opacity-90'
            }`}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="login-page__footer text-center text-sm text-secondary mt-6">
          Don't have an account?{' '}
          <Link to="/register" className="text-primary font-medium hover:underline">Register here</Link>
        </p>
      </div>
    </div>
  );
}
