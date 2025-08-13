export default function Link({ color = 'white', className }) {
  return (
    <svg viewBox="0 0 25 28" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M4.25833 27.0093L18.7028 1.99076M18.7028 1.99076L0.944444 6.7491M18.7028 1.99076L23.4611 19.7491"
        stroke={color}
        strokeWidth="2"
      />
    </svg>
  );
}
