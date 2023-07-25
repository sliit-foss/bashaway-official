import Title from '@/components/common/title';

const Speakers = () => {
  const speakerList = [
    {
      name: 'Jananath Banuka',
      position: 'System/DevOps Engineer',
      image: 'speaker1.jpg',
      linkedin: 'https://www.linkedin.com/in/jananathbanukajayarathna/',
      sessionLink: 'https://youtu.be/ugyWK8MFKVw'
    },
    {
      name: 'Heshan Dharmasena',
      position: 'Red Hat Certified Architect & Trainer',
      image: 'speaker2.jpg',
      linkedin: 'https://www.linkedin.com/in/heshandharmasena/',
      sessionLink: 'https://youtu.be/tOJ5TlHoAiM'
    },
    {
      name: 'Kusal Hettiarachchi',
      position: 'Software/Data Engineer',
      image: 'speaker3.jpg',
      linkedin: 'https://www.linkedin.com/in/kusalhettiarachchi/',
      sessionLink: 'https://youtu.be/_lzpNZRcc2E'
    }
  ];

  const Speaker = ({ name, position, image, linkedin, sessionLink, aos }) => {
    return (
      <div className="flex flex-col justify-center items-center my-12" data-aos={aos}>
        <a
          className={`relative w-32 h-32 md:w-44 md:h-44 mx-12 p-2 bg-black outline outline-2 outline-nav-links-unselected ring-4 rounded-full flex justify-center cursor-pointer items-center transform hover:scale-105 hover:outline-primary transition duration-300`}
          href={`${linkedin}`}
          target="_blank"
          rel="noreferrer">
          <img src={`/assets/speakers/${image}`} className="w-full h-full rounded-full bg-cover grayscale" />
        </a>
        <span className="text-white text-xl font-semibold text-center mt-8 mb-2">{name}</span>
        <span className="text-nav-links-unselected text-center mb-2">{position}</span>
        <a href={`${sessionLink}`}>
          <img src={'/assets/social/youtube.svg'} className="w-14 h-14 hover:brightness-200 duration-300" />
        </a>
      </div>
    );
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center bg-black pt-[80px]" id="speakers">
        <Title title="Speakers" className="mt-4 mb-20" aos="fade-down" />
        <div className="flex flex-wrap justify-center items-center">
          {speakerList.map((speaker, index) => {
            return (
              <Speaker
                key={speaker.name}
                name={speaker.name}
                position={speaker.position}
                image={speaker.image}
                linkedin={speaker.linkedin}
                sessionLink={speaker.sessionLink}
                aos={index === 0 ? 'fade-right' : 'fade-left'}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Speakers;
