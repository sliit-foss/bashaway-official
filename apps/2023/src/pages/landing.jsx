import {
  Competion,
  ContributionBanner,
  Hero,
  Marquee,
  Mission,
  Partners,
  PastEvents,
  Prizes,
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
      <Prizes />
      <Sponsors />
      <PastEvents />
      <Partners />
    </>
  );
};

export default Landing;
