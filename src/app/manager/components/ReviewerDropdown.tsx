export default function ReviewerDropdown() {
  const reviewers = ['Abel Kebede', 'Alemu Mossia'];

  return (
    <div style={{ marginTop: '0.5rem' }}>
      <strong>Assign to Reviewer:</strong>
      <ul>
        {reviewers.map((r, i) => (
          <li key={i} style={{ marginTop: '0.25rem', cursor: 'pointer' }}>{r}</li>
        ))}
      </ul>
    </div>
  );
}
