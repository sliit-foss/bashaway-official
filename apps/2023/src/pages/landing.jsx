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
  Rules,
  Sponsors
} from '@/components/landing';

const Landing = () => {
  return (
    <>
      <Hero />
      <Marquee />
      <Mission />
      <Competion />
      <Rules />
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
