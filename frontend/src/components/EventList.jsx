const EventList = ({ events, onEdit, onDelete }) => {
  // console.log("event, ",events);
    return (
      <div>
        {events?.map((event) => (
          <div key={event.id} className="border p-4 mb-4 rounded shadow">
            <h3 className="text-lg font-bold">{event.title}</h3>
            <p>{new Date(event.date).toLocaleString()}</p>
            <p>{event.description}</p>
            <div className="mt-2">
              <button
                className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                onClick={() => onEdit(event)}
              >
                Edit
              </button>
              <button
                className="bg-red-500 text-white px-2 py-1 rounded"
                onClick={() => onDelete(event.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  };
  export default EventList;
  