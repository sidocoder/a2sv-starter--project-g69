import React from 'react';
import Header from './components/Header';
import SummaryCards from './components/SummaryCards';
import ApplicationsTable from './components/ApplicationsTable';
import TeamPerformance from './components/TeamPerformance';
import Footer from './components/Footer';

export default function ManagerDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-grow max-w-7xl mx-auto px-8 py-10 mb-50 flex gap-8">
        <section className="flex-grow flex flex-col">
          <h1 className="text-xl font-bold mb-1">Manager Dashboard</h1>
          <p className="mb-6 text-gray-600 text-sm">G7 November Intake</p>

          <SummaryCards />

          <div className="flex gap-8 mt-8">
            <ApplicationsTable />
            <TeamPerformance />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
