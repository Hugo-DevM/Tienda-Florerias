export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Dashboard has its own standalone layout — no public Navbar/Footer
  return <>{children}</>;
}
