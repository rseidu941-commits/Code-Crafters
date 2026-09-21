import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getEvents, getRegistrations, deleteEvent } from '../api/api';

export default function MyEvents() {
  const { user } = useAuth();
  const [events, setEvents] = useState([]);
  const [eventStats, setEventStats] = useState({});

  // Fetch events and filter by organizerId //
  useEffect(() => {
    if (user) {
      getEvents().then(data => {
        const myEvents = data.filter(e => Number(e.organizerId) === Number(user.id));
        setEvents(myEvents);

        myEvents.forEach(event => {
          getRegistrations(event.id).then(regs => {
            setEventStats(prev => ({ ...prev, [event.id]: regs.length }));
          });
        });
      });
    }
  }, [user]);

  // Delete event with confirmation //
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        await deleteEvent(id);
        setEvents(events.filter(e => e.id !== id));
      } catch {
        alert('Failed to delete event.');
      }
    }
  };

  return (
    <div className="my-events-page bg-surface min-h-[60vh] py-12 px-4">
      <div className="my-events-page__container max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="my-events-page__title text-3xl font-bold text-secondary">My Events</h1>
          <Link to="/events/new" className="my-events-page__create-btn bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition">
            + New Event
          </Link>
        </div>

        {events.length === 0 ? (
          <p className="text-center text-secondary py-12">You haven't created any events yet.</p>
        ) : (
          <div className="my-events-page__grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map(event => (
              <div key={event.id} className="my-events-page__card bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="bg-primary h-2 rounded-t-xl -mt-6 -mx-6 mb-4"></div>
                <h3 className="my-events-page__card-title font-semibold text-secondary mb-1">{event.title}</h3>
                <p className="my-events-page__card-date text-sm text-gray-500 mb-2">{event.date}</p>
                <p className="my-events-page__card-modality text-sm text-secondary mb-4">
                  {event.modality === 'online' ? 'Online' : 'In-Person'} — {event.location}
                </p>

                <div className="flex items-center gap-2 mb-4">
                  <span className="text-sm text-secondary">{eventStats[event.id] || 0} registered</span>
                </div>

                <div className="flex gap-2">
                  <Link to={`/events/${event.id}/edit`} className="my-events-page__edit-btn bg-gray-100 text-secondary px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition">
                    Edit
                  </Link>
                  <Link to={`/my-events/${event.id}/stats`} className="my-events-page__stats-btn bg-gray-100 text-secondary px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition">
                    Stats
                  </Link>
                  <button onClick={() => handleDelete(event.id)} className="my-events-page__delete-btn bg-red-50 text-red-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-100 transition">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
