// import { useState } from "react";

// function Child({ onDelete }) {
//   console.log("Child Rendered");

//   const items = Array.from({ length: 5 }, (_, i) => i);

//   return (
//     <div>
//       {items.map((item) => (
//         <div key={item}>
//           Item {item}
//           <button onClick={() => onDelete(item)}>Delete</button>
//         </div>
//       ))}
//     </div>
//   );
// }


import { useState, useCallback } from "react";
import React from "react";

const Child = React.memo(function Child({ onDelete }) {
  console.log("Child Rendered");

  const items = Array.from({ length: 5 }, (_, i) => i);

  return (
    <div>
      {items.map((item) => (
        <div key={item}>
          Item {item}
          <button onClick={() => onDelete(item)}>Delete</button>
        </div>
      ))}
    </div>
  );
});

export default function App() {
  const [count, setCount] = useState(0);

  const handleDelete = useCallback((id) => {
    console.log("Delete", id);
  }, []);

  return (
    <>
      <button onClick={() => setCount(count + 1)}>
        Counter {count}
      </button>

      <Child onDelete={handleDelete} />
    </>
  );
}