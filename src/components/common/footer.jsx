import Divider from "./divider"

const Footer = () => {

    const socialLinks = [
        {
            icon: 'fb',
            url: 'https://www.facebook.com/sliitfoss',
        },
        {
            icon: 'insta',
            url: 'https://www.instagram.com/sliitfoss/',
        },
        {
            icon: 'linkedin',
            url: 'https://twitter.com/fosssliit?lang=en',
        },
        {
            icon: 'twitter',
            url: 'https://twitter.com/fosssliit?lang=en',
        },
        {
            icon: 'youtube',
            url: 'https://www.youtube.com/channel/UCPPO-QR0Dv13ewjhPsc_I3w/featured',
        }
    ]

    const usefulLinks = [
        {
            name: 'GitHub',
            url: 'https://github.com/sliit-foss/bashaway-landing'
        },
        {
            name: 'Code of Conduct',
            url: 'https://sliitfoss.org'
        },
        {
            name: 'Register',
            url: 'https://sliitfoss.org'
        },
        {
            name: 'Competition',
            url: 'https://sliitfoss.org'
        }
    ]

    return (
        <>
            <div className="flex flex-col md:flex-row justify-between bg-black p-10 md:p-12">
                <div className="w-full pl-0 md:pl-24 flex justify-center md:justify-start">
                    <a href="https://sliitfoss.org" target="_blank"><img src='/assets/foss-logo.svg' className="w-28 h-28" /></a>
                </div>
                <div className="w-full flex flex-col justify-center items-center md:justify-start md:items-start mt-6">
                    <h1 className="text-white text-2xl font-semibold mb-8">Contact</h1>
                    <a className="text-nav-links-unselected hover:text-primary mb-4 transition duration-300" href="mailto:sllitfoss@gmail.com" target="_blank">sllitfoss@gmail.com</a>
                    <div className="flex justify-start mb-8">
                        {socialLinks.map(link => (
                            <a href={link.url} target="_blank"><img src={`/assets/social/${link.icon}.svg`} className="w-5 h-5 mr-4 fill-current hover:brightness-200 transition duration-300"></img></a>
                        ))}
                    </div>
                    <h1 className="text-white text-2xl font-semibold mb-4">Visit Us On</h1>
                    <a className="text-nav-links-unselected hover:text-primary mb-2 transition duration-300" href="https://sliitfoss.org" target="_blank">sllitfoss.org</a>
                </div>
                <div className="w-full flex flex-col justify-center items-center md:justify-start md:items-start mt-6">
                    <h1 className="text-white text-2xl font-semibold mb-6">Useful Links</h1>
                    {usefulLinks.map(link => (
                        <a className="text-nav-links-unselected hover:text-primary mb-3 transition duration-300" href={link.url} target="_blank">{link.name}</a>
                    ))}
                </div>
            </div>
            <Divider/>
            <div className="bg-black flex flex-col md:flex-row justify-start md:justify-between text-nav-links-unselected pt-5 pb-6 px-10 md:px-24">
                <span className="text-center md:text-left">Copyright © 2022 SLIIT FOSS Community</span>
                <div className="flex justify-center md:justify-start items-center mt-4 md:mt-0">
                    <span className="mr-3">Visit us On</span>
                    <a href="https://github.com/sliit-foss" target="_blank"><img src={`/assets/social/github.svg`} className="w-5 h-5 mb-0.5 hover:brightness-200 transition duration-300"></img></a>
                </div>
            </div>
        </>
    )
}

export default Footer