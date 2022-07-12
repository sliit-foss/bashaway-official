import Title from "./common/title"

const Prizes = () => {

    const prizeList = [
        {
            name: "Index: 0",
            image: "prize1.svg",
            details: [
                'LKR 100,000.00',
                '4 M2 Macbooks',
                '4 JBL Headsets',
                'Bash Guidelines'
            ]
        },
        {
            name: "Index: 1",
            image: "prize2.svg",
            details: [
                'LKR 100,000.00',
                '4 M2 Macbooks',
                '4 JBL Headsets',
                'Bash Guidelines'
            ]
        },
        {
            name: "Index: -1",
            image: "prize3.svg",
            details: [
                'LKR 100,000.00',
                '4 M2 Macbooks',
                '4 JBL Headsets',
                'Bash Guidelines'
            ]
        }
    ]

    const Prize = ({ name, details, image, aos }) => {
        return (<div data-aos={aos}><div className="group flex flex-col justify-center items-center my-12 border cursor-default border-nav-links-unselected mx-6 md:mx-12 p-8 hover:border-primary transition duration-300">
            <img src={`/assets/prizes/${image}`} className="w-32 h-32 md:w-32 md:h-32 mx-16 p-2 bg-black flex justify-center items-center transform hover:scale-105 transition duration-300" />
            <span className="text-white text-xl font-semibold text-center mt-8 mb-6">{name}</span>
            {
                details.map((detail) => {
                    return <span key={detail} className="text-nav-links-unselected text-center mb-2">{detail}</span>
                })
            }
        </div></div>)
    }
    return <>
        <div className="flex flex-col justify-center items-center bg-black p-4 md:p-8">
            <Title title="Prizes" className="mt-4 mb-12" aos="fade-right"/>
            <div className="flex flex-wrap justify-center items-center">
                {
                    prizeList.map((prize, index) => {
                        return <Prize key={prize} name={prize.name} details={prize.details} image={prize.image} aos={index === 1 ? "fade" : (index ===0 ? 'fade-right': 'fade-left')} />
                    })
                }
            </div>
            <span className="text-nav-links-unselected text-center mb-2" data-aos="fade-up">* Conditions apply *</span>
        </div>
    </>
}

export default Prizes