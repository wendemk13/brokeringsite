import React, { useEffect, useState } from 'react';
import CarCard from './CarCard';
import './ListOfCars.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ListOfCars() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/car`);
        if (response.data.cars) {
          setCars(response.data.cars);
        } else {
          setError('No cars data found');
        }
      } catch (error) {
        console.error('Error fetching cars:', error);
        setError('Error loading cars. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  const handleViewAll = () => {
    navigate('/cars');
  };

  if (loading) return <div className="loading">Loading cars...</div>;
  if (error) return <div className="error">{error}</div>;
  if (cars.length === 0) return <div>No cars available at the moment.</div>;

  return (
    <section className="section" style={{ backgroundColor: '#f9f9f9' }}>
      <div className="section-title">
        <h2>All Cars</h2>
        <p>Browse all vehicles available</p>
      </div>

      <div className="car-grid">
        {cars.map((car) => (
          <CarCard 
            key={car.id}
            id={car.id}
            title={`${car.make} ${car.model} (${car.year})`}
            price={`$${car.price} ${car.ForSellRent === 'rent' ? '/month' : ''}`}
            mileage={`${car.mileage.toLocaleString()} miles`}
            fuel={car.fuel_type || 'N/A'}
            transmission={car.transmission}
            color={car.color}
            status={car.status}
            imageUrl={car.cover_image ? `${process.env.REACT_APP_API_URL}/uploads${car.cover_image}` : 'https://via.placeholder.com/300x200?text=No+Image'}
            ForSellRent={car.ForSellRent}
            approvalStatus={car.approval_status}
          />
        ))}
      </div>

      <div style={{ textAlign: 'center', marginTop: '3rem' }}>
        <button onClick={handleViewAll} className="btn btn-primary">
          View All Vehicles
        </button>
      </div>
    </section>
  );
}

export default ListOfCars;