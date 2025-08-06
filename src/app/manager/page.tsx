import React from 'react';
import SummaryCards from './components/SummaryCards';
import ApplicationsTable from './components/ApplicationsTable';
import TeamPerformance from './components/TeamPerformance';

export default function ManagerDashboard() {
  return (
    <main style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ marginBottom: '0.5rem' }}>Manager Dashboard</h1>
      <p style={{ color: '#666', marginBottom: '2rem' }}>07 November Intake</p>

      <SummaryCards />

      <div
        style={{
          display: 'flex',
          gap: '2rem',
          marginTop: '2rem',
          flexWrap: 'wrap',
          alignItems: 'flex-start',
        }}
      >
        <ApplicationsTable />
        <TeamPerformance />
      </div>
    </main>
  );
}
