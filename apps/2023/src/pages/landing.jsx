import {
  Competion,
  ContributionBanner,
  Hero,
  Marquee,
  Mission,
  Partners,
  PastEvents,
  Sponsors
} from '@/components/landing';

const Landing = () => {
  return (
    <>
      <Hero />
      <Marquee />
      <Mission />
      <Competion />
      <ContributionBanner />
      <Sponsors />
      <PastEvents />
      <Partners />
    </>
  );
};

export default Landing;
