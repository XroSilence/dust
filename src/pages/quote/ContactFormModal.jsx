import React, { useState } from 'react';
import axios from 'axios';

const ContactFormModal = ({ onSubmit, onClose }) => {
  const [contactInfo, setContactInfo] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: '',
    form: ''
  });

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^\+?[\d\s-]{10,}$/;
    return phoneRegex.test(phone);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!contactInfo.name.trim()) newErrors.name = 'Name is required';
    if (!validateEmail(contactInfo.email)) newErrors.email = 'Valid email is required';
    if (!validatePhone(contactInfo.phone)) newErrors.phone = 'Valid phone number is required';
    return newErrors;
  };

  const handleFormValidation = () => {
    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
      return true;
    } else {
      setErrors(formErrors);
      return false;
    }
  };

  const handleFormSubmit = async () => {
    if (handleFormValidation()) {
      try {
        const response = await axios.post('/api/contact', contactInfo);

        if (response.status !== 200) throw new Error('Failed to submit contact info');

        onSubmit(contactInfo);
      } catch (error) {
        console.error('Error:', error);
        setErrors({ form: 'Failed to submit contact info' });
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleFormSubmit();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          type="button"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-2xl font-bold text-gray-800 mb-6">Contact Information</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name *</label>
            <input
              type="text"
              required
              value={contactInfo.name}
              onChange={(e) => {
                setContactInfo(prev => ({ ...prev, name: e.target.value }));
                setErrors(prev => ({ ...prev, name: '' }));
              }}
              className={`mt-1 w-full p-3 rounded-lg border text-gray-900 ${errors.name ? 'border-red-500' : 'border-gray-300'
                } focus:ring-2 focus:ring-dustup-quote focus:border-dustup-quote`}
              placeholder="Enter your name"
              autoComplete='name'
              id='name'
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email *</label>
            <input
              type="email"
              required
              value={contactInfo.email}
              onChange={(e) => {
                setContactInfo(prev => ({ ...prev, email: e.target.value }));
                setErrors(prev => ({ ...prev, email: '' }));
              }}
              className={`mt-1 w-full p-3 rounded-lg border text-gray-900 ${errors.email ? 'border-red-500' : 'border-gray-300'
                } focus:ring-2 focus:ring-dustup-quote focus:border-dustup-quote`}
              placeholder="Enter your email"
              autoComplete='email'
              id='email'
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Phone *</label>
            <input
              type="tel"
              required
              value={contactInfo.phone}
              onChange={(e) => {
                setContactInfo(prev => ({ ...prev, phone: e.target.value }));
                setErrors(prev => ({ ...prev, phone: '' }));
              }}
              className={`mt-1 w-full p-3 rounded-lg border text-gray-900 ${errors.phone ? 'border-red-500' : 'border-gray-300'
                } focus:ring-2 focus:ring-dustup-quote focus:border-dustup-quote`}
              placeholder="Enter your phone number"
              autoComplete='tel'
              id='phone'
            />
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Company</label>
            <input
              type="text"
              value={contactInfo.company}
              onChange={(e) => setContactInfo(prev => ({ ...prev, company: e.target.value }))}
              className="mt-1 w-full p-3 rounded-lg border text-gray-900 border-gray-300 focus:ring-2 focus:ring-dustup-quote focus:border-dustup-quote"
              placeholder="Enter your company name"
              autoComplete='organization'
              id='company'
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Message</label>
            <textarea
              value={contactInfo.message}
              onChange={(e) => setContactInfo(prev => ({ ...prev, message: e.target.value }))}
              className="mt-1 w-full p-3 rounded-lg border text-gray-900 border-gray-300 focus:ring-2 focus:ring-dustup-quote focus:border-dustup-quote"
              placeholder="Enter your message"
              id='message'
            />
          </div>

          <button
            type="button"
            onClick={handleFormSubmit}
            className={`w-full px-4 py-2 text-white rounded-lg transition-colors duration-200 
               ${isCaptchaVerified
                ? 'bg-dustup-quote hover:bg-dustup-quote-hover'
                : 'bg-gray-400 cursor-not-allowed'}`}
          >
            Continue to Calculator
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactFormModal;