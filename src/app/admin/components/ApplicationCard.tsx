import React from 'react';

interface ApplicationCardProps {
  name: string;
  start_date: string;
  end_date: string;
  status: 'Active' | 'Closed';
}

const ApplicationCard: React.FC<ApplicationCardProps> = ({ name, status, start_date, end_date }) => {
  const badgeStyle =
    status === 'Active'
      ? 'bg-green-100 text-green-800'
      : 'bg-red-100 text-red-600';

  const textStyle =
    status === 'Active' ? 'text-green-600' : 'text-gray-500';

  return (
    <div className="bg-white shadow-md rounded-lg p-4 w-72">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-semibold">{name}</h3>
        <span className={`text-xs px-2 py-1 rounded ${badgeStyle}`}>
          {status === 'Active' ? 'Active' : 'Closed'}
        </span>
      </div>
      <p className="text-sm text-gray-600 mb-2">{name}</p>
      <p className="text-sm"><strong>start date:</strong> {start_date}</p>
      <p className="text-sm">
        <strong>Status:</strong>{' '}
        <span className={textStyle}>{status}</span>
      </p>
    </div>
  );
};

export default ApplicationCard;
