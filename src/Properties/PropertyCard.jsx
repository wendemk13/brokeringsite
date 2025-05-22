import React from 'react';
import './PropertyCard.css';
import { Link } from 'react-router-dom';

function PropertyCard({ 
  id,
  title,
  description,
  price,
  location,
  address,
  bedrooms,
  bathrooms,
  area,
  propertyType,
  status,
  cover_image,
  ForSellRent,
  imageUrl  // This should be passed from parent as `${process.env.REACT_APP_API_URL}/uploads${cover_image}`
}) {
  return (
    <div className="property-card">
      <div style={{ position: 'relative' }}>
        <img 
          src={imageUrl || cover_image} 
          alt={title} 
          className="property-img" 
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
          }}
        />
        <span className={`property-badge ${status.toLowerCase()}`}>
          {status}
        </span>
        {ForSellRent && (
          <span className="property-tag">
            {ForSellRent === 'Rent' ? 'For Rent' : 'For Sale'}
          </span>
        )}
      </div>
      <div className="property-content">
        <h3 className="property-title">{title}</h3>
        <div className="property-price">
          ${price} {ForSellRent === 'Rent' ? '/month' : ''}
        </div>
        <div className="property-address">
          {address}, {location}
        </div>
        <div className="property-features">
          <div className="property-feature">
            <i className="fas fa-bed"></i> {bedrooms} Beds
          </div>
          <div className="property-feature">
            <i className="fas fa-bath"></i> {bathrooms} Baths
          </div>
          <div className="property-feature">
            <i className="fas fa-ruler-combined"></i> {area} sqft
          </div>
        </div>
        <div className="property-footer">
          {/* <div className="property-type">{propertyType}</div> */}
          <Link 
            to={`/houses/${id}`} 
            className="btn btn-outline"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PropertyCard;