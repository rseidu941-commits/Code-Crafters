import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="not-found-page bg-surface min-h-[60vh] flex items-center justify-center py-12 px-4">
      <div className="not-found-page__content text-center">
        <h1 className="not-found-page__title text-6xl font-bold text-primary mb-4">404</h1>
        <p className="not-found-page__message text-xl text-secondary mb-8">Page not found</p>
        <Link to="/" className="not-found-page__link bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition">
          Go Home
        </Link>
      </div>
    </div>
  );
}
