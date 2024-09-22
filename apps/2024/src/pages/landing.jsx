import {
  Competion,
  ContributionBanner,
  Gallery,
  Hero,
  InKindPartners,
  KnowledgePartners,
  Marquee,
  Mission,
  Partners,
  PastEvents,
  Prizes,
  Rules,
  Sponsors,
  Testimonials,
  Timeline
} from '@/components/landing';

const Landing = () => {
  return (
    <div>
      <Hero />
      <Marquee />
      <Mission />
      <Competion />
      <Timeline />
      <Rules />
      <ContributionBanner />
      <Prizes />
      <Sponsors />
      <Testimonials />
      <KnowledgePartners />
      <InKindPartners />
      <PastEvents />
      <Gallery />
      <Partners />
    </div>
  );
};

export default Landing;
