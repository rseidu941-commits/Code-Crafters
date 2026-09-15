import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { registerUser } from '../api/api';
import CommunityProof from '../components/CommunityProof';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('spectator');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login: authLogin } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const user = await registerUser({ name, email, password, role });
      if (user) {
        authLogin(user);
        navigate('/');
      } else {
        setError('Registration failed');
      }
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page bg-surface min-h-[60vh] flex flex-col items-center justify-center py-12 px-4">
      <CommunityProof />
      <div className="register-page__card w-full max-w-md bg-white rounded-xl shadow-sm border border-gray-100 p-8">
        <h1 className="register-page__title text-3xl font-bold text-secondary text-center mb-6">Register</h1>

        {error && (
          <p className="register-page__error bg-red-50 text-red-600 text-sm px-4 py-2 rounded-lg mb-4">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="register-page__form flex flex-col gap-4">
          <div className="register-page__field">
            <label className="register-page__label block text-sm font-medium text-secondary mb-1">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="register-page__input w-full px-4 py-2 border border-gray-200 rounded-lg text-secondary focus:outline-none focus:border-primary"
              placeholder="Enter your name"
            />
          </div>

          <div className="register-page__field">
            <label className="register-page__label block text-sm font-medium text-secondary mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="register-page__input w-full px-4 py-2 border border-gray-200 rounded-lg text-secondary focus:outline-none focus:border-primary"
              placeholder="Enter your email"
            />
          </div>

          <div className="register-page__field">
            <label className="register-page__label block text-sm font-medium text-secondary mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="register-page__input w-full px-4 py-2 border border-gray-200 rounded-lg text-secondary focus:outline-none focus:border-primary"
              placeholder="Enter your password"
            />
          </div>

          <div className="register-page__field">
            <label className="register-page__label block text-sm font-medium text-secondary mb-1">I want to be a</label>
            <div className="register-page__roles flex gap-4">
              <label className="register-page__role flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="role"
                  value="spectator"
                  checked={role === 'spectator'}
                  onChange={(e) => setRole(e.target.value)}
                  className="accent-primary"
                />
                <span className="text-secondary">Spectator</span>
              </label>
              <label className="register-page__role flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="role"
                  value="organizer"
                  checked={role === 'organizer'}
                  onChange={(e) => setRole(e.target.value)}
                  className="accent-primary"
                />
                <span className="text-secondary">Organizer</span>
              </label>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`register-page__submit bg-primary text-white px-6 py-3 rounded-lg font-semibold transition w-full ${
              loading ? 'opacity-60 cursor-not-allowed' : 'hover:opacity-90'
            }`}
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>

        <p className="register-page__footer text-center text-sm text-secondary mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-primary font-medium hover:underline">Login here</Link>
        </p>
      </div>
    </div>
  );
}
