import Link from "next/link";

export default function NotFound() {
  return (
    <section className="hero-bg min-h-[70vh] flex items-center justify-center px-6 -mt-[72px] pt-[72px]">
      <div className="text-center relative z-10">
        <div className="text-[120px] font-extrabold font-header text-white/10 leading-none">404</div>
        <h1 className="text-3xl sm:text-4xl text-white mb-4">Page not found</h1>
        <p className="text-white/70 mb-10">The page you&apos;re looking for doesn&apos;t exist or has been unpublished.</p>
        <Link href="/" className="px-10 py-4 bg-accent text-white font-bold rounded-xl primary-btn">
          Back to Home
        </Link>
      </div>
    </section>
  );
}
