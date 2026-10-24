import {
  Competition,
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
    <div>
      <Hero />
      <Marquee />
      <Mission />
      <Competition />
      <Timeline />
      <Rules />
      <ContributionBanner />
      <Prizes />
      <Sponsors />
      <KnowledgePartners />
      <PastEvents />
      <Gallery />
      <Partners />
    </div>
  );
};

export default Landing;
