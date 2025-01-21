import React, { useState } from 'react';
import Home from './Home';
import Selling from './Selling';
import Buying from './Buying';

const Dashboard = () => {
  // State to track active component
  const [activeComponent, setActiveComponent] = useState('home'); // Default is 'home'

  // Function to render the active component
  const renderComponent = () => {
    switch (activeComponent) {
      case 'home':
        return <Home />;
      case 'selling':
        return <Selling />;
      case 'buying':
        return <Buying />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      {/* Navigation */}
      <div className="flex justify-center gap-6 mb-6">
        <button
          onClick={() => setActiveComponent('home')}
          className={`px-6 py-2 rounded-lg text-white font-medium ${
            activeComponent === 'home' ? 'bg-blue-600' : 'bg-gray-400 hover:bg-gray-500'
          }`}
        >
          Home
        </button>
        <button
          onClick={() => setActiveComponent('selling')}
          className={`px-6 py-2 rounded-lg text-white font-medium ${
            activeComponent === 'selling' ? 'bg-blue-600' : 'bg-gray-400 hover:bg-gray-500'
          }`}
        >
          Selling
        </button>
        <button
          onClick={() => setActiveComponent('buying')}
          className={`px-6 py-2 rounded-lg text-white font-medium ${
            activeComponent === 'buying' ? 'bg-blue-600' : 'bg-gray-400 hover:bg-gray-500'
          }`}
        >
          Buying
        </button>
      </div>

      {/* Content Area */}
      <div className="bg-white shadow-md rounded-lg p-6">
        {renderComponent()}
      </div>
    </div>
  );
};

export default Dashboard;
