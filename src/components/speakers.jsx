import Title from "./common/title"

const Speakers = () => {

    const speakerList = [
        {
            name: "Eka Yakek",
            position: "Software Engineer at Nowhere",
            image: "speaker.jpg"
        },
        {
            name: "Thawa Yakek",
            position: "Tech lead at Nowhere",
            image: "speaker.jpg"
        }
    ]

    const Speaker = ({ name, position, image, aos }) => {
        return (<div className="flex flex-col justify-center items-center my-12" data-aos={aos}>
            <div className={`relative w-32 h-32 md:w-44 md:h-44 mx-12 p-2 bg-black outline outline-2 outline-nav-links-unselected ring-4 rounded-full flex justify-center cursor-pointer items-center transform hover:scale-105 hover:outline-primary transition duration-300`}>
                <img src={`/assets/speakers/${image}`} className="w-full h-full rounded-full bg-cover grayscale" />
            </div>
            <span className="text-white text-xl font-semibold text-center mt-8 mb-2">{name}</span>
            <span className="text-nav-links-unselected text-center mb-2">{position}</span>
        </div>)
    }

    return <>
        <div className="flex flex-col justify-center items-center bg-black p-4 md:p-8">
            <Title title="Speakers" className="mt-4 mb-20" aos='fade-down' />
            <div className="flex flex-wrap justify-center items-center">
                {
                    speakerList.map((speaker, index) => {
                        return <Speaker key={speaker.name} name={speaker.name} position={speaker.position} image={speaker.image} aos={index === 0 ? 'fade-right' : 'fade-left'} />
                    })
                }
            </div>
        </div>
    </>
}

export default Speakers