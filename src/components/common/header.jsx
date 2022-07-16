import { TiThMenu } from "react-icons/ti";
import { IoIosClose } from 'react-icons/io';
import { useState } from "react";

const Header = () => {
    const [burgerNav, setBurgerNav] = useState(false);

    const burgerNavController = () => {
        document.querySelector('html').style.overflowY = !burgerNav ? "hidden" : "auto";
        setBurgerNav(!burgerNav);
    }

    const handleNavItemClick = (path) => {
        document.getElementById(path).scrollIntoView({ behavior: "smooth" })
    }

    const handleBergerNavItemClick = (path) => {
        document.getElementById(path).scrollIntoView({ behavior: "smooth" })
        burgerNavController();
    }

    const navItems = [
        {
            name: 'Timeline',
            path: 'timeline',
        },
        {
            name: 'Competition',
            path: 'competition',
        },
        {
            name: 'Rules',
            path: 'rules',
        },
        {
            name: 'Prizes',
            path: 'prizes',
        },
        {
            name: 'Speakers',
            path: 'speakers',
        },
        {
            name: 'Sponsors',
            path: 'sponsors',
        },
        {
            name: 'Contact',
            path: 'footer',
        },
    ]

    return (
        <div>
            <div className={`w-full flex flex-col md:flex-row justify-between bg-black/70 p-5 lg:p-1 fixed top-0 z-50 backdrop-blur-[5px]`}>
                <div className=" w-full md:w-5/12 pl-2 md:pl-12 mt-1.5 lg:pt-[0.8rem]">
                    <img src='/assets/bashaway-logo.svg' className="w-30 h-30" />
                </div>
                <div className="hidden lg:flex justify-between w-full xl:w-10/12 mt-2">

                    {
                        navItems.map((item) => {
                            return <div className="md:pt-3">
                                <span className="px-2 text-nav-links-unselected hover:text-primary mb-3 transition duration-300 cursor-pointer" onClick={() => handleNavItemClick(item.path)}>{item.name}</span>
                            </div>
                        })
                    }
                    <div className="col col-span-20 md:pt-2 pr-7 pl-2">
                        <button class="py-1 px-3 bg-white hover:text-primary mb-3 transition duration-300 font-semibold rounded-md" href="" target="_blank">
                            Register
                        </button>
                    </div>
                </div>
                <TiThMenu
                    className="fixed top-0 h-8 w-8 text-white right-1 lg:hidden mt-5 lg:mt-4 mr-4 lg:mr-2 cursor-pointer"
                    onClick={burgerNavController}
                />
            </div>
            <div>
                <nav className={`h-full w-full flex items-center fixed top-0 left-0 z-50 ${burgerNav ? 'pointer-events-auto' : 'pointer-events-none opacity-0'} bg-black/50 backdrop-blur-2xl transition duration-300`}>
                    <IoIosClose
                        className="fixed top-0 right-0 z-[60] h-14 w-14 text-white mt-2 mr-2 lg:hidden cursor-pointer"
                        onClick={burgerNavController}
                    />
                    <ul
                        className=" mr-auto w-full h-full flex-col flex items-center uppercase justify-center p-8 lg:hidden"

                    >
                        <li className="h-full flex flex-col justify-between py-20">
                            <div className="w-full">
                                <img src='/assets/bashaway-logo.svg' className="w-56 h-20" />
                            </div>
                            {
                                navItems.map((item) => {
                                    return <div className="w-full flex flex-col justify-center items-center">
                                        <a className="w-full text-white hover:text-primary text-center transition duration-300" onClick={() => handleBergerNavItemClick(item.path)}>{item.name}</a>
                                    </div>
                                })
                            }
                        </li>
                    </ul>
                </nav>
            </div>
            <div className="hidden lg:flex w-full h-[0.25px] bg bg-nav-links-unselected opacity-20"></div>
        </div>
    )
}

export default Header