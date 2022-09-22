import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { BsWhatsapp } from "react-icons/bs";
import { IoIosClose } from "react-icons/io";
import { Portal } from "react-portal";

export function Social() {
    const [showModal, setShowModal] = useState(false);
    return (
        <div className="fixed right-[1.5em] bottom-[7em] md:bottom-[6em] text-white z-[49]">
            <button onClick={() => setShowModal(true)} className="group flex justify-center items-center rounded-full overflow-hidden bg-green-500 transition-all">
                <div className="w-0 h-0 overflow-hidden whitespace-nowrap group-hover:ml-5 group-hover:h-auto group-hover:w-auto transition-all">Join on Whatsapp</div>
                <BsWhatsapp className="p-4" size={64}/>
            </button>
            {showModal ? <WhatsappModal onClose={() => setShowModal(false)} /> : ""}
        </div>
    )
}


export function WhatsappModal({ onClose }) {
    const [transparency, setTransparency] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            document.querySelector("html").style.overflowY = "hidden";
            setTransparency(false)

            return () => {
                document.querySelector("html").style.overflowY = "auto";
            }
        }, 50);
    }, []);

    const _onClose = () => {
        document.querySelector("html").style.overflowY = "auto";
        onClose();
    }

    return (
        <Portal>
            <div className={`fixed w-screen h-screen top-0 left-0 backdrop-blur-2xl z-[99999] transition-all duration-300 ${transparency ? "opacity-0" : "opacity-100"}`}>
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
                    <div className="mt-4">Scan the QR or click <a href="https://bit.ly/3BATIQB" className="hover:font-bold underline">here</a></div>
                    <div className="mt-10">
                        <img src="/assets/bashaway-logo.svg" className="w-30" />
                    </div>
                </div>
            </div>
        </Portal>
    )
}