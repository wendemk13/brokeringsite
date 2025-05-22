import React, { useState } from 'react';
import './ContactPage.css';
import SendUsMessage from './SendUsMessage';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ success: null, message: '' });


  return (
    <div className="contact-page">
      {/* Hero Section */}
      <div className="contact-hero">
        <h1>Connect With Us</h1>
        <p>We're here to help you find your dream property</p>
      </div>

      {/* Main Content */}
      <SendUsMessage/>
    </div>
  );
};

export default ContactPage;