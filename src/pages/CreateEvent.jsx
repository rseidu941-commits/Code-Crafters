import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { createEvent } from '../api/api';
import EventForm from '../components/EventForm';

// Create event with organizerId, views, and createdAt //
export default function CreateEvent() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    try {
      await createEvent({
        ...formData,
        organizerId: user.id,
        views: 0,
        createdAt: new Date().toISOString().split('T')[0],
      });
      navigate('/my-events');
    } catch {
      alert('Failed to create event. Please try again.');
    }
  };

  return <EventForm onSubmit={handleSubmit} buttonText="Create Event" />;
}
