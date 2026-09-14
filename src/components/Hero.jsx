import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="hero bg-surface py-12 md:py-20 px-4">
      <div className="hero__container max-w-6xl mx-auto text-center">
        <h1 className="hero__title text-3xl md:text-5xl lg:text-6xl font-extrabold text-primary mb-4 md:mb-6">
          Connect. Learn. Build. Together.
        </h1>
        <p className="hero__subtitle text-base md:text-xl text-secondary max-w-3xl mx-auto mb-6 md:mb-8 px-2">
          Discover technology events, connect with developers, and learn from a growing community of technology enthusiasts.
        </p>

        {/* Hero image */}
        <div className="hero__image-wrapper mb-6 md:mb-8">
          <img src="/images/hero_image.png" alt="Team collaborating" className="hero__image w-full max-w-sm md:max-w-md mx-auto" />
        </div>

        <div className="hero__actions flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
          <Link to="/events" className="hero__btn-primary bg-accent text-white px-6 md:px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition w-full sm:w-auto text-center">Explore Events</Link>
          <Link to="/register" className="hero__btn-secondary border-2 border-primary text-primary px-6 md:px-8 py-3 rounded-lg font-semibold hover:bg-primary hover:text-white transition w-full sm:w-auto text-center">Join Community</Link>
        </div>
      </div>
    </section>
  );
}
