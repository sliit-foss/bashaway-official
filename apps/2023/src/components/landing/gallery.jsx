import { BodyText, ComponentStack, SectionBadge } from '@/components/common';

const Gallery = () => {
  return (
    <div className="w-full flex flex-col mt-5 py-6 px-10 lg:px-24 gap-y-10">
      <SectionBadge>Gallery</SectionBadge>
      <ComponentStack
        className="h-[460px]"
        itemStyle={({ index, itemHovered }) =>
          index === 0 && !itemHovered ? 'grayscale-0' : 'grayscale hover:grayscale-0'
        }>
        <img src="./assets/images/gallery/1.jpg" className="saturate-[.85]" />
        <img src="./assets/images/gallery/2.jpg" />
        <img src="./assets/images/gallery/3.jpg" />
      </ComponentStack>
      <BodyText className="tracking-[-2px]">
        These pictures speak a thousand words. Make sure to leaf through the gallery of Bashaway 2022, the first edition
        of our competition!!
      </BodyText>
    </div>
  );
};

export default Gallery;
