import Hero from '../components/Hero';
import FeaturedPrograms from '../components/FeaturedPrograms';
import CommunityProof from '../components/CommunityProof';

export default function Landing() {
  return (
    <div className="landing">
      <Hero />
      <FeaturedPrograms />
      <CommunityProof />
    </div>
  );
}
