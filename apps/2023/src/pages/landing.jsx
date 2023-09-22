import {
  Competion,
  ContributionBanner,
  Gallery,
  Hero,
  KnowledgePartners,
  Marquee,
  Mission,
  Partners,
  PastEvents,
  Prizes,
  Rules,
  Sponsors,
  Timeline
} from '@/components/landing';

const Landing = () => {
  return (
    <>
      <Hero />
      <Marquee />
      <Mission />
      <Competion />
      <Timeline />
      <Rules />
      <ContributionBanner />
      <Prizes />
      <Sponsors />
      <KnowledgePartners />
      <PastEvents />
      <Gallery />
      <Partners />
    </>
  );
};

export default Landing;
