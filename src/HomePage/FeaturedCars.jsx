// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import './FeaturedCars.css';

// function FeaturedCars() {
//   const [cars, setCars] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchCars = async () => {
//       try {
//         const response = await axios.get('${process.env.REACT_APP_API_URL}/api/car');
//         if (response.data && response.data.cars) {
//           const firstThree = response.data.cars.slice(0, 3);
//           setCars(firstThree);
//         } else {
//           setError('No cars data available');
//         }
//       } catch (error) {
//         console.error('Error fetching cars:', error);
//         setError('Failed to load featured cars');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCars();
//   }, []);

//   if (loading) return <div className="loading">Loading featured cars...</div>;
//   if (error) return <div className="error">{error}</div>;
//   if (cars.length === 0) return <div>No featured cars available</div>;

//   return (
//     <div>
//       <section className="section" style={{ backgroundColor: '#f9f9f9' }}>
//         <div className="section-title">
//           <h2>Featured Vehicles</h2>
//           <p>Explore our premium selection of cars available for purchase</p>
//         </div>

//         <div className="property-grid">
//           {cars.map((car) => (
//             <div className="car-card" key={car.id}>
//               <div className="car-image-container">
//                 <img
//                   src={`${process.env.REACT_APP_API_URL}/uploads${car.image_url}`}
//                   alt={car.model}
//                   className="car-img"
//                   onError={(e) => {
//                     e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
//                   }}
//                 />
//               </div>
//               <div className="car-content">
//                 <h3 className="car-title">
//                   {car.make} {car.model} {car.year}
//                 </h3>
//                 <div className="car-price">${car.price}</div>
//                 <div className="car-details">
//                   <div className="car-detail">
//                     <i className="fas fa-tachometer-alt"></i> {car.mileage} km
//                   </div>
//                   <div className="car-detail">
//                     <i className="fas fa-gas-pump"></i> {car.fuel_type}
//                   </div>
//                   <div className="car-detail">
//                     <i className="fas fa-cogs"></i> {car.transmission}
//                   </div>
//                 </div>
//                 <div className="car-footer">
//                   <Link to={`/cardetail/${car.id}`} className="btn btn-outline">
//                     View Details
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         <div style={{ textAlign: 'center', marginTop: '3rem' }}>
//           <Link to="/cars" className="btn btn-primary">
//             View All Vehicles
//           </Link>
//         </div>
//       </section>
//     </div>
//   );
// }

// export default FeaturedCars;



import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './FeaturedCars.css';

function FeaturedCars() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/car`);
        if (response.data.cars) {
          const firstThree = response.data.cars.slice(0, 3);
          setCars(firstThree);
        } else {
          setError('No cars data available');
        }
      } catch (error) {
        console.error('Error fetching cars:', error);
        setError('Failed to load featured cars');
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  if (loading) return <div className="loading">Loading featured cars...</div>;
  if (error) return <div className="error">{error}</div>;
  if (cars.length === 0) return <div>No featured cars available</div>;

  return (
    <div>
      <section className="section" style={{ backgroundColor: '#f9f9f9' }}>
        <div className="section-title">
          <h2>Featured Vehicles</h2>
          <p>Explore our premium selection of cars available for purchase</p>
        </div>

        <div className="car-grid">
          {cars.map((car) => (
            <div className="car-card" key={car.id}>
              <div className="car-image-container">
                <img
                  src={car.cover_image ? `${process.env.REACT_APP_API_URL}/uploads${car.cover_image}` : 'https://via.placeholder.com/300x200?text=No+Image'}
                  alt={`${car.make} ${car.model}`}
                  className="car-img"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
                  }}
                />
                <div className="car-badges">
                  <span className={`status-badge ${car.status.toLowerCase()}`}>
                    {car.status}
                  </span>
                  <span className="type-badge">
                    {car.ForSellRent === 'rent' ? 'For Rent' : 'For Sale'}
                  </span>
                </div>
              </div>
              <div className="car-content">
                <h3 className="car-title">{car.make} {car.model} ({car.year})</h3>
                <div className="car-price">${car.price}</div>
                <div className="car-details">
                  <div className="car-detail">
                    <i className="fas fa-tachometer-alt"></i> {car.mileage.toLocaleString()} miles
                  </div>
                  <div className="car-detail">
                    <i className="fas fa-gas-pump"></i> {car.fuel_type || 'N/A'}
                  </div>
                  <div className="car-detail">
                    <i className="fas fa-cog"></i> {car.transmission}
                  </div>
                  <div className="car-detail">
                    <i className="fas fa-palette"></i> {car.color}
                  </div>
                </div>
                <Link to={`/cars/${car.id}`} className="btn btn-outline">
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <Link to="/cars" className="btn btn-primary">
            View All Vehicles
          </Link>
        </div>
      </section>
    </div>
  );
}

export default FeaturedCars;