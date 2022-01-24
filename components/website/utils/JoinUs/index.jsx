export default function JoinUs(props) {
  return (
    <a
      href="https://sei22.eventbrite.pt"
      className={`-mt-5 flex h-28 w-28 rotate-15 transform items-center justify-center font-ibold text-xl text-${props.fgColor} bg-${props.button} translate-x-0 rounded-full`}
    >
      Join us 👋
    </a>
  );
}
