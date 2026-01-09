export default function AuthLayout({ children }) {
  return (
    <section className="min-h-screen flex items-center justify-center bg-[#11001a]">
      <h1 className="text-white">Hello</h1>
      {children}
    </section>
  );
}
