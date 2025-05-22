// import React, { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import axios from 'axios';
// import './Register.css';
// import dotenv from 'dotenv'

// const Register = () => {
//   const navigate = useNavigate();

//   // const [formData, setFormData] = useState({
//   //   first_name: '',
//   //   last_name: '',
//   //   username: '',
//   //   email: '',
//   //   password: '',
//   //   confirmPassword: '',
//   //   role: 'customer',
//   // });
// const [formData, setFormData] = useState({
//   first_name: '',
//   last_name: '',
//   username: '',
//   email: '',
//   password: '',
//   confirmPassword: '',
//   role: 'customer',
//   profile_image: null, // <-- new
// });

//   const [errors, setErrors] = useState({});
//   const [apiError, setApiError] = useState('');
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const validate = () => {
//     const newErrors = {};
//     if (!formData.first_name.trim()) newErrors.first_name = 'First name is required';
//     if (!formData.last_name.trim()) newErrors.last_name = 'Last name is required';
//     if (!formData.username.trim()) newErrors.username = 'Username is required';
//     if (!formData.email.trim()) newErrors.email = 'Email is required';
//     if (!formData.password.trim()) newErrors.password = 'Password is required';
//     if (formData.password !== formData.confirmPassword)
//       newErrors.confirmPassword = 'Passwords do not match';
//     return newErrors;
//   };

//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();
//   //   const validationErrors = validate();
//   //   if (Object.keys(validationErrors).length > 0) {
//   //     setErrors(validationErrors);
//   //     return;
//   //   }

//   //   setIsSubmitting(true);
//   //   setErrors({});
//   //   setApiError('');

//   //   try {
//   //     const res = await axios.post('http://localhost:5000/api/auth/register', {
//   //       first_name: formData.first_name,
//   //       last_name: formData.last_name,
//   //       username: formData.username,
//   //       email: formData.email,
//   //       password: formData.password,
//   //       role: formData.role,
//   //     });

//   //     if (res.status === 201 || res.status === 200) {
//   //       navigate('/login');
//   //     }
//   //   } catch (err) {
//   //     const msg = err.response?.data?.message || 'Registration failed';
//   //     setApiError(msg);
//   //   } finally {
//   //     setIsSubmitting(false);
//   //   }
//   // };
// const handleSubmit = async (e) => {
//   e.preventDefault();
//   const validationErrors = validate();
//   if (Object.keys(validationErrors).length > 0) {
//     setErrors(validationErrors);
//     return;
//   }

//   setIsSubmitting(true);
//   setErrors({});
//   setApiError('');

//   try {
//     const data = new FormData();
//     data.append('first_name', formData.first_name);
//     data.append('last_name', formData.last_name);
//     data.append('username', formData.username);
//     data.append('email', formData.email);
//     data.append('password', formData.password);
//     data.append('role', formData.role);
//     if (formData.profile_image) {
//       data.append('profile_image', formData.profile_image);
//     }

//     const res = await axios.post('http://localhost:5000/api/auth/register', data, {
//       headers: {
//         'Content-Type': 'multipart/form-data',
//       },
//     });

//     if (res.status === 201 || res.status === 200) {
//       navigate('/login');
//     }
//   } catch (err) {
//     const msg = err.response?.data?.message || 'Registration failed';
//     setApiError(msg);
//   } finally {
//     setIsSubmitting(false);
//   }
// };

//   return (
//     <div className="register-container">
//       <div className="register-card">
//         <h1>Create an Account</h1>
//         <p>Join our platform today</p>

//         {apiError && (
//           <div className="alert error">
//             <strong>Registration Error:</strong> {apiError}
//             <p>Please check your details and try again</p>
//           </div>
//         )}
      


//         <form onSubmit={handleSubmit}>
//           <div className="form-row">
//               <div className="form-group">
//   <label>Profile Image (optional)</label>
//   <input
//     type="file"
//     name="profile_image"
//     accept="image/*"
//     onChange={(e) => setFormData((prev) => ({ ...prev, profile_image: e.target.files[0] }))}
//   />
// </div>
//             <div className="form-group">
//               <label>First Name*</label>
//               <input
//                 type="text"
//                 name="first_name"
//                 value={formData.first_name}
//                 onChange={handleChange}
//                 className={errors.first_name ? 'error' : ''}
//               />
//               {errors.first_name && <span className="error-message">{errors.first_name}</span>}
//             </div>

//             <div className="form-group">
//               <label>Last Name*</label>
//               <input
//                 type="text"
//                 name="last_name"
//                 value={formData.last_name}
//                 onChange={handleChange}
//                 className={errors.last_name ? 'error' : ''}
//               />
//               {errors.last_name && <span className="error-message">{errors.last_name}</span>}
//             </div>
//           </div>

//           <div className="form-group">
//             <label>Username*</label>
//             <input
//               type="text"
//               name="username"
//               value={formData.username}
//               onChange={handleChange}
//               className={errors.username ? 'error' : ''}
//             />
//             {errors.username && <span className="error-message">{errors.username}</span>}
//           </div>

//           <div className="form-group">
//             <label>Email*</label>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               className={errors.email ? 'error' : ''}
//             />
//             {errors.email && <span className="error-message">{errors.email}</span>}
//           </div>

//           <div className="form-row">
//             <div className="form-group">
//               <label>Password*</label>
//               <input
//                 type="password"
//                 name="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 className={errors.password ? 'error' : ''}
//               />
//               {errors.password && <span className="error-message">{errors.password}</span>}
//             </div>

//             <div className="form-group">
//               <label>Confirm Password*</label>
//               <input
//                 type="password"
//                 name="confirmPassword"
//                 value={formData.confirmPassword}
//                 onChange={handleChange}
//                 className={errors.confirmPassword ? 'error' : ''}
//               />
//               {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
//             </div>
//           </div>

//           <div className="form-group">
//             <label>Account Type*</label>
//             <div className="radio-group">
//               <label>
//                 <input
//                   type="radio"
//                   name="role"
//                   value="customer"
//                   checked={formData.role === 'customer'}
//                   onChange={handleChange}
//                 />
//                 Customer
//               </label>
//               <label>
//                 <input
//                   type="radio"
//                   name="role"
//                   value="broker"
//                   checked={formData.role === 'broker'}
//                   onChange={handleChange}
//                 />
//                 Broker
//               </label>
//             </div>
//           </div>

//           <div className="form-group checkbox">
//             <label>
//               <input type="checkbox" required />
//               I agree to the Terms & Conditions and Privacy Policy
//             </label>
//           </div>

//           <button 
//             type="submit" 
//             className="submit-btn"
//             disabled={isSubmitting}
//           >
//             {isSubmitting ? 'Registering...' : 'Register Now'}
//           </button>

//           <p className="login-link">
//             Already have an account? <Link to="/login">Log in here</Link>
//           </p>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Register;





import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './Register.css';

const Register = () => {
  const navigate = useNavigate();

  // const [formData, setFormData] = useState({
  //   first_name: '',
  //   last_name: '',
  //   username: '',
  //   email: '',
  //   password: '',
  //   confirmPassword: '',
  //   role: 'customer',
  // });
const [formData, setFormData] = useState({
  first_name: '',
  last_name: '',
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  role: 'customer',
  profile_image: null, // <-- new
});

  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.first_name.trim()) newErrors.first_name = 'First name is required';
    if (!formData.last_name.trim()) newErrors.last_name = 'Last name is required';
    if (!formData.username.trim()) newErrors.username = 'Username is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.password.trim()) newErrors.password = 'Password is required';
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = 'Passwords do not match';
    return newErrors;
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const validationErrors = validate();
  //   if (Object.keys(validationErrors).length > 0) {
  //     setErrors(validationErrors);
  //     return;
  //   }

  //   setIsSubmitting(true);
  //   setErrors({});
  //   setApiError('');

  //   try {
  //     const res = await axios.post('http://localhost:5000/api/auth/register', {
  //       first_name: formData.first_name,
  //       last_name: formData.last_name,
  //       username: formData.username,
  //       email: formData.email,
  //       password: formData.password,
  //       role: formData.role,
  //     });

  //     if (res.status === 201 || res.status === 200) {
  //       navigate('/login');
  //     }
  //   } catch (err) {
  //     const msg = err.response?.data?.message || 'Registration failed';
  //     setApiError(msg);
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };
const handleSubmit = async (e) => {
  e.preventDefault();
  const validationErrors = validate();
  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors);
    return;
  }

  setIsSubmitting(true);
  setErrors({});
  setApiError('');

  try {
    const data = new FormData();
    data.append('first_name', formData.first_name);
    data.append('last_name', formData.last_name);
    data.append('username', formData.username);
    data.append('email', formData.email);
    data.append('password', formData.password);
    data.append('role', formData.role);
    if (formData.profile_image) {
      data.append('profile_image', formData.profile_image);
    }

    const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/register`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    if (res.status === 201 || res.status === 200) {
      navigate('/login');
    }
  } catch (err) {
    const msg = err.response?.data?.message || 'Registration failed';
    setApiError(msg);
  } finally {
    setIsSubmitting(false);
  }
};

  return (
    <div className="register-container">
      <div className="register-card">
        <h1>Create an Account</h1>
        <p>Join our platform today</p>

        {apiError && (
          <div className="alert error">
            <strong>Registration Error:</strong> {apiError}
            <p>Please check your details and try again</p>
          </div>
        )}
      


        <form onSubmit={handleSubmit}>
          <div className="form-row">
              <div className="form-group">
  <label>Profile Image (optional)</label>
  <input
    type="file"
    name="profile_image"
    accept="image/*"
    onChange={(e) => setFormData((prev) => ({ ...prev, profile_image: e.target.files[0] }))}
  />
</div>
            <div className="form-group">
              <label>First Name*</label>
              <input
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                className={errors.first_name ? 'error' : ''}
              />
              {errors.first_name && <span className="error-message">{errors.first_name}</span>}
            </div>

            <div className="form-group">
              <label>Last Name*</label>
              <input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                className={errors.last_name ? 'error' : ''}
              />
              {errors.last_name && <span className="error-message">{errors.last_name}</span>}
            </div>
          </div>

          <div className="form-group">
            <label>Username*</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className={errors.username ? 'error' : ''}
            />
            {errors.username && <span className="error-message">{errors.username}</span>}
          </div>

          <div className="form-group">
            <label>Email*</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? 'error' : ''}
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Password*</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={errors.password ? 'error' : ''}
              />
              {errors.password && <span className="error-message">{errors.password}</span>}
            </div>

            <div className="form-group">
              <label>Confirm Password*</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={errors.confirmPassword ? 'error' : ''}
              />
              {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
            </div>
          </div>

          <div className="form-group">
            <label>Account Type*</label>
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  name="role"
                  value="customer"
                  checked={formData.role === 'customer'}
                  onChange={handleChange}
                />
                Customer
              </label>
              <label>
                <input
                  type="radio"
                  name="role"
                  value="broker"
                  checked={formData.role === 'broker'}
                  onChange={handleChange}
                />
                Broker
              </label>
            </div>
          </div>

          <div className="form-group checkbox">
            <label>
              <input type="checkbox" required />
              I agree to the Terms & Conditions and Privacy Policy
            </label>
          </div>

          <button 
            type="submit" 
            className="submit-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Registering...' : 'Register Now'}
          </button>

          <p className="login-link">
            Already have an account? <Link to="/login">Log in here</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
