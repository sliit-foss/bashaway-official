import Title from "./common/title";

const Rules = () => {
  return (
    <div class="bg-black w-full flex flex-col justify-center items-center text-white pt-[80px]" id="rules">
      <Title title="Rules & Regulations" aos="fade-right" />
      <div className="col-span-12 grid grid-cols-12 gap-3 border mt-16 m-10 mx-8 md:mx-20 p-2 2xl:mx-32 rounded" data-aos="fade">
        <div className="col-span-12 m-3 lg:col-span-6">
          <img src={"/assets/RulesNRegulations/RulesRegImg.jpg"} class="h-full bg-cover object-cover w-full filter grayscale rounded" />
        </div>
        <div className="col-span-12 m-6 lg:col-span-6 px-4">
          <ul class="list-disc text-nav-links-unselected">
            <li class="text-left my-3">A team can consist of 1 to 4 members.</li>
            <li class="text-left my-3" >The competition will be an online contest where teams compete within a fixed timeframe by solving a set of task-based challenges.</li>
            <li class="text-left my-3" >Each team must register through the competition platform by entering team details and necessary information regarding its members.</li>
            <li class="text-left my-3" >The challenges will be available on the competition platform once the competition begins.</li>
            <li class="text-left my-3">All team members must log in with the same credentials provided during the team registration.</li>
            <li class="text-left my-3">Points will be assigned according to the challenges and sub-tasks of each challenge.</li>
            <li class="text-left my-3">The highest scoring team will be considered the winner and a scoreboard will be updated periodically (not in real-time). The rate will depend on the registered team count and will be informed later.</li>
            <li class="text-left my-3">Extra points will be awarded based on the number of lines of code and the level of optimization (this score will be calculated by a predefined formula).</li>
            <li class="text-left my-3">A team can submit multiple submissions to a single challenge, but only the latest submission will be considered when marking.</li>
            <li class="text-left my-3">When the competition ends, we will publish a public repository under SLIIT FOSS Community GitHub profile. We will only include the latest uploads of each team.</li>
            <li class="text-left my-3">We aim to maintain transparency throughout the whole competition.</li>
            <li class="text-left my-3">The judges’ decision will be final. ***</li>
          </ul>
        </div>
      </div>
      <div className="col-span-12 text-nav-links-unselected mb-3" data-aos="fade-right">
        <span>Get the rules and regulations booklet.</span>
      </div>
      <div data-aos="fade-left"><a href="">
        <div className="flex w-[165px] h-[42px] bg-[#D9D9D9] rounded-sm justify-center items-center text-sm font-normal mt-4 text-black hover:text-white hover:bg-primary transition duration-300">
          Download
        </div>
      </a></div>
    </div>
  );
};

export default Rules;
