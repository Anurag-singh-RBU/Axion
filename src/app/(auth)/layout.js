"use client"

export default function AuthLayout({ children }){

  return (
    <section className="min-h-screen flex items-center justify-center bg-neutral-100">           
      {children}
    </section>
  );
}
