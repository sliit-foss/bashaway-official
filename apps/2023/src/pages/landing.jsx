import {
  Competion,
  ContributionBanner,
  Gallery,
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
      <Gallery />
      <Partners />
    </>
  );
};

export default Landing;
