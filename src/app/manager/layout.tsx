
export default function ManagerLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main style={{ padding: '0' }}>
        {children}
      </main>
    </>
  );
}
