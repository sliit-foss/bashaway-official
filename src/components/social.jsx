import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { BsWhatsapp } from "react-icons/bs";
import { IoIosClose } from "react-icons/io";
import { Portal } from "react-portal";

export function Social() {
    const [showModal, setShowModal] = useState(false);
    return (
        <div className="fixed right-3 bottom-6 text-white z-[9999]">
            <button onClick={() => setShowModal(true)} className="px-5 py-3 bg-[#00000027] border-[2px] rounded-md flex justify-center items-center backdrop-blur-md font-bold hover:bg-[#3db5dd57] transition-all">
                Join the WhatsApp Group
                <BsWhatsapp className="ml-2" />
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