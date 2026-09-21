import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getEvent, updateEvent } from '../api/api';
import { useAuth } from '../context/AuthContext';
import EventForm from '../components/EventForm';

// Fetch event to pre-fill form //
export default function EditEvent() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getEvent(id).then(data => {
      setEvent(data);
      setLoading(false);
    });
  }, [id]);

  const handleSubmit = async (formData) => {
    try {
      await updateEvent(id, formData);
      navigate('/my-events');
    } catch {
      alert('Failed to update event. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="edit-event-page bg-surface min-h-[60vh] flex items-center justify-center">
        <p className="edit-event-page__loading text-secondary">Loading...</p>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="edit-event-page bg-surface min-h-[60vh] flex items-center justify-center">
        <p className="edit-event-page__error text-secondary">Event not found.</p>
      </div>
    );
  }

  // Ownership protection: block if not organizer //
  if (user && Number(event.organizerId) !== Number(user.id)) {
    return (
      <div className="edit-event-page bg-surface min-h-[60vh] flex items-center justify-center">
        <p className="edit-event-page__error text-secondary">You do not have access to edit this event.</p>
      </div>
    );
  }

  return <EventForm initialData={event} onSubmit={handleSubmit} buttonText="Update Event" />;
}
