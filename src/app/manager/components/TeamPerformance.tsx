export default function TeamPerformance() {
  const reviewers = [
    { name: 'Jane R.', assigned: 3, avgDays: 2.5, totalReviews: 12 },
    { name: 'Mike R.', assigned: 5, avgDays: 3.1, totalReviews: 8 },
  ];

  return (
    <div className="card" style={{ flex: 1 }}>
      <h3>Team Performance</h3>
      <ul style={{ marginTop: '1rem' }}>
        {reviewers.map((r, i) => (
          <li key={i} style={{ marginBottom: '1rem' }}>
            <strong>{r.name}</strong><br />
            {r.assigned} Assigned / Avg. {r.avgDays} days<br />
            {r.totalReviews} Reviews
          </li>
        ))}
      </ul>
    </div>
  );
}
