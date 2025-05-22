import React, { useState, useEffect } from 'react';
import './Header.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRobot, faBars, faTimes,faSignOut, faUser } from '@fortawesome/free-solid-svg-icons';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (!storedUser) {
          setLoading(false);
          return;
        }

        const response = await axios.get(`http://localhost:5000/api/auth/getUser/${storedUser.id}`);
        const userProfile = response.data.user[0];
        setUser(userProfile);

        if (userProfile.profile_image) {
          // ✅ Construct image URL correctly
          const imageUrl = `http://localhost:5000/uploads/profile/${userProfile.profile_image}`;
          setProfileImage(imageUrl);
        }
      } catch (err) {
        console.error('Failed to fetch user profile:', err);
        setError('Failed to load profile');
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    document.body.style.overflow = menuOpen ? 'auto' : 'hidden';
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    setUser(null);
    setProfileImage(null);
    navigate('/');
  };

  // JSX continues (same as yours) ...


  return (
    <>
      <header className="header">
        <div className="header-container">
          <div className="header-logo">
            <Link to="/">
              <h1>Bet<span>Gebeya</span></h1>
            </Link>
          </div>

          <div className="header-desktop-nav">
            <nav className="header-nav-links">
              <Link to='/' className="header-active">Home</Link>
              <Link to='/properties'>Properties</Link>
              <Link to='/cars'>Cars</Link>
              {/* <Link to='/agents'>Agents</Link> */}
              <Link to='/about'>About</Link>
              <Link to='/contact'>Contact</Link>
            </nav>

            <div className="header-user-actions">
              <Link to='/chatbot' className="header-btn header-btn-chatbot">
                <FontAwesomeIcon icon={faRobot} /> Support
              </Link>
              {user ? (
                <>
                  <span className="header-username">{user.username}</span>
                  <Link 
                    to={user.role === 'admin' ? '/admindashboard' : '/userprofilepage'} 
                    className="header-profile-link"
                  >
                    <div className="header-profile-image">
                      {profileImage ? (
                        <img src={profileImage} alt="Profile" />
                      ) : (
                        <div className="header-profile-placeholder">
                          <FontAwesomeIcon icon={faUser} /> 
                        </div>
                      )}
                    </div>
                  </Link>
                  {/* <button className="header-btn header-btn-outline" onClick={handleLogout}><i className="fas fa-sign-out-alt"></i> Logout</button> */}
                  <button className="header-btn header-btn-outline" onClick={handleLogout}><i className="fas fa-sign-out-alt"></i>Logout </button>
                </>
              ) : (
                <>
                  {/* <Link to='/login' className="header-btn header-btn-outline">Login</Link>
                  <Link to='/register' className="header-btn header-btn-primary">Register</Link>
                   */}
<Link to="/login" className="header-btn header-btn-outline">
  <i className="fas fa-sign-in-alt"></i> Login
</Link>

<Link to="/register" className="header-btn header-btn-primary">
  <i className="fas fa-user-plus"></i> Register
</Link>
                </>
              )}
            </div>
          </div>

          <div className="header-hamburger" onClick={toggleMenu}>
            <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} />
          </div>
        </div>
      </header>

      <div className={`header-mobile-menu-overlay ${menuOpen ? 'header-active' : ''}`}>
        <div className="header-mobile-menu-content">
          <nav className="header-mobile-nav-links">
            <Link to='/' className="header-active" onClick={toggleMenu}>Home</Link>
            <Link to='/properties' onClick={toggleMenu}>Properties</Link>
            <Link to='/cars' onClick={toggleMenu}>Cars</Link>
            <Link to='/agents' onClick={toggleMenu}>Agents</Link>
            <Link to='/about' onClick={toggleMenu}>About</Link>
            <Link to='/contact' onClick={toggleMenu}>Contact</Link>
          </nav>

          <div className="header-mobile-user-actions">
            <Link to='/chatbot' className="header-btn header-btn-chatbot" onClick={toggleMenu}>
              <FontAwesomeIcon icon={faRobot} /> Support
            </Link>
            {user ? (
              <>
                <Link
  to={user.role === 'admin' ? '/admindashboard' : '/userprofilepage'}
  className="header-btn header-btn-outline"
  onClick={toggleMenu}
>
  <div className="header-profile-info">
    <span className="header-mobile-username"> {user.username}</span>
    <div className="header-profile-image">
      {profileImage ? (
        <img src={profileImage} alt="Profile" />
      ) : (
        <div className="header-profile-placeholder">
          <FontAwesomeIcon icon={faUser} />
        </div>
      )}
    </div>
  </div>
</Link>

                <button className="header-btn header-btn-outline" onClick={() => {
                  handleLogout();
                  toggleMenu();
                }}>Logout</button>
              </>
            ) : (
              <>
                <Link to='/login' className="header-btn header-btn-outline" onClick={toggleMenu}>Login</Link>
                <Link to="/register" className="header-btn header-btn-primary" onClick={toggleMenu}>Register</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;