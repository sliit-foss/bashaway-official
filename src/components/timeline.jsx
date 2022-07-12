import Title from "./common/title"

const Timeline = () => {

    const timelineList = [
        {
            title: "Registration Open",
            dateTime: "02 Aug 2022 12:00 IST",
            isSmallText: true,
            gradientColor1: "#007CF0",
            gradientColor2: "#00DFD8"
        },
        {
            title: "Start awareness session series",
            dateTime: "02 Aug 2022 12:00 IST",
            isSmallText: false,
            gradientColor1: "#007CF0",
            gradientColor2: "#00DFD8"
        },
        {
            title: "End of awareness session series",
            dateTime: "02 Aug 2022 12:00 IST",
            isSmallText: false,
            show: true,
            gradientColor1: "#7928CA",
            gradientColor2: "#4700DE"
        },
        {
            title: "Close Registration",
            dateTime: "02 Aug 2022 12:00 IST",
            isSmallText: true,
            show: true,
            gradientColor1: "#7928CA",
            gradientColor2: "#4700DE"
        },
        {
            title: "./bashway Opneing Ceremony",
            dateTime: "02 Aug 2022 12:00 IST",
            isSmallText: false,
            show: true,
            gradientColor1: "#7928CA",
            gradientColor2: "#FF0080"
        },
        {
            title: "./bashway contest begin",
            dateTime: "02 Aug 2022 12:00 IST",
            isSmallText: false,
            show: true,
            gradientColor1: "#7928CA",
            gradientColor2: "#FF0080"
        },
        {
            title: "Contest End",
            dateTime: "02 Aug 2022 12:00 IST",
            isSmallText: true,
            show: true,
            gradientColor1: "#FF4D4D",
            gradientColor2: "#F9CB28"
        },
        {
            title: "Announce winner and award ceremony",
            dateTime: "02 Aug 2022 12:00 IST",
            isSmallText: false,
            show: true,
            gradientColor1: "#FF4D4D",
            gradientColor2: "#F9CB28"
        },
        {
            title: "Conclude the event",
            dateTime: "02 Aug 2022 12:00 IST",
            isSmallText: true,
            show: false
        }
    ]

    return <div className="flex flex-col bg-black h-full justify-center items-center pt-24 px-6">
        <div className="bg-[#7928CA]" />
        <Title title="Timeline" aos="fade-down"/>
        {
            timelineList.map((list, index) => {
                return (
                    <div className="flex flex-col justify-center items-center">
                        <span className={`${list.isSmallText ? "text-[20px]" : "text-[32px]"} mt-[30px] text-white text-center font-semibold leading-6"`} data-aos="fade-down">{list.title}</span>
                        <span className="text-gray-500 font-normal text-center text-sm mt-2" data-aos="fade-down">{list.dateTime}</span>
                        <div className="mt-5" data-aos="fade-down">
                            <div className={`relative flex justify-center h-[80px] w-0.5`}
                                style={{ backgroundImage: `linear-gradient(to top, ${list.gradientColor1}, #ffffff00)` }}>
                                <div className="absolute w-6 h-6 rounded-full bottom-0"
                                    style={{ backgroundImage: `linear-gradient(to right, ${list.gradientColor1}, ${list.gradientColor2})` }}
                                >
                                </div>
                            </div>
                        </div>
                    </div>

                )
            })
        }

    </div>
}

export default Timeline