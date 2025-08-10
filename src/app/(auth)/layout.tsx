export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background px-4 py-6 sm:px-6 sm:py-8">
      {children}
    </div>
  );
}
