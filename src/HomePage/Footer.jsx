import React from 'react'

function Footer() {
  return (
    <div>
      <footer>
      <div className="footer-grid">
        <div className="footer-col">
          <h3>HomeNest</h3>
          <p>
            Your trusted platform for buying, selling, and renting properties
            and vehicles.
          </p>
          <div className="social-links">
            <a href="#"><i className="fab fa-facebook-f"></i></a>
            <a href="#"><i className="fab fa-twitter"></i></a>
            <a href="#"><i className="fab fa-instagram"></i></a>
            <a href="#"><i className="fab fa-linkedin-in"></i></a>
          </div>
        </div>

        <div className="footer-col">
          <h3>Quick Links</h3>
          <ul className="footer-links">
            <li><a href="#">Home</a></li>
            <li><a href="#">Properties</a></li>
            <li><a href="#">Cars</a></li>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h3>Properties</h3>
          <ul className="footer-links">
            <li><a href="#">Houses</a></li>
            <li><a href="#">Apartments</a></li>
            <li><a href="#">Commercial</a></li>
            <li><a href="#">Land</a></li>
            <li><a href="#">Vacation Homes</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h3>Vehicles</h3>
          <ul className="footer-links">
            <li><a href="#">Cars</a></li>
            <li><a href="#">SUVs</a></li>
            <li><a href="#">Trucks</a></li>
            <li><a href="#">Motorbikes</a></li>
            <li><a href="#">Commercial Vehicles</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h3>Contact Us</h3>
          <ul className="footer-links">
            <li>
              <i className="fas fa-map-marker-alt"></i> Bole, Addis Ababa, Ethiopia
            </li>
            <li><i className="fas fa-phone"></i> +251 912 345 678</li>
            <li><i className="fas fa-envelope"></i> info@homenest.com</li>
            <li><i className="fas fa-clock"></i> Mon-Fri: 9AM - 6PM</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          &copy; 2023 HomeNest. All Rights Reserved. |
          <a href="#">Privacy Policy</a> | <a href="#">Terms of Service</a>
        </p>
      </div>
    </footer>
    </div>
  )
}

export default Footer
