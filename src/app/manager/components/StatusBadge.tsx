import React from 'react';

export type StatusType = 'New' | 'Under Review' | 'Interview' | 'Accepted' | 'Rejected';

interface StatusBadgeProps {
  status: StatusType;
}

const statusStyles: Record<StatusType, { bgColor: string; textColor: string }> = {
  New: { bgColor: '#3b82f6', textColor: '#fff' },
  'Under Review': { bgColor: '#facc15', textColor: '#000' },
  Interview: { bgColor: '#38bdf8', textColor: '#000' },
  Accepted: { bgColor: '#22c55e', textColor: '#fff' },
  Rejected: { bgColor: '#ef4444', textColor: '#fff' },
};

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const { bgColor, textColor } = statusStyles[status];

  return (
    <span
      style={{
        backgroundColor: bgColor,
        color: textColor,
        padding: '4px 12px',
        borderRadius: '6px',
        fontSize: '12px',
        fontWeight: 600,
        minWidth: '90px',
        display: 'inline-block',
        textAlign: 'center',
        userSelect: 'none',
        whiteSpace: 'nowrap',
      }}
      aria-label={`Status: ${status}`}
    >
      {status}
    </span>
  );
};

export default StatusBadge;
