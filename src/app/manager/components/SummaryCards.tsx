// app/manager/components/SummaryCards.tsx
import React from 'react';

const SummaryCards: React.FC = () => {
  return (
    <div style={{ display: 'flex', gap: '1.5rem' }}>
      <div
        style={{
          background: '#3b82f6',
          color: 'white',
          padding: '1rem',
          borderRadius: '8px',
          flex: 1,
          textAlign: 'center',
        }}
      >
        <h3>Total Applicants</h3>
        <p style={{ fontSize: '2rem', margin: 0 }}>123</p>
      </div>
      <div
        style={{
          background: '#22c55e',
          color: 'white',
          padding: '1rem',
          borderRadius: '8px',
          flex: 1,
          textAlign: 'center',
        }}
      >
        <h3>Accepted</h3>
        <p style={{ fontSize: '2rem', margin: 0 }}>45</p>
      </div>
      <div
        style={{
          background: '#f59e0b',
          color: 'white',
          padding: '1rem',
          borderRadius: '8px',
          flex: 1,
          textAlign: 'center',
        }}
      >
        <h3>Interviews</h3>
        <p style={{ fontSize: '2rem', margin: 0 }}>10</p>
      </div>
    </div>
  );
};

export default SummaryCards;
