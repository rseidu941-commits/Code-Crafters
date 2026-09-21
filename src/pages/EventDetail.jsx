import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getEvent, getRegistrations, createRegistration, createNotification, incrementViews, deleteRegistration } from '../api/api';
import { useAuth } from '../context/AuthContext';

export default function EventDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [registrations, setRegistrations] = useState([]);
  const [isRegistered, setIsRegistered] = useState(false);
  const [registeredCount, setRegisteredCount] = useState(0);
  const [loading, setLoading] = useState(true);

  // Fetch event and increment views //
  useEffect(() => {
    setLoading(true);
    getEvent(id).then(data => {
      setEvent(data);
      setLoading(false);
      incrementViews(id);
    }).catch(() => setLoading(false));
  }, [id]);

  // Fetch registrations and check if user is registered //
  useEffect(() => {
    getRegistrations(id).then(data => {
      setRegistrations(data);
      setRegisteredCount(data.length);
      if (user) {
        setIsRegistered(data.some(r => Number(r.userId) === Number(user.id)));
      }
    });
  }, [id, user]);

  // Register for event and create notification //
  const handleRegister = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (isRegistered) return;

    try {
      await createRegistration({
        eventId: Number(id),
        userId: user.id,
        status: 'confirmed',
      });

      await createNotification({
        userId: user.id,
        eventId: Number(id),
        type: 'registration',
        message: `You registered for ${event.title}`,
        read: false,
        createdAt: new Date().toISOString().split('T')[0],
      });

      setIsRegistered(true);
      setRegisteredCount(registeredCount + 1);
    } catch {
      alert('Failed to register. Please try again.');
    }
  };

  // Cancel registration //
  const handleCancel = async () => {
    if (!isRegistered) return;

    const reg = registrations.find(r => Number(r.userId) === Number(user.id));
    if (!reg) return;

    try {
      await deleteRegistration(reg.id);
      setIsRegistered(false);
      setRegisteredCount(registeredCount - 1);
    } catch {
      alert('Failed to cancel registration.');
    }
  };

  if (loading) {
    return (
      <div className="event-detail-page bg-surface min-h-[60vh] flex items-center justify-center">
        <p className="event-detail-page__loading text-secondary">Loading...</p>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="event-detail-page bg-surface min-h-[60vh] flex items-center justify-center">
        <p className="event-detail-page__error text-secondary">Event not found.</p>
      </div>
    );
  }

  return (
    <div className="event-detail-page bg-surface min-h-[60vh] py-12 px-4">
      <div className="event-detail-page__container max-w-4xl mx-auto">
        {/* Header */}
        <div className="event-detail-page__header bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8 mb-6">
          <div className="event-detail-page__badges flex flex-wrap gap-2 mb-4">
            <span className="event-detail-page__badge inline-block bg-accent text-white text-xs px-3 py-1 rounded-full">
              {event.modality === 'online' ? 'Online' : 'In-Person'}
            </span>
            <span className="event-detail-page__badge inline-block bg-gray-100 text-secondary text-xs px-3 py-1 rounded-full">
              {event.category}
            </span>
            <span className="event-detail-page__badge inline-block bg-gray-100 text-secondary text-xs px-3 py-1 rounded-full">
              {event.technology}
            </span>
          </div>
          <h1 className="event-detail-page__title text-2xl md:text-3xl font-bold text-secondary mb-2">{event.title}</h1>
          <p className="event-detail-page__date text-secondary">{event.date}</p>
        </div>

        {/* Info */}
        <div className="event-detail-page__info bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8 mb-6">
          <h2 className="event-detail-page__section-title text-xl font-bold text-secondary mb-4">About this event</h2>
          <p className="event-detail-page__description text-secondary leading-relaxed mb-6">{event.description}</p>

          <div className="event-detail-page__details flex flex-col gap-3">
            <div className="event-detail-page__detail flex items-center gap-3">
              <span className="event-detail-page__detail-label font-medium text-secondary">Location:</span>
              <span className="text-secondary">{event.location}</span>
            </div>
            <div className="event-detail-page__detail flex items-center gap-3">
              <span className="event-detail-page__detail-label font-medium text-secondary">Modality:</span>
              <span className="text-secondary">{event.modality === 'online' ? 'Online' : 'In-Person'}</span>
            </div>
            <div className="event-detail-page__detail flex items-center gap-3">
              <span className="event-detail-page__detail-label font-medium text-secondary">Views:</span>
              <span className="text-secondary">{event.views}</span>
            </div>
          </div>
        </div>

        {/* Agenda */}
        {event.agenda && (
          <div className="event-detail-page__agenda bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8 mb-6">
            <h2 className="event-detail-page__section-title text-xl font-bold text-secondary mb-4">Agenda</h2>
            <p className="event-detail-page__agenda-text text-secondary whitespace-pre-line">{event.agenda}</p>
          </div>
        )}

        {/* Actions */}
        <div className="event-detail-page__actions bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="event-detail-page__participants text-secondary font-medium">
                {registeredCount} {registeredCount === 1 ? 'person' : 'people'} registered
              </p>
            </div>
            <div className="flex gap-3 w-full sm:w-auto">
              {isRegistered ? (
                <button
                  onClick={handleCancel}
                  className="event-detail-page__cancel-btn px-8 py-3 rounded-lg font-semibold transition bg-red-50 text-red-600 hover:bg-red-100 w-full sm:w-auto"
                >
                  Cancel Registration
                </button>
              ) : (
                <button
                  onClick={handleRegister}
                  className="event-detail-page__register-btn px-8 py-3 rounded-lg font-semibold transition bg-accent text-white hover:opacity-90 w-full sm:w-auto"
                >
                  Register
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
