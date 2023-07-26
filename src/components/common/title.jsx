const Title = ({ title, className, aos }) => {
    return (
        <div className={`text-5xl md:text-7xl font-bold text-white text-center ${className}`} data-aos={aos}>{title}</div>
    )
}

export default Title