import React from 'react';

interface ApplicationCardProps {
  title: string;
  description: string;
  country: string;
  status: 'Active' | 'Closed';
}

const ApplicationCard: React.FC<ApplicationCardProps> = ({ title, description, country, status }) => {
  const badgeStyle =
    status === 'Active'
      ? 'bg-green-100 text-green-800'
      : 'bg-red-100 text-red-600';

  const textStyle =
    status === 'Active' ? 'text-green-600' : 'text-gray-500';

  return (
    <div className="bg-white shadow-md rounded-lg p-4 w-72">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-semibold">{title}</h3>
        <span className={`text-xs px-2 py-1 rounded ${badgeStyle}`}>
          {status === 'Active' ? 'Active' : 'Closed'}
        </span>
      </div>
      <p className="text-sm text-gray-600 mb-2">{description}</p>
      <p className="text-sm"><strong>Country:</strong> {country}</p>
      <p className="text-sm">
        <strong>Status:</strong>{' '}
        <span className={textStyle}>{status}</span>
      </p>
    </div>
  );
};

export default ApplicationCard;
