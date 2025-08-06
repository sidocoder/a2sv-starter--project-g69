import NavBar from './components/NavBar';

export default function ManagerLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavBar />
      <main style={{ padding: '2rem' }}>
        {children}
      </main>
    </>
  );
}
