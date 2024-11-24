import React, { useState } from 'react';
import { createEvent, updateEvent } from '../services/api';

const EventForm = ({ event,setSelectedEvent, onSuccess, setShowForm }) => {
  const [title, setTitle] = useState(event?.title || '');
  const [date, setDate] = useState(event?.date || '');
  const [description, setDescription] = useState(event?.description || '');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (event) {
        await updateEvent(event.id, { title, date, description });
      } else {
        await createEvent({ title, date, description });
      }
      alert('Event saved successfully!');
      onSuccess();
    } catch (error) {
      console.error('Error saving event:', error);
      alert('Failed to save event');
    }
  };

  const handleBack=((e)=>{
    e.preventDefault();
    setSelectedEvent(null);
    setShowForm(false);
  });

  return (
    <form className="bg-white p-6 rounded shadow-md" onSubmit={handleSubmit}>
      <h2 className="text-xl font-bold mb-4">
        {event ? 'Edit Event' : 'Create Event'}
      </h2>
      <input
        type="text"
        placeholder="Event Title"
        className="border p-2 mb-4 w-full"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        type="datetime-local"
        className="border p-2 mb-4 w-full"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />
      <textarea
        placeholder="Event Description"
        className="border p-2 mb-4 w-full"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={4}
      />
      <div className='flex gap-10'>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {event ? 'Update Event' : 'Create Event'}
        </button>
        <button className="bg-red-500 text-white px-4 py-2 rounded"
          onClick={handleBack}
        >
          Back
        </button>
      </div>
    </form>
  );
};

export default EventForm;
