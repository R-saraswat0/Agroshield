import React from 'react';

const TestStore = () => {
  const items = [
    { id: 1, name: "NPK Fertilizer", price: 850 },
    { id: 2, name: "Organic Compost", price: 450 },
    { id: 3, name: "Urea Fertilizer", price: 650 },
    { id: 4, name: "Pesticide", price: 1200 },
    { id: 5, name: "Neem Oil", price: 950 },
    { id: 6, name: "Herbicide", price: 1100 },
  ];

  return (
    <div style={{ padding: '100px 20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '40px' }}>🌾 AgriStore Test</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
        {items.map(item => (
          <div key={item.id} style={{ 
            border: '1px solid #ddd', 
            padding: '20px', 
            borderRadius: '8px',
            backgroundColor: 'white',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            <h3>{item.name}</h3>
            <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#22c55e' }}>
              Rs. {item.price}
            </p>
            <button style={{
              backgroundColor: '#22c55e',
              color: 'white',
              padding: '10px 20px',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}>
              Buy Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestStore;
