export default function SummaryCards() {
  const cards = [
    { title: 'Total Applications', value: '1,204' },
    { title: 'Under Review', value: '750' },
    { title: 'Interview Stage', value: '250' },
    { title: 'Accepted', value: '82' },
  ];

  return (
    <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
      {cards.map((card, index) => (
        <div className="card" key={index} style={{ minWidth: '160px', textAlign: 'center' }}>
          <h4>{card.title}</h4>
          <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{card.value}</p>
        </div>
      ))}
    </div>
  );
}
