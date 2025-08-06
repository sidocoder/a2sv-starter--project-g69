import React from 'react';
import StatusBadge, { StatusType } from './StatusBadge';

interface Applicant {
  name: string;
  date: string;
  reviewer: string;
  status: StatusType;
}

const applicants: Applicant[] = [
  {
    name: 'Abel Tadesse',
    date: 'Oct 26, 2023',
    reviewer: 'Jane R.',
    status: 'Under Review',
  },
  {
    name: 'Bethlehem Tadesse',
    date: 'Oct 25, 2023',
    reviewer: '',
    status: 'New',
  },
  {
    name: 'Charles Kebede',
    date: 'Oct 24, 2023',
    reviewer: 'Mike L.',
    status: 'Accepted',
  },
];

const ApplicationsTable: React.FC = () => {
  return (
    <table
      style={{
        borderCollapse: 'collapse',
        width: '100%',
        minWidth: '600px',
      }}
    >
      <thead>
        <tr>
          <th style={{ textAlign: 'left', padding: '12px', borderBottom: '2px solid #ddd' }}>Name</th>
          <th style={{ textAlign: 'left', padding: '12px', borderBottom: '2px solid #ddd' }}>Date</th>
          <th style={{ textAlign: 'left', padding: '12px', borderBottom: '2px solid #ddd' }}>Reviewer</th>
          <th style={{ textAlign: 'left', padding: '12px', borderBottom: '2px solid #ddd' }}>Status</th>
        </tr>
      </thead>
      <tbody>
        {applicants.map((applicant, i) => (
          <tr key={i} style={{ borderBottom: '1px solid #eee' }}>
            <td style={{ padding: '12px' }}>{applicant.name}</td>
            <td style={{ padding: '12px' }}>{applicant.date}</td>
            <td style={{ padding: '12px' }}>{applicant.reviewer || 'Not Assigned'}</td>
            <td style={{ padding: '12px' }}>
              <StatusBadge status={applicant.status} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ApplicationsTable;
