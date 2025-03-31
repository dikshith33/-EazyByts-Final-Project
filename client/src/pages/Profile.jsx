import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProfile();
    fetchBookings();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/users/profile', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(response.data);
    } catch (error) {
      console.error('Error fetching profile:', error);
      navigate('/login');
    }
  };

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/bookings', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookings(response.data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  const handleDelete = async (bookingId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.delete(`http://localhost:5000/api/bookings/${bookingId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      if (response.status === 200) {
        setBookings((prevBookings) => prevBookings.filter((booking) => booking.id !== bookingId));
        console.log('Booking deleted successfully');
      }
    } catch (error) {
      console.error('Error deleting booking:', error.response?.data || error.message);
    }
  };
  
  
  

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  if (!user) return <div className="text-center mt-5">Loading your profile...</div>;

  return (
    <div className="container py-5">
      {/* User Info Section */}
      <div className="card mb-4 shadow-sm">
        <div className="card-body">
          <h2 className="card-title">Welcome, {user.firstName} {user.lastName} 👋</h2>
          <p className="card-text"><strong>Email:</strong> {user.email}</p>
          <button onClick={handleLogout} className="btn btn-outline-danger">Logout</button>
        </div>
      </div>

      {/* Bookings Section */}
      <h3 className="mb-4">Your Bookings</h3>
      {bookings.length === 0 ? (
        <div className="alert alert-info">You have no bookings yet.</div>
      ) : (
        <div className="row">
          {bookings.map((booking) => (
            <div key={booking.id} className="col-md-6 mb-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{booking.Event?.title || 'Unknown Event'}</h5>
                  <p className="card-text">Status: 
                    <span className={`badge ${booking.status === 'confirmed' ? 'bg-success' : 'bg-danger'} ms-2`}>
                      {booking.status}
                    </span>
                  </p>
                  <p className="card-text"><strong>Date:</strong> {new Date(booking.Event?.date).toDateString()}</p>
                  <p className="card-text"><strong>Location:</strong> {booking.Event?.location || 'N/A'}</p>
                  
                  {/* Conditional Rendering: Only show Unregister if not canceled */}
                  {booking.status !== 'canceled' ? (
                    <button
                      onClick={() => handleDelete(booking.id)}
                      className="btn btn-outline-danger mt-2"
                    >
                      Unregister
                    </button>
                  ) : (
                    <p className="text-muted mt-2">You have unregistered from this event.</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Profile;
