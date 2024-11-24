import React, { useEffect, useState } from 'react';
import { fetchEvents, deleteEvent } from '../services/api';
import EventList from '../components/EventList';
import EventForm from '../components/EventForm';
import { isLoggedIn } from '../utils/auth';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const navigate=useNavigate();

  useEffect(() => {
    if (!isLoggedIn()) {
      alert('Please log in to access the dashboard.');
      navigate('/login'); // Redirect to the login page if not logged in
    }
  }, []);

  const fetchAllEvents = async () => {
    try {
      const { data } = await fetchEvents();
      setEvents(data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };


  useEffect(() => {
    fetchAllEvents();
  }, []);

  const handleEdit = (event) => {
    setSelectedEvent(event);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        await deleteEvent(id);
        alert('Event deleted successfully!');
        fetchAllEvents();
      } catch (error) {
        console.error('Error deleting event:', error);
        alert('Failed to delete event');
      }
    }
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    setSelectedEvent(null);
    fetchAllEvents();
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-center my-4">Your Events</h2>
      {showForm ? (
        <EventForm
          event={selectedEvent}
          setSelectedEvent={setSelectedEvent}
          onSuccess={handleFormSuccess}
          setShowForm={setShowForm}
        />
      ) : (
        <div className="container mx-auto">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
            onClick={() => setShowForm(true)}
          >
            Create Event
          </button>
          {!events || (events&& events.length==0) && 
            <div>
              Your Events List is Empty ! 
            </div>
          }
          <EventList
            events={events}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />

        </div>
      )}
    </div>
  );
};

export default Dashboard;
