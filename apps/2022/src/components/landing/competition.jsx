import Title from '@/components/common/title';

const Competition = () => {
  return (
    <div className="flex flex-col items-center px-7 pt-[80px]" id="competition">
      <Title title="Competition" aos="fade-left" />
      <div className="flex flex-col md:flex-row justify-between px-3 md:px-12 xl:px-20">
        <div className="flex flex-row mt-[60px] w-full md:w-1/2" data-aos="fade-right">
          <div className="lg:text-right mx-2 md:text-left">
            <h1 className="text-white mb-[18px]">Why?</h1>
            <p className="text-[#888888]">
              <span className="text-[#0070F3]">./bashaway</span> 2022 aims to sharpen a participant&apos;s&nbsp;
              <span className="text-[#0070F3]">analytical thinking, problem-solving,</span> and{' '}
              <span className="text-[#0070F3]">scripting skills </span>
              through its challenges. Participants also get to test their skills against other skilled competitors and
              improve their own timing in a competitive environment.
              <br></br>You will <span className="text-[#0070F3]">gain massive knowledge </span>that&apos;s related to
              <span className="text-[#0070F3]"> computer process automation.</span> Additionally, you will get a broad
              idea about tools, technologies, and methods that are coupled with
              <span className="text-[#0070F3]"> process automation.</span> Winner or not, We hope that each of you{' '}
              <span className="text-[#0070F3]">leave with more than you brought!</span>
            </p>
          </div>
        </div>
        <div className="w-2" />
        <div className="flex flex-row mt-12 md:mt-[20rem] xl:mt-[15rem] w-full md:w-1/2" data-aos="fade-left">
          <div className="text-left mx-2">
            <h1 className="text-white mb-[18px]">What?</h1>
            <p className="text-[#888888]">
              {' '}
              <span className="text-[#0070F3]">./bashaway</span> 2022 is a challenge-driven competition, where you have
              to <span className="text-[#0070F3]"> develop automation scripts </span>
              in Bash, Python, or Java for a specific scenario within a given duration. You can navigate to our
              competition portal where you can register your team and manage it as you need. When the competition
              begins, problems will appear in your portal which is the signal for you to start bashing.
            </p>
          </div>
        </div>
      </div>

      <h1 className="text-xl text-white font-bold mt-16" data-aos="fade-right">
        How does it work?
      </h1>
      <span className="text-sm text-[#888888] font-normal my-[10px]" data-aos="fade-left">
        Get the competition booklet here.
      </span>
      <a data-aos="fade-right" href="./booklet/Competitor booklet Bashaway 2022.pdf" download>
        <div className="flex w-[165px] h-[42px] bg-[#D9D9D9] mt-2 rounded-sm justify-center items-center text-sm font-normal hover:text-white hover:bg-primary transition duration-300">
          Download
        </div>
      </a>
      <span className="text-sm text-red-500 font-normal my-4" data-aos="fade-left">
        *The exact time and details of the mentoring sessions may be updated in the future.
      </span>
    </div>
  );
};

export default Competition;
