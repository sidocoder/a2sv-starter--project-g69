export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-400 py-6 text-center text-sm mt-auto">
      <div className="container mx-auto">
        <p>&copy; {new Date().getFullYear()} A2SV. All rights reserved.</p>
      </div>
    </footer>
  );
}
