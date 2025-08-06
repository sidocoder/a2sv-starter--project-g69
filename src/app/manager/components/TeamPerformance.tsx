import React from 'react';

const team = [
  {
    name: 'Jane R.',
    assigned: 3,
    avgDays: 2.5,
    reviews: 12,
  },
  {
    name: 'Mike R.',
    assigned: 5,
    avgDays: 3.1,
    reviews: 8,
  },
];

export default function TeamPerformance() {
  return (
    <aside className="bg-white shadow rounded p-6 w-72">
      <h3 className="font-semibold text-lg mb-6">Team Performance</h3>

      {team.map(({ name, assigned, avgDays, reviews }) => (
        <div
          key={name}
          className="mb-6 last:mb-0 text-sm flex flex-col space-y-1"
        >
          <div className="font-semibold">{name}</div>
          <div className="flex justify-between text-gray-600">
            <span>
              {assigned} Assigned / Avg. {avgDays} days
            </span>
            <span>{reviews} Reviews</span>
          </div>
        </div>
      ))}
    </aside>
  );
}
