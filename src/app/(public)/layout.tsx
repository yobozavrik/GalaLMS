export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="flex min-h-screen flex-col bg-slate-50">{children}</div>
}
