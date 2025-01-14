import React from 'react'; 
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Quote from './pages/quote/Quote';
import Services from './pages/services/Services';
import Contact from './pages/contact/Contact';
import Areas from './pages/areas/Areas';


function App() { // Create a functional component named App
  return (
    <div className="app"> {/* Create a div with a class of app */}
      <Routes> {/* Use the Routes component */}
        <Route path="/" element={<Home />} />  {/* Use the Route component with the path prop set to "/" and the element prop set to the Home component */}
        <Route path="/quote" element={<Quote />} /> {/* Use the Route component with the path prop set to "/quote" and the element prop set to the Quote component */}
        <Route path="/services" element={<Services />} /> {/* Use the Route component with the path prop set to "/services" and the element prop set to the Services component */}
        <Route path="/contact" element={<Contact />} /> {/* Use the Route component with the path prop set to "/contact" and the element prop set to the Contact component */}
        <Route path="/areas" element={<Areas />} /> {/* Use the Route component with the path prop set to "/areas" and the element prop set to the Areas component */}
      </Routes>
    </div>
  );
}

export default App; // Export the App component