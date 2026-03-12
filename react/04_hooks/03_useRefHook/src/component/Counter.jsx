// import { useState } from "react";

// function Counter() {
//   const [count, setCount] = useState(0);
//   const [previous, setPrevious] = useState(0);

//   function increase() {
//     setPrevious(count);
//     setCount(count + 1);
//   }

//   return (
//     <>
//       <h2>Current: {count}</h2>
//       <h3>Previous: {previous}</h3>
//       <button onClick={increase}>Increase</button>
//     </>
//   );
// }

// export default Counter;

import { useState, useRef, useEffect } from "react";

function Counter() {
  const [count, setCount] = useState(0);
  const previousRef = useRef(0);

  useEffect(() => {
    previousRef.current = count;
  }, [count]);

  return (
    <>
      <h2>Current: {count}</h2>
      <h3>Previous: {previousRef.current}</h3>
      <button onClick={() => setCount(count + 1)}>Increase</button>
    </>
  );
}

export default Counter;