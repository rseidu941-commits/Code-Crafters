import { useState, useEffect } from 'react';
import { getEvents } from '../api/api';
import EventCard from '../components/EventCard';
import FilterBar from '../components/FilterBar';

export default function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    category: '',
    modality: '',
    technology: '',
    date: '',
  });

  // Fetch all events on load //
  useEffect(() => {
    setLoading(true);
    getEvents().then(data => {
      setEvents(data);
      setLoading(false);
    }).catch(() => {
      setError('Failed to load events. Please try again later.');
      setLoading(false);
    });
  }, []);

  // Client-side search and filter //
  const filteredEvents = events.filter(event => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = !filters.category || event.category === filters.category;
    const matchesModality = !filters.modality || event.modality === filters.modality;
    const matchesTechnology = !filters.technology || event.technology === filters.technology;

    let matchesDate = true;
    if (filters.date === 'october') {
      matchesDate = event.date.startsWith('2026-10');
    } else if (filters.date === 'november') {
      matchesDate = event.date.startsWith('2026-11');
    }

    return matchesSearch && matchesCategory && matchesModality && matchesTechnology && matchesDate;
  });

  return (
    <div className="events-page bg-surface min-h-[60vh] py-12 px-4">
      <div className="events-page__container max-w-6xl mx-auto">
        <h1 className="events-page__title text-3xl font-bold text-secondary mb-8">Events</h1>

        <FilterBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filters={filters}
          setFilters={setFilters}
        />

        {loading ? (
          <p className="events-page__loading text-center text-secondary py-12">Loading events...</p>
        ) : error ? (
          <p className="events-page__error text-center text-red-500 py-12">{error}</p>
        ) : filteredEvents.length === 0 ? (
          <p className="events-page__empty text-center text-secondary py-12">No events found matching your filters.</p>
        ) : (
          <div className="events-page__grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
