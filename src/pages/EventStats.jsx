import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getEvent, getRegistrations, getUsers, updateRegistration } from '../api/api';
import { useAuth } from '../context/AuthContext';
import StatsCard from '../components/StatsCard';

export default function EventStats() {
  const { id } = useParams();
  const { user } = useAuth();
  const [event, setEvent] = useState(null);
  const [registrations, setRegistrations] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getEvent(id).then(data => setEvent(data));
    getRegistrations(id).then(data => setRegistrations(data));
    getUsers().then(data => setUsers(data));
  }, [id]);

  const getUserName = (userId) => {
    const found = users.find(u => Number(u.id) === Number(userId));
    return found ? found.name : `User #${userId}`;
  };

  const handleToggleAttendance = async (regId, currentStatus) => {
    const newStatus = currentStatus === 'attended' ? 'confirmed' : 'attended';
    try {
      await updateRegistration(regId, { status: newStatus });
      setRegistrations(prev =>
        prev.map(r => r.id === regId ? { ...r, status: newStatus } : r)
      );
    } catch {
      alert('Failed to update attendance.');
    }
  };

  if (!event) {
    return (
      <div className="event-stats-page bg-surface min-h-[60vh] flex items-center justify-center">
        <p className="event-stats-page__loading text-secondary">Loading...</p>
      </div>
    );
  }

  if (user && Number(event.organizerId) !== Number(user.id)) {
    return (
      <div className="event-stats-page bg-surface min-h-[60vh] flex items-center justify-center">
        <p className="event-stats-page__error text-secondary">You do not have access to this page.</p>
      </div>
    );
  }

  return (
    <div className="event-stats-page bg-surface min-h-[60vh] py-12 px-4">
      <div className="event-stats-page__container max-w-4xl mx-auto">
        <h1 className="event-stats-page__title text-3xl font-bold text-secondary mb-2">Stats: {event.title}</h1>
        <p className="event-stats-page__date text-secondary mb-8">{event.date}</p>

        <div className="event-stats-page__cards grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <StatsCard label="Views" value={event.views} />
          <StatsCard label="Registrations" value={registrations.length} />
          <StatsCard label="Attended" value={registrations.filter(r => r.status === 'attended').length} />
        </div>

        <div className="event-stats-page__list bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="event-stats-page__list-title text-xl font-bold text-secondary mb-4">Registered Users</h2>
          {registrations.length === 0 ? (
            <p className="event-stats-page__empty text-secondary">No registrations yet.</p>
          ) : (
            <div className="event-stats-page__list-items flex flex-col gap-2">
              {registrations.map(reg => (
                <div key={reg.id} className="event-stats-page__list-item flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                  <span className="event-stats-page__user-name text-secondary">{getUserName(reg.userId)}</span>
                  <div className="flex items-center gap-3">
                    <span className={`event-stats-page__status text-sm px-3 py-1 rounded-full ${
                      reg.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                      reg.status === 'attended' ? 'bg-blue-100 text-blue-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {reg.status}
                    </span>
                    <button
                      onClick={() => handleToggleAttendance(reg.id, reg.status)}
                      className="event-stats-page__toggle-btn text-xs text-primary hover:underline"
                    >
                      {reg.status === 'attended' ? 'Undo' : 'Mark Attended'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
