import { Divider } from "./common"

const Register = ({ showDivider = true }) => {
    return (
        <>
            {showDivider && <Divider />}
            <div className="flex justify-center bg-black/50 backdrop-blur-sm p-4 md:p-8 cursor-pointer hover:bg-[#01050a] transition duration-300">
                <span data-heading="Register Now" className="light-sweep font-extrabold font-poppins text-center text-transparent text-5xl md:text-7xl bg-clip-text bg-gradient-to-r from-primary to-secondary p-4 transform">
                    Register Now
                </span>
            </div>
            <Divider />
        </>
    )
}

export default Register