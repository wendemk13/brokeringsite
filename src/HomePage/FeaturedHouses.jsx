import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './FeaturedHouses.css'; // Make sure to create this CSS file

function FeaturedHouses() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHouses = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/house`);
        if (response.data.success && response.data.data) {
          const firstThree = response.data.data.slice(0, 3);
          setProperties(firstThree);
        } else {
          setError('No houses data available');
        }
      } catch (error) {
        console.error('Error fetching houses:', error);
        setError('Failed to load featured houses');
      } finally {
        setLoading(false);
      }
    };

    fetchHouses();
  }, []);

  if (loading) return <div className="loading">Loading featured houses...</div>;
  if (error) return <div className="error">{error}</div>;
  if (properties.length === 0) return <div>No featured houses available</div>;

  return (
    <div>
      <section className="section">
        <div className="section-title">
          <h2>Featured Houses</h2>
          <p>
            Discover our handpicked selection of premium houses available for sale and rent
          </p>
        </div>

        <div className="property-grid">
          {properties.map((property) => (
            <div className="property-card" key={property.id}>
              <div className="property-image-container">
                <img
                  src={`${process.env.REACT_APP_API_URL}/uploads${property.cover_image}`}
                  alt={property.title}
                  className="property-img"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
                  }}
                />
                <div className="property-badges">
                  <span className={`status-badge ${property.status.toLowerCase()}`}>
                    {property.status}
                  </span>
                  <span className={`type-badge ${property.ForSellRent.toLowerCase()}`}>
                    {property.ForSellRent === 'Rent' ? 'For Rent' : 'For Sale'}
                  </span>
                </div>
              </div>
              <div className="property-content">
                <h3 className="property-title">{property.title}</h3>
                <div className="property-price">
                  ${property.price} {property.ForSellRent === 'Rent' ? '/month' : ''}
                </div>
                <div className="property-address">
                  {property.address}, {property.location}
                </div>
                <div className="property-features">
                  <div className="property-feature">
                    <i className="fas fa-bed"></i> {property.bedrooms} Beds
                  </div>
                  <div className="property-feature">
                    <i className="fas fa-bath"></i> {property.bathrooms} Baths
                  </div>
                  <div className="property-feature">
                    <i className="fas fa-ruler-combined"></i> {property.area} sqft
                  </div>
                </div>
                <div className="property-footer">
                  <div className="property-type">{property.propertyType}</div>
                  <Link 
                    to={`/houses/${property.id}`} 
                    className="btn btn-outline"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <Link to="/houses" className="btn btn-primary">
            View All Houses
          </Link>
        </div>
      </section>
    </div>
  );
}

export default FeaturedHouses;