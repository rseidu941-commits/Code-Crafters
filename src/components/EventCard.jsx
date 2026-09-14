import { Link } from 'react-router-dom';

export default function EventCard({ event }) {
  return (
    <Link to={`/events/${event.id}`} className="event-card block rounded-xl overflow-hidden shadow-sm border border-gray-100 bg-white hover:shadow-md transition">
      <div className="event-card__header bg-primary h-2 rounded-t-xl"></div>
      <div className="event-card__body p-4">
        <h3 className="event-card__title font-semibold text-secondary mb-1">{event.title}</h3>
        <p className="event-card__date text-sm text-gray-500 mb-2">{event.date}</p>
        <div className="event-card__meta flex flex-wrap gap-2">
          <span className="event-card__badge inline-block bg-accent text-white text-xs px-3 py-1 rounded-full">{event.modality === 'online' ? 'Online' : 'In-Person'}</span>
          <span className="event-card__category inline-block bg-gray-100 text-secondary text-xs px-3 py-1 rounded-full">{event.category}</span>
          <span className="event-card__technology inline-block bg-gray-100 text-secondary text-xs px-3 py-1 rounded-full">{event.technology}</span>
        </div>
      </div>
    </Link>
  );
}
