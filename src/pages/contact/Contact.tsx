import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import emailjs from '@emailjs/browser';
import he from 'he';
import { ArrowLeft, Send } from 'lucide-react';
import ReCAPTCHA from 'react-google-recaptcha';

export default function Contact() {
  const form = useRef();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [recaptchaToken, setRecaptchaToken] = useState(null);
  const recaptchaRef = useRef();

  const handleRecaptcha = (token) => {
    setRecaptchaToken(token);
  };

  React.useEffect(() => {
    ReCAPTCHA.defaultProps.sitekey = process.env.REACT_APP_RECAPTCHA_SITE_KEY;
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!recaptchaToken) {
      alert('Please complete the reCAPTCHA');
      return;
    }
    const encodedName = he.encode(formData.name);
    const encodedMessage = he.encode(formData.message);
    const encodedEmail = he.encode(formData.email);

    try {
      await emailjs.sendForm(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        form.current,
        process.env.REACT_APP_EMAILJS_USER_ID || 'joux6WksBu9XSEcel'
      );
      console.log('SUCCESS!');

      const response = await fetch('http://localhost:5173/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: encodedName,
          email: encodedEmail,
          message: encodedMessage
        }),
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };



return (
  <div className="w-screen min-h-screen bg-slate-900 text-white p-8">
    <form ref={form} onSubmit={handleSubmit} className="max-w-md mx-auto space-y-6">
      <div className="space-y-2">
        <label htmlFor="name" className="block text-white">Name</label>
        <input
          type="text"
          id="name"
          required
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          className="w-full p-3 rounded-lg bg-slate-700 text-white border border-slate-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          placeholder="Your name"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="email" className="block text-white">Email</label>
        <input
              required
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full p-3 rounded-lg bg-slate-700 text-white border border-slate-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              placeholder="your@email.com"
              autoComplete="email"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="message" className="block text-white">Message</label>
            <textarea
              id="message"
              required
              value={formData.message}
          placeholder="How can we help?"
          onChange={(e) => setFormData({...formData, message: e.target.value})}
          className="w-full p-3 rounded-lg bg-slate-700 text-white border border-slate-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
         />
        </div>

        <ReCAPTCHA
          ref={recaptchaRef}
          sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
          onChange={handleRecaptcha}
        />
          
        <button 
          type="submit"
          className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-400 text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:shadow-[0_0_15px] hover:shadow-blue-500 transition-all duration-300"
        >
          <Send className="w-5 h-5" />
          Send Message
        </button>
      </form>
  <div className="text-center mt-12">
    <button
      onClick={() => navigate('/')}
      className="inline-flex items-center gap-2 px-6 py-3 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-colors duration-200 hover:shadow-[0_0_15px] hover:shadow-slate-700"
    >
      <ArrowLeft className="w-5 h-5" />
      Back to Home
    </button>
    </div>
  </div>
  );
}