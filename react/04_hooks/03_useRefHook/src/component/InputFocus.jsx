// function InputFocus() {
//   function focusInput() {
//     const input = document.querySelector("#username");
//     input.focus();
//   }

//   return (
//     <>
//       <input id="username" />
//       <button onClick={focusInput}>Focus</button>
//     </>
//   );
// }

// export default InputFocus;

import { useRef } from "react";

function InputFocus() {
  const inputRef = useRef(null);

  function focusInput() {
    inputRef.current.focus();
  }

  return (
    <>
      <input ref={inputRef} />
      <button onClick={focusInput}>Focus</button>
    </>
  );
}

export default InputFocus;