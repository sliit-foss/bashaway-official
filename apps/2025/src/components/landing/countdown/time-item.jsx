const TimeItem = ({ value, unit }) => {
  return (
    <div className="w-14">
      <div className="font-bold text-2xl lg:text-4xl">{value}</div>
      <div className="font-light text-black text-xs lg:text-sm lg:mt-2">{unit}</div>
    </div>
  );
};

export default TimeItem;
