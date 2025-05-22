// import React, { useEffect, useState } from 'react';
// import './ListOfProperties.css';
// import PropertyCard from './PropertyCard.jsx'; 
// // import {properties} from '../properties.js'
// import axios from 'axios';
// function ListOfProperties() {
//   const [property, setProperties] = useState([]);

//   // useEffect(() => {
//   //   setProperties(properties);
//   // }, []);



//   // const [houses, setHouses] = useState([]);
//   const [loading, setLoading] = useState(true);

// const [mainimage,setmainimage]=useState([]);
//   useEffect(() => {
//     const fetchHouses = async () => {
//       try {
//         const response = await axios.get('${process.env.REACT_APP_API_URL}/api/houses');
//         setProperties(response.data.houses); 
//       } catch (error) {
//         console.error('Error fetching houses:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchHouses();
//   }, []);
// console.log(property)


//   if (loading) return <p>Loading houses...</p>;


//   return (
//     <section className="section">
//       <div className="property-grid">
//         {property.map((p, index) => (
//           <PropertyCard key={index} {...p} />
//         ))}
//       </div>

//       <div style={{ textAlign: 'center', marginTop: '3rem' }}>
//         <a href="#" className="btn btn-primary" >View All Houses</a>
//       </div>
//     </section>
//   );
// }

// export default ListOfProperties;



import React, { useEffect, useState } from 'react';
import './ListOfProperties.css';
import PropertyCard from './PropertyCard.jsx';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ListOfProperties() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHouses = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/house`);
        if (response.data.success) {
          setProperties(response.data.data); // Access the 'data' array from the response
        } else {
          setError('Failed to fetch properties');
        }
      } catch (error) {
        console.error('Error fetching houses:', error);
        setError('Error loading properties. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchHouses();
  }, []);

  const handleViewAll = () => {
    navigate('/houses'); // Or your route for viewing all properties
  };

  if (loading) return <p>Loading properties...</p>;
  if (error) return <p className="error-message">{error}</p>;
  if (properties.length === 0) return <p>No properties found.</p>;

  return (
    <section className="section">
      <div className="property-grid">
        {properties.map((property) => (
          <PropertyCard 
            key={property.id}
            {...property}
            imageUrl={`${process.env.REACT_APP_API_URL}/uploads${property.cover_image}`}
          />
        ))}
      </div>

      <div style={{ textAlign: 'center', marginTop: '3rem' }}>
        <button 
          onClick={handleViewAll} 
          className="btn btn-primary"
        >
          View All Properties
        </button>
      </div>
    </section>
  );
}

export default ListOfProperties;