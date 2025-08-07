'use client';

import { FaTools, FaProjectDiagram, FaUserTie, FaBriefcase } from 'react-icons/fa';

const steps = [
  {
    icon: <FaTools size={24} className="text-indigo-600" />,
    title: 'Phase 1: Foundations',
    desc: 'Master data structures, algorithms, and problem-solving techniques in an intensive 3-month bootcamp.',
  },
  {
    icon: <FaProjectDiagram size={24} className="text-indigo-600" />,
    title: 'Phase 2: Real-world Projects',
    desc: 'Apply your skills to build complex projects, collaborate in teams, and prepare for technical interviews.',
  },
  {
    icon: <FaUserTie size={24} className="text-indigo-600" />,
    title: 'Phase 3: Internship Placement',
    desc: 'We help you secure internships at top global tech companies to gain invaluable experience.',
  },
  {
    icon: <FaBriefcase size={24} className="text-indigo-600" />,
    title: 'Phase 4: Full-Time Conversion',
    desc: 'Excel in your internship and convert it into a full-time offer, launching your global career.',
  },
];

export default function Journey() {
  return (
    <section className="py-16  bg-white text-center" id="Journey" >
      <h2 className="text-3xl font-bold mb-2">Your Journey to Silicon Valley</h2>
      <p className="text-gray-600 mb-10">A proven path from learning to leadership.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-6 max-w-7xl mx-auto">
        {steps.map((step, i) => (
          <div key={i} className="p-6 rounded-lg shadow hover:shadow-md transition">
            <div className="mb-4">{step.icon}</div>
            <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
            <p className="text-sm text-gray-600">{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
