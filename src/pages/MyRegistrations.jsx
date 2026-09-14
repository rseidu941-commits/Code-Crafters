import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getRegistrationsByUser, getEvents } from '../api/api';

export default function MyRegistrations() {
  const { user } = useAuth();
  const [registrations, setRegistrations] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      setLoading(true);
      getRegistrationsByUser(user.id).then(myRegs => {
        setRegistrations(myRegs);
        getEvents().then(allEvents => {
          setEvents(allEvents);
          setLoading(false);
        });
      });
    }
  }, [user]);

  const getEventById = (eventId) => events.find(e => e.id === eventId);

  if (loading) {
    return (
      <div className="my-registrations-page bg-surface min-h-[60vh] flex items-center justify-center">
        <p className="my-registrations-page__loading text-secondary">Loading...</p>
      </div>
    );
  }

  return (
    <div className="my-registrations-page bg-surface min-h-[60vh] py-12 px-4">
      <div className="my-registrations-page__container max-w-6xl mx-auto">
        <h1 className="my-registrations-page__title text-3xl font-bold text-secondary mb-8">My Registrations</h1>

        {registrations.length === 0 ? (
          <div className="my-registrations-page__empty text-center py-12">
            <p className="my-registrations-page__empty-text text-secondary mb-4">You haven't registered for any events yet.</p>
            <Link to="/events" className="my-registrations-page__browse-btn bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition">
              Browse Events
            </Link>
          </div>
        ) : (
          <div className="my-registrations-page__grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {registrations.map(reg => {
              const event = getEventById(reg.eventId);
              if (!event) return null;
              return (
                <Link key={reg.id} to={`/events/${event.id}`} className="my-registrations-page__card block bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition">
                  <div className="my-registrations-page__card-strip bg-primary h-2 rounded-t-xl -mt-6 -mx-6 mb-4"></div>
                  <h3 className="my-registrations-page__card-title font-semibold text-secondary mb-1">{event.title}</h3>
                  <p className="my-registrations-page__card-date text-sm text-gray-500 mb-2">{event.date}</p>
                  <span className="my-registrations-page__card-status inline-block bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full">{reg.status}</span>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
