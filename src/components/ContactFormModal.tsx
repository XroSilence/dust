import React, { useState } from 'react';
import api from '../../../backend/src/config/axiosConfig';
import { X, ArrowRightSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ContactInfo {
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
}

interface ContactFormModalProps {
  onSubmit: (contactInfo: ContactInfo) => void;
  onClose: () => void;
}

const ContactFormModal: React.FC<ContactFormModalProps> = ({ onSubmit, onClose }) => {
  const [contactInfo, setContactInfo] = useState<ContactInfo>({
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


  const _navigate = useNavigate(); // ESLint will ignore unused variables prefixed with _

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string) => {
    // More comprehensive phone regex that handles international formats
    const phoneRegex = /^(\+?\d{1,3}[-.]?)?\s*\(?(\d{3})\)?[-.\s]*(\d{3})[-.\s]*(\d{4})$/;
    return phoneRegex.test(phone);
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
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
      setErrors({ ...errors, ...formErrors });
      return false;
    }
  };

  const handleFormSubmit = async () => {
    if (handleFormValidation()) {
      try {
        // First submit contact info to backend
        const response = await api.post('/api/contact', contactInfo);
        
        if (response.status === 200) {
          // Pass contact info to parent and close modal
          onSubmit(contactInfo);
          // Don't navigate here - let parent component handle it
        } else {
          throw new Error('Failed to submit contact info');
        }
      } catch (error) {
        console.error('Error:', error);
        setErrors({ ...errors, form: 'Failed to submit contact info' });
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
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
            type="submit"
            className="dustup-quote w-full px-5 py-3 Bold-lg dustup-quote:hover"
          >
            Continue
            <ArrowRightSquare className="inline ml-2" size={16} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactFormModal;