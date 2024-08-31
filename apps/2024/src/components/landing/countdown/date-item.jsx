const DateItem = ({ value, unit }) => {
  return (
    <div>
      <div className="font-bold text-4xl">{value}</div>
      <div className="font-light text-black text-sm mt-3">{unit}</div>
    </div>
  );
};

export default DateItem;
