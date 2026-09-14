import { Link } from 'react-router-dom';

const workshops = [
  { id: 1, title: 'React Workshop', date: 'Oct 12, 2026' },
  { id: 2, title: 'JavaScript Workshop', date: 'Oct 18, 2026' },
  { id: 3, title: 'AI Workshop', date: 'Nov 02, 2026' },
  { id: 4, title: 'DevOps Bootcamp', date: 'Nov 15, 2026' },
];

export default function FeaturedPrograms() {
  return (
    <section className="programs py-16 px-4 bg-white">
      <div className="programs__container max-w-6xl mx-auto">
        <h2 className="programs__title text-3xl font-bold text-secondary text-center mb-12">Learn. Build. Grow.</h2>
        <div className="programs__grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {workshops.map(w => (
            <Link key={w.id} to={`/events/${w.id}`} className="programs__card block rounded-xl overflow-hidden shadow-sm border border-gray-100 bg-white hover:shadow-md transition">
              <div className="programs__card-header bg-primary h-2 rounded-t-xl"></div>
              <div className="programs__card-body p-4">
                <h3 className="programs__card-title font-semibold text-secondary mb-1">{w.title}</h3>
                <p className="programs__card-date text-sm text-gray-500 mb-2">{w.date}</p>
                <span className="programs__card-badge inline-block bg-accent text-white text-xs px-3 py-1 rounded-full">Upcoming</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
