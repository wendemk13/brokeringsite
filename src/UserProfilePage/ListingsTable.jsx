import React, { useEffect, useState } from 'react';
import './ListingsTable.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function ListingsTable() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [listings, setListings] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchListings = async () => {
            try {
                const user = JSON.parse(localStorage.getItem("user")); // Parse the user data from localStorage
                if (!user || !user.id) {
                    console.error('User ID not found');
                    return;
                }
                const id = user.id; // Get the userId from the parsed object
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/my-listings?userId=${id}`);
                setListings(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching listings:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchListings();
    }, []);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleEditClick = (listingId, propertyType) => {
        if (!listingId || !propertyType) {
            console.error('Invalid listing data');
            return; // Optionally show a message to the user
        }

        // Redirect to the correct edit page based on listing type (house or car)
        if (propertyType === 'House') {
            navigate(`/edit-house/${listingId}`);
        } else if (propertyType === 'car') {
            navigate(`/edit-car/${listingId}`);
        } else {
            console.error('Unknown listing type');
        }
    };

    console.log(listings);


const handleDeleteClick = async (id, propertyType) => {
  try {
    let url = '';
    if (propertyType === 'House') {
      url = `${process.env.REACT_APP_API_URL}/api/house/${id}`;
    } else if (propertyType === 'car') {
        url=`${process.env.REACT_APP_API_URL}/api/car/${id}`;
    } else {
      console.error('Unknown property type');
      return;
    }

    const confirmDelete = window.confirm('Are you sure you want to delete this listing?');
    if (!confirmDelete) return;

    const response = await axios.delete(url);
    alert(response.data.message);

    // Update the list in UI
    setListings(prevListings => prevListings.filter(listing => listing.id !== id));
  } catch (error) {
    console.error('Error deleting listing:', error);
    alert('Failed to delete listing.');
  }
};
const [user_id,setuser_id]=useState();
    useEffect(()=>{
        const user = JSON.parse(localStorage.getItem("user")); 
 if (!user || !user.id) {
                    console.error('User ID not found');
                    return;
                }
                                const id = user.id; 
                                setuser_id(id);

    },[])

  return (
    <div>
       <div className="listings-table">
                        {listings.length > 0 ? (
                            <table>
                                <thead>
                                    <tr>
                                        <th>Image</th>
                                        <th>Title</th>
                                        <th>Type</th>
                                        <th>For</th>
                                        <th>Price</th>
                                        <th>Status</th>
                                        <th>Approval Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {listings.map(listing => (
                                        <tr key={listing._id || listing.id}>
                                            {/* <td><img src={listing.image_url} className="listing-img" alt={listing.title} /></td> */}
                                            <td><img
  src={`${process.env.REACT_APP_API_URL}/uploads/${listing.cover_image}`}
  className="listing-img"
  alt={listing.title}
/>
</td>
                                            <td>{listing.title}</td>
                                            <td>{listing.propertyType === 'House' ? 'House' : 'Car'}</td>
                                            <td><span className='forsellrent'> <b>For {listing.ForSellRent}</b></span> </td>

                                            <td>{listing.price}</td>
                                            <td>
                                                <span className={`status-badge status-${listing.status}`}>
                                                    {listing.status ? listing.status.charAt(0).toUpperCase() + listing.status.slice(1) : 'Unknown'}
                                                </span>
                                            </td>
                                            <td> <span className='approval_list_span'>{listing.approval_status}</span> </td>
                                            <td>
                                                <button className="action-btn" title="Edit" onClick={() => handleEditClick(listing.id, listing.propertyType)}>✏️</button>
                                                <button className="action-btn delete-btn" title="Delete" onClick={() => handleDeleteClick(listing.id, listing.propertyType)}>🗑️</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <div className="empty-state">
                                <h3>No listings found</h3>
                                <p>Try adding a new listing.</p>
                            </div>
                        )}
                    </div>
    </div>
  )
}

export default ListingsTable
