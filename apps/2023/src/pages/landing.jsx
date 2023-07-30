import {
  Competion,
  ContributionBanner,
  Gallery,
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
      <Gallery />
      <Partners />
    </>
  );
};

export default Landing;
