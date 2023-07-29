import {
  Competion,
  ContributionBanner,
  Hero,
  Marquee,
  Mission,
  Partners,
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
      <Partners />
    </>
  );
};

export default Landing;
