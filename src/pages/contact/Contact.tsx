import React from 'react';
import ContactFormModal from '../../components/ContactFormModal';
import { useNavigate } from 'react-router-dom';

const Contact: React.FC = () => {
  const navigate = useNavigate();

  const handleFormSubmit = (contactInfo: any) => {
    // Handle form submission
    console.log(contactInfo);
  };

  const handleClose = () => {
    // Handle modal close
  };

  return (
    <div className="dustup-contact p-8">
      <ContactFormModal onSubmit={handleFormSubmit} onClose={handleClose} />
      <button
        onClick={() => navigate('/home')}
        className="mt-4 w-full px-5 py-3 font-bold text-white bg-purple-600 rounded-lg hover:bg-purple-700"
      >
        Return to Home
      </button>
    </div>
  );
};

export default Contact;