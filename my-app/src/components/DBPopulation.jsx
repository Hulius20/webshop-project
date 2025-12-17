import React, { useState } from 'react';
import publicApi from '../api/axiosPublic.jsx';

export default function DBPopulation() {
  const [populatingDb, setPopulatingDb] = useState(false);
  const [populationMessage, setPopulationMessage] = useState('');

  const populateDatabase = async () => {
    setPopulatingDb(true);
    setPopulationMessage('');
    try {
      const response = await publicApi.post('/api/populate-db/');
      setPopulationMessage('✅ Database populated successfully with 6 users and 30 products!');
      // Trigger event to refresh products in Home component
      window.dispatchEvent(new Event('databasePopulated'));
    } catch (error) {
      console.error('Error populating database:', error);
      setPopulationMessage('❌ Error populating database. Please try again.');
    } finally {
      setPopulatingDb(false);
    }
  };

  return (
    <div style={{ 
      padding: '1rem', 
      marginBottom: '1rem', 
     
      borderRadius: '4px',
      textAlign: 'center'
    }}>
      <button 
        onClick={populateDatabase}
        disabled={populatingDb}
        style={{
          padding: '0.75rem 1.5rem',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: populatingDb ? 'not-allowed' : 'pointer',
          fontSize: '1rem',
          opacity: populatingDb ? 0.6 : 1
        }}
      >
        {populatingDb ? 'Populating...' : 'Populate Database'}
      </button>
      {populationMessage && (
        <p style={{ 
          marginTop: '0.5rem', 
          fontSize: '0.9rem',
          color: populationMessage.includes('✅') ? '#28a745' : '#dc3545'
        }}>
          {populationMessage}
        </p>
      )}
    </div>
  );
}