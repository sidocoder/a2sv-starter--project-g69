import SummaryCards from './components/SummaryCards';
import ApplicationsTable from './components/ApplicationsTable';
import TeamPerformance from './components/TeamPerformance';

export default function ManagerDashboard() {
  return (
    <div>
      <h1>Manager Dashboard</h1>
      <p>07 November Intake</p>

      <SummaryCards />

      <div style={{ display: 'flex', gap: '2rem', marginTop: '2rem' }}>
        <ApplicationsTable />
        <TeamPerformance />
      </div>
    </div>
  );
}
