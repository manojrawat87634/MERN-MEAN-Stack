// import { useState } from "react";

// function Timer() {
//   const [timerId, setTimerId] = useState(null);

//   function startTimer() {
//     const id = setInterval(() => {
//       console.log("running...");
//     }, 1000);

//     setTimerId(id); // causes re-render
//   }

//   function stopTimer() {
//     clearInterval(timerId);
//   }

//   return (
//     <>
//       <button onClick={startTimer}>Start</button>
//       <button onClick={stopTimer}>Stop</button>
//     </>
//   );
// }

// export default Timer;

import { useRef } from "react";

function Timer() {
  const timerRef = useRef(null);

  function startTimer() {
    timerRef.current = setInterval(() => {
      console.log("running...");
    }, 1000);
  }

  function stopTimer() {
    clearInterval(timerRef.current);
  }

  return (
    <>
      <button onClick={startTimer}>Start</button>
      <button onClick={stopTimer}>Stop</button>
    </>
  );
}

export default Timer;