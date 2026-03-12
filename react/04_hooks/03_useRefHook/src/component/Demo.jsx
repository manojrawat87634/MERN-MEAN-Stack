import { useRef } from "react";

function Demo() {
  const countRef = useRef(0);

  function increase() {
    countRef.current += 1;
    console.log("Ref value:", countRef.current);
  }

  return (
    <>
      <h2>{countRef.current}</h2>
      <button onClick={increase}>Increase</button>
    </>
  );
}

export default Demo;