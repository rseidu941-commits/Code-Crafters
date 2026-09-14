import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function EventForm({ initialData, onSubmit, buttonText }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: initialData?.title || '',
    description: initialData?.description || '',
    date: initialData?.date || '',
    modality: initialData?.modality || 'online',
    location: initialData?.location || '',
    category: initialData?.category || 'workshop',
    technology: initialData?.technology || '',
    agenda: initialData?.agenda || '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <div className="event-form bg-surface min-h-[60vh] py-12 px-4">
      <div className="event-form__card w-full max-w-2xl mx-auto bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
        <h1 className="event-form__title text-2xl font-bold text-secondary mb-6">
          {initialData ? 'Edit Event' : 'Create Event'}
        </h1>

        <form onSubmit={handleSubmit} className="event-form__form flex flex-col gap-4">
          <div className="event-form__field">
            <label className="event-form__label block text-sm font-medium text-secondary mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              className="event-form__input w-full px-4 py-2 border border-gray-200 rounded-lg text-secondary focus:outline-none focus:border-primary"
              placeholder="Event title"
            />
          </div>

          <div className="event-form__field">
            <label className="event-form__label block text-sm font-medium text-secondary mb-1">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              required
              rows={4}
              className="event-form__textarea w-full px-4 py-2 border border-gray-200 rounded-lg text-secondary focus:outline-none focus:border-primary resize-none"
              placeholder="Event description"
            />
          </div>

          <div className="event-form__field">
            <label className="event-form__label block text-sm font-medium text-secondary mb-1">Date</label>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              required
              className="event-form__input w-full px-4 py-2 border border-gray-200 rounded-lg text-secondary focus:outline-none focus:border-primary"
            />
          </div>

          <div className="event-form__field">
            <label className="event-form__label block text-sm font-medium text-secondary mb-1">Modality</label>
            <select
              name="modality"
              value={form.modality}
              onChange={handleChange}
              className="event-form__select w-full px-4 py-2 border border-gray-200 rounded-lg text-secondary focus:outline-none focus:border-primary"
            >
              <option value="online">Online</option>
              <option value="presencial">In-Person</option>
            </select>
          </div>

          <div className="event-form__field">
            <label className="event-form__label block text-sm font-medium text-secondary mb-1">Location</label>
            <input
              type="text"
              name="location"
              value={form.location}
              onChange={handleChange}
              required
              className="event-form__input w-full px-4 py-2 border border-gray-200 rounded-lg text-secondary focus:outline-none focus:border-primary"
              placeholder="Zoom link or venue address"
            />
          </div>

          <div className="event-form__field">
            <label className="event-form__label block text-sm font-medium text-secondary mb-1">Category</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="event-form__select w-full px-4 py-2 border border-gray-200 rounded-lg text-secondary focus:outline-none focus:border-primary"
            >
              <option value="workshop">Workshop</option>
              <option value="bootcamp">Bootcamp</option>
            </select>
          </div>

          <div className="event-form__field">
            <label className="event-form__label block text-sm font-medium text-secondary mb-1">Technology</label>
            <input
              type="text"
              name="technology"
              value={form.technology}
              onChange={handleChange}
              required
              className="event-form__input w-full px-4 py-2 border border-gray-200 rounded-lg text-secondary focus:outline-none focus:border-primary"
              placeholder="React, JavaScript, AI..."
            />
          </div>

          <div className="event-form__field">
            <label className="event-form__label block text-sm font-medium text-secondary mb-1">Agenda</label>
            <textarea
              name="agenda"
              value={form.agenda}
              onChange={handleChange}
              rows={3}
              className="event-form__textarea w-full px-4 py-2 border border-gray-200 rounded-lg text-secondary focus:outline-none focus:border-primary resize-none"
              placeholder="10:00 Intro, 11:00 Main topic, 12:00 Lunch..."
            />
          </div>

          <div className="event-form__actions flex gap-4 mt-2">
            <button type="submit" className="event-form__submit bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition">
              {buttonText || 'Create Event'}
            </button>
            <button type="button" onClick={() => navigate(-1)} className="event-form__cancel bg-gray-200 text-secondary px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
