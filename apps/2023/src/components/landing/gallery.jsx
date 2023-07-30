import { BodyText, ComponentStack, SectionBadge } from '@/components/common';

const Gallery = () => {
  return (
    <div className="w-full flex flex-col mt-5 py-6 px-10 lg:px-24 gap-y-10">
      <SectionBadge>Gallery</SectionBadge>
      <ComponentStack>
        <img src="./assets/images/gallery/1.jpg" className="" />
        <img src="./assets/images/gallery/2.jpg" className="" />
        <img src="./assets/images/gallery/3.jpg" className="" />
      </ComponentStack>
      <BodyText className="tracking-[-2px]">
        Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing
        layouts and visual mockups. This should be about past content.
      </BodyText>
    </div>
  );
};

export default Gallery;
