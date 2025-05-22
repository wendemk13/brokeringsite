import React from 'react';
import './CarCard.css';
import { Link } from 'react-router-dom';

function CarCard({
  id,
  title,
  price,
  mileage,
  fuel,
  transmission,
  color,
  status,
  imageUrl,
  ForSellRent,
  approvalStatus
}) {
  return (
    <div className="car-card">
      <div className="car-image-container">
        <img 
          src={imageUrl} 
          alt={title} 
          className="car-img"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
          }}
        />
        <div className="car-tags">
          {ForSellRent && (
            <span className={`car-tag ${ForSellRent.toLowerCase()}`}>
              {ForSellRent === 'rent' ? 'For Rent' : 'For Sale'}
            </span>
          )}
          <span className={`status-tag ${status.toLowerCase()}`}>
            {status}
          </span>
          {approvalStatus && (
            <span className={`approval-tag ${approvalStatus.toLowerCase()}`}>
              {approvalStatus}
            </span>
          )}
        </div>
      </div>
      
      <div className="car-content">
        <h3 className="car-title">{title}</h3>
        <div className="car-price">{price}</div>
        
        <div className="car-details">
          <div className="car-detail">
            <i className="fas fa-tachometer-alt"></i> {mileage}
          </div>
          <div className="car-detail">
            <i className="fas fa-gas-pump"></i> {fuel}
          </div>
          <div className="car-detail">
            <i className="fas fa-cog"></i> {transmission}
          </div>
          <div className="car-detail">
            <i className="fas fa-palette"></i> {color}
          </div>
        </div>
        
        <Link 
          to={`/cars/${id}`}
          className="btn btn-outline"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}

export default CarCard;