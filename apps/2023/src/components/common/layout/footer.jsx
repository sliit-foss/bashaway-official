import { AiFillFacebook, AiFillInstagram, AiFillLinkedin, AiFillYoutube, AiOutlineTwitter } from 'react-icons/ai';
import { twMerge } from 'tailwind-merge';
import { facebook, instagram, linkedIn, twitter, youTube } from '@/constants';
import { Bashaway, FossLogoDark } from '@/icons';

const Footer = ({ className }) => {
  return (
    <footer
      className={twMerge(
        `bg-white flex flex-col-reverse md:flex-row items-center sm:items-start justify-between pt-16 pb-24 px-8 lg:px-24`,
        className
      )}>
      <div className="flex flex-col items-center md:items-start gap-y-5 col-start-1">
        <FossLogoDark />
        <p className="md:w-[320px] px-2 sm:px-0 text-sm text-center md:text-left text-gray-500 opacity-80 font-consolas">
          Welcome to SLIIT FOSS community. We&apos;re a group of volunteers who believe in the usage of Free/Open Source
          Software (FOSS)
        </p>
        <div className="font-semibold text-[20px] font-cabinet">CONNECT WITH US</div>
        <div className="flex space-x-3 flex-shrink-0 -ml-0.5">
          <a href={facebook} target="_blank" className="icon-hover" rel="noreferrer">
            <AiFillFacebook className="h-5 w-5" />
          </a>
          <a href={instagram} target="_blank" className="icon-hover" rel="noreferrer">
            <AiFillInstagram className="h-[1.292rem] w-[1.292rem] -translate-y-[0.01rem]" />
          </a>
          <a href={twitter} target="_blank" className="icon-hover" rel="noreferrer">
            <AiOutlineTwitter className="h-[1.48rem] w-[1.48rem] -translate-y-[0.10rem]" />
          </a>
          <a href={linkedIn} target="_blank" className="icon-hover" rel="noreferrer">
            <AiFillLinkedin className="h-5 w-5" />
          </a>
          <a href={youTube} target="_blank" className="icon-hover" rel="noreferrer">
            <AiFillYoutube className="h-[1.36rem] w-[1.36rem] -translate-y-[0.06rem]" />
          </a>
        </div>
      </div>
      <div className="flex flex-col items-center -translate-y-1.5 mb-5">
        <Bashaway height={46} />
      </div>
    </footer>
  );
};

export default Footer;
