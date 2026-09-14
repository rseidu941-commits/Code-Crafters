import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import NotificationBell from './NotificationBell';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  return (
    <nav className="navbar sticky top-0 z-50 bg-white shadow-sm">
      <div className="navbar__container max-w-6xl mx-auto px-4 py-3 md:py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="navbar__logo flex items-center gap-2">
          <img src="/images/code_crafters_logo.png" alt="Code Crafters" className="navbar__logo-img h-8 w-8 md:h-10 md:w-10 object-contain" />
          <span className="navbar__brand text-lg md:text-xl font-bold text-primary">Code Crafters</span>
        </Link>

        {/* Desktop links */}
        <div className="navbar__links hidden md:flex items-center gap-6">
          <NavLink to="/" className={({ isActive }) => `navbar__link font-medium transition-colors ${isActive ? 'text-primary' : 'text-secondary hover:text-primary'}`}>Home</NavLink>
          <NavLink to="/events" className={({ isActive }) => `navbar__link font-medium transition-colors ${isActive ? 'text-primary' : 'text-secondary hover:text-primary'}`}>Events</NavLink>

          {user ? (
            <div className="navbar__user flex items-center gap-4">
              <NotificationBell />
              <span className="navbar__username text-sm text-secondary">Hi, {user.name}</span>
              {user.role === 'organizer' && (
                <NavLink to="/my-events" className={({ isActive }) => `navbar__link font-medium transition-colors ${isActive ? 'text-primary' : 'text-secondary hover:text-primary'}`}>My Events</NavLink>
              )}
              {user.role === 'spectator' && (
                <NavLink to="/my-registrations" className={({ isActive }) => `navbar__link font-medium transition-colors ${isActive ? 'text-primary' : 'text-secondary hover:text-primary'}`}>My Registrations</NavLink>
              )}
              <button onClick={logout} className="navbar__logout text-sm text-secondary hover:text-primary">Logout</button>
            </div>
          ) : (
            <Link to="/register" className="navbar__join-btn bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition">Join Community</Link>
          )}
        </div>

        {/* Mobile: hamburger + join community */}
        <div className="navbar__mobile flex items-center gap-2 md:hidden">
          {!user && (
            <Link to="/register" className="navbar__join-btn bg-primary text-white px-3 py-1.5 rounded-lg text-xs md:text-sm font-medium">Join</Link>
          )}
          {user && (
            <>
              <NotificationBell />
              <span className="navbar__username text-xs text-secondary mr-1">Hi, {user.name}</span>
            </>
          )}
          <button onClick={() => setMenuOpen(!menuOpen)} className="navbar__hamburger text-secondary text-xl md:text-2xl">
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className="navbar__dropdown md:hidden bg-white border-t px-4 py-4 flex flex-col gap-3">
          <NavLink to="/" onClick={() => setMenuOpen(false)} className="navbar__link font-medium transition-colors text-secondary hover:text-primary">Home</NavLink>
          <NavLink to="/events" onClick={() => setMenuOpen(false)} className="navbar__link font-medium transition-colors text-secondary hover:text-primary">Events</NavLink>
          {user && user.role === 'organizer' && (
            <NavLink to="/my-events" onClick={() => setMenuOpen(false)} className="navbar__link font-medium transition-colors text-secondary hover:text-primary">My Events</NavLink>
          )}
          {user && user.role === 'spectator' && (
            <NavLink to="/my-registrations" onClick={() => setMenuOpen(false)} className="navbar__link font-medium transition-colors text-secondary hover:text-primary">My Registrations</NavLink>
          )}
          {user && (
            <button onClick={() => { logout(); setMenuOpen(false); }} className="navbar__link font-medium transition-colors text-secondary hover:text-primary text-left">Logout</button>
          )}
        </div>
      )}
    </nav>
  );
}
