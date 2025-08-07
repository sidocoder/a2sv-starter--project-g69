import React from 'react';

const Button = ({ children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button
    {...props}
    className="bg-blue-600 btn hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition-all"
  >
    {children}
  </button>
);

export default Button;
