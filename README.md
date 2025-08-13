 A2SV Starter Project - G69

A modern web application built with Next.js 15, TypeScript, Tailwind CSS, and Redux Toolkit, following best practices for scalability and maintainability.  
This project uses the App Router for routing, Radix UI for accessible components, and Recharts for interactive data visualization.


 📂 Project Structure

src/
app/  App Router pages & layouts
components/  Reusable UI components
store/  Redux store setup & slices
lib/  Utility functions & API handlers
styles/  Global styles (Tailwind base)
public/  Static assets

 🚀 Features

- Next.js App Router for file-based routing and server components.
- TypeScript for type safety and better developer experience.
- Tailwind CSS for utility-first, responsive styling.
- Redux Toolkit & React-Redux for state management.
- Radix UI components for accessible UI primitives.
- Lucide Icons & React Icons for scalable vector icons.
- Recharts for interactive charts and data visualization.
- API handling via Axios.
- Fully configurable via environment variables.

 🛠️ Tech Stack

- Framework: [Next.js 15](https://nextjs.org/)
- Language: [TypeScript](https://www.typescriptlang.org/)
- Styling: [Tailwind CSS](https://tailwindcss.com/)
- State Management: [Redux Toolkit](https://redux-toolkit.js.org/)
- UI Components: [Radix UI](https://www.radix-ui.com/), [Lucide Icons](https://lucide.dev/)
- Data Visualization: [Recharts](https://recharts.org/)
- HTTP Client: [Axios](https://axios-http.com/)
 📦 Installation

1. Clone the repository
   ```bash
   git clone https://github.com/your-username/a2sv-starter-project-g69.git
   cd a2sv-starter-project-g69
Install dependencies

bash
Copy
Edit
npm install
or

bash
Copy
Edit
yarn install
Set environment variables
Create a .env.local file in the project root:

env
Copy
Edit
NEXT_PUBLIC_API_BASE_URL=https://api.example.com
▶️ Running the Project
Development

bash
Copy
Edit
npm run dev
Visit: http://localhost:3000


🤝 Contributing
Fork the project

Create a feature branch (git checkout -b feature/amazing-feature)

Commit changes (git commit -m 'Add amazing feature')

Push to the branch (git push origin feature/amazing-feature)

Open a Pull Request


