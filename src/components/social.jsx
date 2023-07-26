import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { BsWhatsapp } from "react-icons/bs";
import { IoIosClose } from "react-icons/io";
import { Portal } from "react-portal";

export function Social() {
    const [showModal, setShowModal] = useState(false);

    const [pushBottom, setPushBottom] = useState(false)

    const onScroll = () => {
        const copyrightSection = document.getElementById("copyright-divider");
        const diff = window.innerHeight - document.getElementById("copyright-divider").getBoundingClientRect().top
        if ( window.scrollY > window.innerHeight && diff > copyrightSection.offsetHeight - 35) {
            setPushBottom(true)
        } else {
            setPushBottom(false)
        }
    }

    useEffect(() => {
        document.removeEventListener("scroll", onScroll)
        document.addEventListener("scroll", onScroll)
    });

    return (
        <div className={`fixed right-[2em] bottom-[6em] text-white z-[49]`} style={{bottom: !pushBottom ? '2.9rem' : '6em'}}>
            <button onClick={() => {
                document.querySelector("html").style.overflowY = "hidden";
                setShowModal(true)
            }} className="group flex justify-center items-center rounded-full p-1 overflow-hidden bg-[#25D366] transition-all">
                <div className="w-0 h-0 overflow-hidden whitespace-nowrap group-hover:ml-5 group-hover:h-auto group-hover:w-auto transition-all">Join on Whatsapp</div>
                <BsWhatsapp className="p-4" size={64} />
            </button>
            <WhatsappModal showModal={showModal} toggleShow={setShowModal} />
        </div>
    )
}


export function WhatsappModal({ showModal, toggleShow }) {
    const _onClose = () => {
        document.querySelector("html").style.overflowY = "auto";
        toggleShow(false)
    }

    return (
        <Portal>
            <div className={`fixed w-screen h-screen top-0 left-0 backdrop-blur-2xl z-[99999] font-inter transition-all duration-300 ${showModal ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
                <button onClick={_onClose} className="text-white absolute top-0 p-2 right-0">
                    <IoIosClose
                        className="h-14 w-14 text-white cursor-pointer"
                    />
                </button>
                <div className="flex flex-col justify-center items-center w-full h-full text-white">
                    <div className="bold text-xl mb-10 font-semibold text-center">Join the WhatsApp group <br></br> To be up-to-date on the competition</div>
                    <div className="w-[18em] border-[10px] border-white">
                        <img src="/assets/whatsapp-qr.png" alt="Whatsapp QR"></img>
                    </div>
                    <div className="mt-4">Scan the QR or click <a href="https://chat.whatsapp.com/LYR1sVncCWX5ABRvwM8ilu" className="hover:font-bold underline" target="_blank">here</a></div>
                    <div className="mt-10">
                        <img src="/assets/bashaway-logo.svg" className="w-30" />
                    </div>
                </div>
            </div>
        </Portal>
    )
}