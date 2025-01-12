import React, { useState } from 'react'; // Import React library and useState hook
import axios from 'api/axiosConfig.js'; // Import axios library
import he from 'he'; // Import he library
import { useNavigate } from 'react-router'; // Import useNavigate hook from react-router
import { Send, ArrowLeft } from 'lucide-react'; // Import Send and ArrowLeft icons from lucide-react

function Contact() {
  const navigate = useNavigate(); // Initialize navigate hook
  const [formData, setFormData] = useState({ 
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = async (e) => { // Create handleSubmit function
    e.preventDefault(); // Prevent the default form submission behavior
    const encodedName = he.encode(formData.name); // Encode the name
    const encodedEmail = he.encode(formData.email); // Encode the email
    const encodedMessage = he.encode(formData.message);  // Encode the message

    try {
      const response = await axios.post('/contact', { // Updated endpoint to '/contact'
        name: encodedName,
        email: encodedEmail,
        message: encodedMessage,
      });

      if (response.status === 200) { // Check if the response status is 200
        alert('Message sent successfully!'); // Display success message
        // Optionally, reset the form
        setFormData({ name: '', email: '', message: '' });
      } else {
        alert('Message Not Sent, Please Refresh Page & Try Again. If the problem persists, please contact us directly at email: API@dustup.online');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while sending the message.');
    }
  };

  return (
    <div className="w-screen min-h-screen bg-slate-900 text-white p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8">Contact Us</h1>

        <form onSubmit={handleSubmit} className="space-y-6 bg-slate-800/50 rounded-lg p-8 border border-slate-700">
          <div className="space-y-2">
            <label htmlFor="name" className="block text-white">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full p-3 rounded-lg bg-slate-700 text-white border border-slate-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              placeholder="Your name"
              autoComplete="name"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="block text-white">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full p-3 rounded-lg bg-slate-700 text-white border border-slate-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              placeholder="your@email.com"
              autoComplete="email"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="message" className="block text-white">Message</label>
            <textarea
              id="message"
              name="message"
              required
              value={formData.message} // Update value to formData.message
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              rows={4}
              className="w-full p-3 rounded-lg bg-slate-700 text-white border border-slate-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              placeholder="How can we help?"
            />
          </div>

          <button
            type="submit" // Add type="submit" to the button
            className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-400 text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:shadow-[0_0_15px] hover:shadow-blue-500 transition-all duration-300"
          >
            <Send className="w-5 h-5" />
            Send Message
          </button>
        </form>

        <div className="text-center mt-12">
          <button
            onClick={() => navigate('/')} // Update onClick to navigate to the home
            className="inline-flex items-center gap-2 px-6 py-3 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-colors duration-200 hover:shadow-[0_0_15px] hover:shadow-slate-700"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </button> 
        </div>
      </div>
    </div>
  );
}

export default Contact; // Export Contact component