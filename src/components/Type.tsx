import Typewriter from "typewriter-effect";

function Type() {
  return (
    <Typewriter
      options={{
        strings: [
          "interactive",
          "transformed",
          "mapped",
          "simplified",
          "processed",
          "connected",
          "beautiful",
        ],
        autoStart: true,
        loop: true,
        deleteSpeed: 50,
      }}
    />
  );
}

export default Type;
