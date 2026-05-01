import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="container-zc py-32 text-center">
      <div className="text-[10rem] font-black text-primary leading-none tracking-tighter">404</div>
      <h1 className="mt-2 text-3xl font-black text-navy">Page not found</h1>
      <p className="mt-3 text-navy/70 max-w-md mx-auto">The page you're looking for doesn't exist or has moved.</p>
      <Link to="/" className="btn-primary mt-8">Return Home</Link>
    </section>
  );
}
